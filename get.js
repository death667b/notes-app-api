import * as DynamoDbLib from './libs/dynamodb-lib'; 
import {success,failure} from './libs/response-lib';

export async function main(event, context, callback) {
    const params = {
        TableName: 'notes',
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': Identify pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id,
        },
    };

    try {
        const result = await DynamoDbLib.call('get', params);
        if (result.item) {
            // Return the retrieved item
            callback(null, success(result.item));
        } else {
            callback(null, failure({status: failure, error: 'Item not found'}));
        }    
    } catch(e) {
        callback(null, failure({status: false}));
    }
}