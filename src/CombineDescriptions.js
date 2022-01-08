const grammarHelper = require("./lib/GrammarHelper");

exports.handler = async function (event) {
  const descriptions = event.Descriptions;
  let description = grammarHelper.fixGrammar(descriptions); // Replace 'a' with 'an' before vowel
  const message = `There are ${descriptions.length} people at the door. There is ${description}`;
  return { message };
};

