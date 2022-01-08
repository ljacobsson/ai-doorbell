const SES = require("aws-sdk/clients/ses");
const ses = new SES();

exports.handler = async function (event) {
  const battery = JSON.parse(event.body).battery;
  console.log(`Battery is ${battery}%`);
  if (battery > 20) {
    return;
  }

  await ses
    .sendEmail({
      Destination: {
        ToAddresses: [process.env.ToEmailAddress],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `The doorbell battery is ${battery}%`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: `Doorbell battery low (${battery}%)`,
        },
      },
      Source: process.env.FromEmailAddress,
    })
    .promise();
};
