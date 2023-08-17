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

const matchPassword = ({ username, password }, { onsuccess, onfailure }) => {
  fs.readFile('./data/accounts.json', (err, data) => {
    if (err) {
      res.end(err.toString);
      return;
    }

    let accounts = {};
    try {
      accounts = JSON.parse(data);
    } catch {
      accounts = {};
    } finally {
      const isMatch = accounts[username]?.password === password;
      return isMatch ? onsuccess() : onfailure();
    }
  });
};

const loginUser = (req, res) => {
  res.setHeader('set-cookie', `username=${req.cookies.get('username')}`);
  res.statusCode = 302;
  res.setHeader('location', '/');
  res.end();
};

const handleInvalidCredentials = (_, res) => {
  res.statusCode = 401;
  res.write('Invalid credentials');
  res.end();
};

const authenticateUser = (req, res) => {
  let reqBody = '';
  req.on('data', (data) => (reqBody += data));
  req.on('end', () => {
    req.cookies = new URLSearchParams(reqBody);

    const username = req.cookies.get('username');
    const password = req.cookies.get('password');

    matchPassword(
      { username, password },
      {
        onsuccess: () => loginUser(req, res),
        onfailure: () => handleInvalidCredentials(req, res),
      }
    );
  });
};

const redirectToLogin = (_, res) => {
  res.statusCode = 302;
  res.setHeader('location', '/login');
  res.end();
};

const redirectToHomePage = (_, res) => {
  res.statusCode = 302;
  res.setHeader('location', '/');
  res.end();
};

const logoutUser = (_, res) => {
  res.setHeader('clear-site-data', '"cookies"');
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
