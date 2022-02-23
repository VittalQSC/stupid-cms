const AWS = require('aws-sdk');
import { v4 as uuidv4 } from 'uuid';
const Jimp = require('jimp')
// const awsMultiPartParser = require("lambda-multipart-parser");
import { envelop } from "./Util";
import { parser } from "./formParser";

const { S3, Endpoint } = AWS;

const MAX_SIZE = 4000000; // 4MB

const bucket = 'cms-api-images-bucket';

const PNG_MIME_TYPE = "image/png";
const JPEG_MIME_TYPE = "image/jpeg";
const JPG_MIME_TYPE = "image/jpg";

const MIME_TYPES = [PNG_MIME_TYPE, JPEG_MIME_TYPE, JPG_MIME_TYPE];

const s3 = new S3(process.env.IS_OFFLINE ? {
    s3ForcePathStyle: true,
    accessKeyId: 'S3RVER', // This specific key is required when working offline
    secretAccessKey: 'S3RVER',
    endpoint: new Endpoint('http://localhost:4001'),
} : {});

const getErrorMessage = (message) => ({ statusCode: 500, body: JSON.stringify(message)})

const isAllowedMimeType = mimeType =>
  MIME_TYPES.find(type => type === mimeType);

const isAllowedSize = size => size <= MAX_SIZE;

const isAllowedFile = (size, mimeType) =>
  isAllowedSize(size) && isAllowedMimeType(mimeType);

const uploadToS3 = (bucket, key, buffer, mimeType): Promise<AWS.S3.ManagedUpload.SendData> =>
    new Promise((resolve, reject) => {
        s3.upload(
            { Bucket: bucket, Key: key, Body: buffer, ContentType: mimeType },
            function(err, data) {
                if (err) reject(err);
                resolve(data)
            })
    })

const resize = (buffer, mimeType, width) =>
    new Promise((resolve, reject) => {
      Jimp
        .read(buffer)
        .then(image => image.resize(width, Jimp.AUTO).quality(70).getBufferAsync(mimeType))
        .then(resizedBuffer => resolve(resizedBuffer))
        .catch(error => reject(error));
    });

export async function uploadImage(event) {
    try {
        // const formData = await awsMultiPartParser.parse(event);
        const formData = await parser(event, MAX_SIZE)
        const file = formData.files[0]

        if (!isAllowedFile(file.content.byteLength, file.contentType)) {
            return getErrorMessage("File size or type not allowed")
        }

        const uid = uuidv4()
        const originalKey = `${uid}_original_${file.filename}`
        const thumbnailKey = `${uid}_thumbnail_${file.filename}`

        const fileResizedBuffer = await resize(
            file.content,
            file.contentType,
            460
          );

        const [
            originalFile,
            thumbnailFile,
        ] = await Promise.all([
            uploadToS3(bucket, originalKey, file.content, file.contentType),
            uploadToS3(bucket, thumbnailKey, fileResizedBuffer, file.contentType),
        ])

        const signedOriginalUrl = s3.getSignedUrl("getObject", { Bucket: originalFile.Bucket, Key: originalKey, Expires: 60000 })

        const signedThumbnailUrl = s3.getSignedUrl("getObject", { Bucket: thumbnailFile.Bucket, Key: thumbnailKey, Expires: 60000 });

        return envelop({
            id: uid,
            mimeType: file.contentType,
            originalKey: originalFile.Key,
            bucket: originalFile.Bucket,
            fileName: file.filename,
            originalUrl: signedOriginalUrl,
            thumbnailUrl: signedThumbnailUrl,
            originalSize: file.content.byteLength
         }, 200);
    } catch (e) {
        return getErrorMessage(e.message)
    }
}