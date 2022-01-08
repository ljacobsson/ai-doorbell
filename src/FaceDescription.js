const helper = require("./lib/FaceAnalysisHelper.js");

exports.handler = async function (face) {
  return helper.describeFace(face);
};