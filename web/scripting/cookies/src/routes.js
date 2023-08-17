const fs = require('fs');

const serveHomePage = (req, res) => {
  fs.readFile('./public/index.html', (err, data) => {
    res.setHeader('content-type', 'text/html').end(data);
  });
};

const serveLoginPage = (req, res) => {
  fs.readFile('./public/login.html', (err, data) => {
    res.setHeader('content-type', 'text/html').end(data);
  });
};

const authenticateUser = (req, res) => {
  let reqBody = '';
  req.on('data', (data) => (reqBody += data));
  req.on('end', () => {
    const cookies = new URLSearchParams(reqBody);
    const username = cookies.get('username');
    res.setHeader('set-cookie', `username=${username}`);
    res.statusCode = 302;
    res.setHeader('location', '/');
    res.end();
  });
};

const redirectToLogin = (req, res) => {
  res.statusCode = 302;
  res.setHeader('location', '/login');
  res.end();
};

const redirectToHomePage = (req, res) => {
  res.statusCode = 302;
  res.setHeader('location', '/');
  res.end();
};

const logoutUser = (req, res) => {
  const cookies = Object.entries(req.cookies).map(
    ([name, value]) => `${name}=${value}; Max-Age=0`
  );
  res.setHeader('set-cookie', cookies);
  res.end();
};

module.exports = {
  serveHomePage,
  serveLoginPage,
  authenticateUser,
  redirectToLogin,
  redirectToHomePage,
  logoutUser,
};
