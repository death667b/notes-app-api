import * as dynamoDbLib from './libs/dynamodb-lib.js';
import {success,failure} from './libs/response-lib.js';

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: 'notes',
        // 'Key' defines the partition key and sort key of the item to be updates
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id,
        },
        // 'UpdateExpression' defines the attributes to be updates
        // 'ExpressAttributeValues' defines the value in the update express
        UpdateExpression: 'SET content = :content, attachment = :attachment',
        ExpressionAttributeValues: {
            ':attachment': data.attachment ? data.attachment : null,
            ':content' : data.content ? data.content : null,
        },
        ReturnValues: 'ALL_NEW',
    };

    try {
        const result = await dynamoDbLib.call('update', params);
        callback(null, success({status: true}));
    } catch(e) {
        callback(null, failure({status: false}));
    }
}