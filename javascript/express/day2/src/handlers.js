const logger = (req, _, next) => {
  console.log(req.method, req.path);
  next();
};

const loginUser = (_, res) => {
  res.cookie('username', 'gourab');
  res.redirect('/');
};

const injectCookies = (req, res, next) => {
  const cookies = req.headers.cookie;
  if (!cookies) return res.redirect('/login');
  next();
};

const addComment = (req, res) => {
  req.app.comments.push(req.body);
  res.redirect('/comment');
};

const generateHTML = (comments) => {
  const heading = '<h2>Comments:</h2>';
  const toCommentHtml = ({ comment }) => `<p>${comment}</p>`;
  const goToHome = '<p>Go to <a href="/">Home</a></p>';
  return heading + comments.map(toCommentHtml).join('\n') + goToHome;
};

const handleGetComments = (req, res) => {
  const commentsHTML = generateHTML(req.app.comments);
  res.send(commentsHTML);
};

const serveLoginPage = (_, res) => {
  res.sendFile(process.env.PWD + '/public/login.html');
};

const logoutUser = (_, res) => {
  res.clearCookie('username');
  res.redirect('/');
};

module.exports = {
  logger,
  loginUser,
  injectCookies,
  addComment,
  handleGetComments,
  serveLoginPage,
  logoutUser,
};
