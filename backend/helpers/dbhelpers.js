async function getCollections(database) {
  try {
    const collections = await database.db.listCollections().toArray();
    return collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
}

async function createFlowfoxCollection(database, collections) {
  const hasFlowfoxCollection = collections.some(
    (col) => col.name === "flowfoxcollection",
  );

  if (!hasFlowfoxCollection) {
    await database.createCollection("flowfoxcollection");
  }
}

module.exports = { getCollections, createFlowfoxCollection };
