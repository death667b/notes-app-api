import * as DynamoDbLib from './libs/dynamodb-lib'; 
import {success,failure} from './libs/response-lib';

export async function main(event, context, callback) {
    const params = {
        TableName: 'notes',
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': Identify pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            userId: event.requstContext.identity.cognitoIdentityId,
            noteId: event.pathParameter.id,
        },
    };

    
}