const routes = require('./routes');

const splitByEqual = (text) => text.split('=');

const readCookies = (req) => {
  const rawCookies = req.headers.cookie || '';
  const cookiePairs = rawCookies.split('; ').map(splitByEqual);
  return Object.fromEntries(cookiePairs);
};

const handleRequest = (req, res) => {
  const cookies = readCookies(req);
  req.cookies = cookies;
  const isUserLoggedIn = req.cookies.username;

  if (req.method === 'GET' && req.url === '/') {
    if (isUserLoggedIn) {
      return routes.serveHomePage(req, res);
    }

    return routes.redirectToLogin(req, res);
  }

  if (req.method === 'GET' && req.url === '/login') {
    if (isUserLoggedIn) {
      return routes.redirectToHomePage(req, res);
    }

    return routes.serveLoginPage(req, res);
  }

  if (req.method === 'POST' && req.url === '/login') {
    return routes.authenticateUser(req, res);
  }

  if (req.method === 'GET' && req.url === '/logout') {
    return routes.logoutUser(req, res);
  }

  res.writeHead(404).end();
};

module.exports = { handleRequest };
