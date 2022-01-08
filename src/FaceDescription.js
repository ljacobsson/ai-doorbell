const helper = require("./lib/FaceAnalysisHelper.js");

exports.handler = async function (face) {
  return `a${helper.beardStatus(
    face
  )} ${helper.getEmotion(face)} ${helper.getGender(
    face
  )}${helper.moustacheStatus(face)} aged about ${Math.round(
    helper.getAge(face)
  )}${helper.glassesStatus(face)}`;
};
