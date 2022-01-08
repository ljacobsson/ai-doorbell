const grammarHelper = require("./lib/GrammarHelper");
const objectDetectionParser = require("./lib/ObjectDetectionParser");

exports.handler = async function (event, context) {
  console.log(event);
  const descriptions = event.Descriptions;
  const objectDetection = event.Labels;
  const objects = grammarHelper
    .fixGrammar(
      grammarHelper.addArticle(
        objectDetectionParser.getAllDetailedLabels(objectDetection)
      )
    )
    .toLowerCase();
  const hasObjects = objects.length > 0;

  let message = grammarHelper.fixGrammar(descriptions); // Replace 'a' with 'an' before vowel
  if (descriptions.length === 1) {
    message = `There is ${message}${
      hasObjects ? ` with ${objects}` : ""
    } at the door`;
  } else {
    message = `There are ${descriptions.length} people at the door. There is ${message}`;
  }
  return { message };
};

