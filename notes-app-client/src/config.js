export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        BUCKET: 'spinnys-notes-app-upload', 
    },
    apiGateway: {
        URL: 'https://ohzexixk93.execute-api.ap-southeast-2.amazonaws.com/prod',
        REGION: 'ap-southeast-2',
    },
    cognito: {
        USER_POOL_ID: 'ap-southeast-2_bvWqZeTFk',
        APP_CLIENT_ID: '5r1111n8f1dipd90nkgni81qos',
        REGION: 'ap-southeast-2',
        IDENTITY_POOL_ID: 'ap-southeast-2:42933e86-25aa-4dc8-8384-c084a4bf7877',
    }
};