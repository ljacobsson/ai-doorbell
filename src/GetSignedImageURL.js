const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

exports.handler = async function (event, context) {
  const imageUrl = s3.getSignedUrl("getObject", {
    Bucket: process.env.BucketName,
    Key: event.Key,
    Expires: 2592000,
  });

  return imageUrl;
};
