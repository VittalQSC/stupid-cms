const busboy = require('busboy');

export type BbFile = {
    content?: any;
    filename?: string;
    contentType?: string;
    encoding?: string;
    fieldname?: string;
};

export type BbFormData = {
    files: BbFile[];
};

export function parser(event, fileZise): Promise<BbFormData> {
    return (new Promise((resolve, reject) => {
        const bb = busboy({
            headers: {
                'content-type': event.headers['content-type'] || event.headers['Content-Type']
            },
            limits: {
                fileZise
            }
        });

        const result: BbFormData = {
            files: []
        };

        bb.on('file', (fieldname, file, { filename, encoding, mimeType }) => {
            const uploadFile: BbFile = {}
            file.on('data', data => {
                uploadFile.content = data
            });
            file.on('end', () => {
                if (uploadFile.content) {
                    uploadFile.filename = filename;
                    uploadFile.contentType = mimeType;
                    uploadFile.encoding = encoding;
                    uploadFile.fieldname = fieldname;

                    result.files.push(uploadFile)
                }
            })
        });

        bb.on('field', (fieldname, value) => {
            result[fieldname] = value
        });

        bb.on('error', error => {
            reject(error)
        })

        bb.on('finish', () => {
            resolve(result as BbFormData);
        })

        bb.write(event.body, event.isBase64Encoded ? 'base64' : 'binary')
        bb.end()
    }));

}