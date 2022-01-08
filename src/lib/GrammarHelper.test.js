const grammarHelper = require('./GrammarHelper');

test("fixGrammar", () => {
  expect(grammarHelper.fixGrammar(["a person", "a dog"])).toBe("a person and a dog");
  expect(grammarHelper.fixGrammar(["a person", "a dog", "a cat"])).toBe(
    "a person, a dog and a cat"
  );
  expect(grammarHelper.fixGrammar(["a person", "a dog", "a cat", "a elephant"])).toBe(
    "a person, a dog, a cat and an elephant"
  );
  expect(grammarHelper.fixGrammar(["a elephant"])).toBe(
    "an elephant"
  );
});

test("addArticle", () => {
  expect(grammarHelper.addArticle(["person", "dogs"])).toEqual(["a person", "dogs"]);
});
