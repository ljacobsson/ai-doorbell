const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();

exports.handler = async function (event, context) {    
    return {
        statusCode: 200,
        body: s3.getSignedUrl('putObject', {
            Bucket: process.env.BucketName,
            Key: `image/${new Date().toISOString()}.jpg`,
            Expires: 15
        })
    }
};
