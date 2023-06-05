const notFound = (req, res) => res.status(404).send(`Cette route n'exite pas`);

module.exports = notFound;