function fixGrammar(descriptions) {
  let message = descriptions.join(", ").replace(/, ([^,]*)$/, " and $1"); // Last comma should be 'and'
  message = message
    .replace(/\sa\s([aeiou])/g, " an $1")
    .replace(/^a\s([aeiou])/g, "an $1"); // Replace 'a' with 'an' before vowel
  return message;
}

function addArticle(strings) {
  return strings.map((p) => ((!p.endsWith("s") ? "a " : "") + p));
}


module.exports = {
  fixGrammar,
  addArticle
};
