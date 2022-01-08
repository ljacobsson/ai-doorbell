function getEmotion(face) {
  const emotion = face.Emotions.sort(
    (a, b) => b.Confidence - a.Confidence
  )[0].Type.toLowerCase();
  if (emotion === "fear") {
    return "fearful";
  }
  return emotion;
}

function getGender(poi) {
  const gender = poi.Gender.Value.toLowerCase();
  const age = getAge(poi);
  if (gender === "female") {
    if (age > 20) {
      return "woman";
    } else {
      return "girl";
    }
  }
  if (gender === "male") {
    if (age > 20) {
      return "man";
    } else {
      return "boy";
    }
  }
}

function getAge(personOfInterest) {
  return Math.round((personOfInterest.AgeRange.High + personOfInterest.AgeRange.Low) / 2);
}

function moustacheStatus(personOfInterest) {
  if (personOfInterest.Mustache.Value) {
    return " with a moustache";
  } else {
    return "";
  }
}

function beardStatus(personOfInterest) {
  if (personOfInterest.Beard.Value) {
    return " beardy";
  } else {
    return "";
  }
}

function glassesStatus(personOfInterest) {
  if (personOfInterest.Sunglasses && personOfInterest.Sunglasses.Value) {
    return " with sunglasses";
  } else if (personOfInterest.Eyeglasses && personOfInterest.Eyeglasses.Value) {
    return " with glasses";
  } else {
    return "";
  }
}


module.exports = {
  getEmotion,
  getGender,
  getAge,
  moustacheStatus,
  beardStatus,
  glassesStatus,
};
