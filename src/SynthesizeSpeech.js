const Polly = require("aws-sdk/clients/polly");
const S3 = require("aws-sdk/clients/s3");
const Iot = require("aws-sdk/clients/iotdata");
const s3 = new S3();
const polly = new Polly();
const iot = new Iot({
    endpoint: "ae3j5jmb4uqok-ats.iot.eu-west-1.amazonaws.com",
  });
  
exports.handler = async function (event) {
  const speech = await polly
    .synthesizeSpeech({
      OutputFormat: "mp3",
      Text: event.message,
      VoiceId: "Amy",
      Engine: "neural",
    })
    .promise();

  const key = `voice/${new Date().toISOString()}.mp3`;
  const params = {
    Bucket: process.env.BucketName,
    Key: key,
    Body: speech.AudioStream,
  };
  await s3.upload(params).promise();

  const url = s3.getSignedUrl("getObject", {
    Bucket: process.env.BucketName,
    Key: key,
    Expires: 30,
  });

  await iot
    .publish({
      topic: "bell/voice",
      payload: url,
    })
    .promise();
};
