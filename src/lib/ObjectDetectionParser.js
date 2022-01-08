const ignoreTaxonimies = ["Person", "Nature", "Indoors"];

function getAllDetailedLabels(objectDetection) {
  const labels = [];
  for (const taxonomy of getTaxonomies(objectDetection)) {
    labels.push(getMostGranular(objectDetection, taxonomy));
  }
  return labels.filter((p) => p !== null);
}

function getTaxonomies(objectDetection) {
  const taxonomies = objectDetection.Labels.filter(
    (p) =>
      p.Parents.length > 0 &&
      p.Parents.filter((f) => ignoreTaxonimies.includes(f.Name)).length === 0
  )
    .map((p) => p.Parents.slice(-1)[0].Name)
    .flat();
  const uniqueTaxonomies = [...new Set(taxonomies)];
  return uniqueTaxonomies;
}

function getMostGranular(objectDetection, topLevelCategory) {
  const deepestMatch = objectDetection.Labels.filter((p) => {
    return p.Parents.filter((f) => f.Name === topLevelCategory).length > 0;
  }).sort((a, b) => b.Parents.length - a.Parents.length)[0];
  console.log(deepestMatch);
  if (deepestMatch) return deepestMatch.Name;
  else return null;
}

module.exports = {
  getTaxonomies,
  getMostGranular,
  getAllDetailedLabels,
};
