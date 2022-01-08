const faceHelper = require("./lib/FaceAnalysisHelper");
const grammarHelper = require("./lib/GrammarHelper");
const objectDetectionParser = require("./lib/ObjectDetectionParser");

exports.handler = async function (event) {
  const face = event[0].FaceDetails[0];
  const objectDetection = event[1];
  const objects = grammarHelper
    .fixGrammar(
      grammarHelper.addArticle(
        objectDetectionParser.getAllDetailedLabels(objectDetection)
      )
    )
    .toLowerCase();
  const message = `There is ${faceHelper.describeFace(face)} ${
    objects ? `with ${objects} ` : ""
  }at the door.`;
  return { message };
};
