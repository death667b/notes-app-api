import uuid from 'uuid';
import AWS from 'aws-sdk';

AWS.config.update({region:'ap-southeast-2'});
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
        TableName: 'notes',
        // 'Item' contains the attributes fo the item to be created
        // - 'userID': user identities are federated through the
        //             Cognito Identity Pool, we will use the identity ID
        //             as the user ID of the authenticated user
        // - 'noteID': a unique uuid
        // - 'content': parsed from request body
        // - 'attachment': parsed from request body
        // - 'createdAt': current UNIX timestamp
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: new Date().getTime(),
        },
    };

    dynamoDb.put(params, (error, data) => {
        // Set response headers to enable CORS (Cross-origin Resource Sharing)
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        };

        // Return status code 500 on error
        if (error) {
            const response = {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({status: false}),
            };
            callback(null, response);
            return;
        }

        // Return status code 200 and the newly created item
        const response = {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify(params.Item),
        }
        callback(null, response);
    })
}