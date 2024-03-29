const { Configuration, OpenAIApi } = require("openai");
const SecretsManager = require("aws-sdk/clients/secretsmanager");

const secretsManager = new SecretsManager();
let openai;

const people = [
  "a drunkard",
  "a 5 year old",
  "a romantic poem",
  "a yo mama joke",
  "a stand-up comedian",
  "a news anchor",
  "Donald Trump",
  "Super Mario",
  "Yoda",
];

exports.handler = async function (event, context) {
  if (!openai) {
    const apiKey = await secretsManager.getSecretValue({ SecretId: "ai-doorbell/openai/apikey" }).promise();
    const secret = JSON.parse(apiKey.SecretString);
    const configuration = new Configuration({
      apiKey: secret.token,
    });
    openai = new OpenAIApi(configuration);
  }

  const randomPerson = people[Math.floor(Math.random() * people.length)];

  const request = {
    model: "text-davinci-003",
    prompt: `Say this in the style of ${randomPerson}: "${event.message}"`,
    temperature: 0.5,
    max_tokens: 1000
  };
  const text = await openai.createCompletion(request);
  return {
    message: text.data.choices[0].text.replace(/"/g, ""),
    person: randomPerson
  };
}

