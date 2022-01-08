const objectDetection = require("./ObjectDetectionParser");
const testJson = require("../../tests/objectDetection.json");

test("Get taxonomies test", () => {
  expect(objectDetection.getTaxonomies(testJson)).toEqual([
    "Clothing",
    "Accessories",
  ]);
});

test("Get clothing test", () => {
  expect(objectDetection.getMostGranular(testJson, "Clothing")).toBe("Tuxedo");
});

test("Get accessories test", () => {
  expect(objectDetection.getMostGranular(testJson, "Accessories")).toBe(
    "Necktie"
  );
});
