import { DynamoDB, config } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

// In offline mode, use DynamoDB local server
let client: DocumentClient | null = null;

if (process.env.IS_OFFLINE) {
  config.update({
    region: 'localhost',
    endpoint: "http://localhost:8001"
  });
}
client = new DynamoDB.DocumentClient();

export const tokenSecret = process.env.SECRET ? process.env.SECRET : '3ee058420bc2';

export function envelop(res, statusCode = 200) {
    let body;
    if (statusCode == 200) {
      body = JSON.stringify(res, null, 2);
    } else {
      body = JSON.stringify({ errors: { body: [res] } }, null, 2);
    }
    return {
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body,
    };
  }

export function getDocumentClient() {
  return client;
}

export function getTableName(name: string): string {
  return `cms-api-${process.env.DYNAMODB_NAMESPACE}-${name}`;
}