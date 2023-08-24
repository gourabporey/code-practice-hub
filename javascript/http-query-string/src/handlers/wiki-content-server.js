const wiki = require('wikipedia');

const serveWikiContent = (req, res) => {
  const articleName = req.queryParams.get('name');

  try {
    const content = wiki.page(articleName);
    const summary = content.summary();
    res.end(summary.toString());
  } catch (err) {
    console.log(err);
    res.end('Not found' + articleName);
  }
};

module.exports = { serveWikiContent };
