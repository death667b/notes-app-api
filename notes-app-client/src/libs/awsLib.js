import AWS from 'aws-sdk';
import config from '../config.js';

export function getAwsCredentials(userToken) {
    if (AWS.config.credentials && Date.now() < AWS.config.credentials.expireTime - 60000) return;

    const authenticator = `cognito-idp.${config.cognito.REGION}.amazonaws.com/${config.cognito.USER_POOL_ID}`;

    AWS.config.update({region: config.cognito.REGION});
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
        Logins: {
            [authenticator]: userToken,
        }
    });

    return AWS.config.credentials.getPromise();
}