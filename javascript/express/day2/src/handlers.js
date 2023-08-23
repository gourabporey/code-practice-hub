const logger = (req, res, next) => {
  console.log(req.method, req.path);
  next();
};

const loginUser = (req, res, next) => {
  res.cookie('username', 'gourab');
  res.redirect('/');
};

const injectCookies = (req, res, next) => {
  const cookies = req.headers.cookie;
  if (!cookies) return res.redirect('/login');
  next();
};

const addComment = (req, res) => {
  req.comments.push(req.body);
  res.redirect('/comment');
};

const generateHTML = (comments) => {
  const heading = '<h2>Comments:</h2>';
  const toCommentHtml = ({ comment }) => `<p>${comment}</p>`;
  const goToHome = '<p>Go to <a href="/">Home</a></p>';
  return heading + comments.map(toCommentHtml).join('\n') + goToHome;
};

const handleGetComments = (req, res, next) => {
  const commentsHTML = generateHTML(req.comments);
  res.send(commentsHTML);
};

const injectComments = (comments) => (req, res, next) => {
  req.comments = comments;
  next();
};

const serveLoginPage = (req, res) => {
  res.sendFile(process.env.PWD + '/public/login.html');
};

const logoutUser = (req, res) => {
  res.clearCookie('username');
  res.redirect('/');
};

module.exports = {
  logger,
  loginUser,
  injectCookies,
  addComment,
  injectComments,
  handleGetComments,
  serveLoginPage,
  logoutUser,
};
