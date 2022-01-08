const helper = require("./FaceAnalysisHelper");

test("getEmotion()", () => {
  const face = {
    Emotions: [
      {
        Confidence: 0.5,
        Type: "SAD",
      },
      {
        Confidence: 0.9,
        Type: "HAPPY",
      },
    ],
  };
  expect(helper.getEmotion(face)).toBe("happy");
});
test("getEmotion() - fear -> fearful", () => {
  const face = {
    Emotions: [
      {
        Confidence: 0.5,
        Type: "fear",
      }
    ],
  };
  expect(helper.getEmotion(face)).toBe("fearful");
});

// jest test for glassesStatus()
test("glassesStatus() - sunglasses", () => {
  const personOfInterest = {
    Sunglasses: {
      Value: true,
    },
  };
  expect(helper.glassesStatus(personOfInterest)).toBe(" with sunglasses");
});

// jest test for glassesStatus()
test("glassesStatus() - glasses", () => {
  const personOfInterest = {
    Eyeglasses: {
      Value: true,
    },
  };
  expect(helper.glassesStatus(personOfInterest)).toBe(" with glasses");
});

// jest test for glassesStatus()
test("glassesStatus() - none", () => {
  const personOfInterest = {
    Sunglasses: {
      Value: false,
    },
    Eyeglasses: {
      Value: false,
    },
  };
  expect(helper.glassesStatus(personOfInterest)).toBe("");
});

test("getAge()", () => {
  const personOfInterest = {
    AgeRange: {
      High: 23,
      Low: 20,
    },
  };
  expect(helper.getAge(personOfInterest)).toBe(22);
});
