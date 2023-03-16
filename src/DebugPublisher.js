const Iot = require("aws-sdk/clients/iotdata");
const iot = new Iot({
  endpoint: "ae3j5jmb4uqok-ats.iot.eu-west-1.amazonaws.com",
});

exports.handler = async function (event, context) {
  await iot
    .publish({
      topic: "bell/debug",
      payload: JSON.stringify(event),
    })
    .promise();

};


