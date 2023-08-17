## Cookies

- `cookies` are small pieces of data sent from a server to a client so that the client can somehow remember the cookies and for the subsequent requests the client can send the cookie to the server (browser does it by default) to let the server identify client and track its activity.

## Session

- Session is a temporaty interaction between a client and a server.
- It is used so that the server can track the activity a client is doing under a session.
- It is achieved by using cookies etc.
- example: After logging into a website a new session creates. For this reason, we don't have to give our username and password every time we visit the website.

## Difference between localStorage and cookies

- **Scope:** Local storage is scoped to the origin of the website, while cookies are scoped to the domain of the website. This means that local storage data can be accessed by all pages on the same origin, while cookie data can only be accessed by pages on the same domain.
- **Size:** Local storage can store up to 5MB of data, while cookies can only store up to 4KB of data.
- **Expiration:** Local storage data does not expire, while cookies can expire at a specified time or when the browser is closed.
- **Security:** Local storage data is stored in the browser, while cookies can be accessed by the server. This means that local storage data is more secure than cookies.

Here is a table summarizing the differences between local storage and cookies:

| Feature    | Local Storage   | Cookies                                                   |
| ---------- | --------------- | --------------------------------------------------------- |
| Scope      | Origin          | Domain                                                    |
| Size       | Up to 5MB       | Up to 4KB                                                 |
| Expiration | Does not expire | Expires at a specified time or when the browser is closed |
| Security   | More secure     | Less secure                                               |

In general, local storage is a better choice for storing large amounts of data that needs to be accessed by multiple pages on the same origin. Cookies are a better choice for storing small amounts of data that needs to be accessed by pages on the same domain.

Here are some examples of how local storage and cookies can be used:

- Local storage can be used to store the user's preferences, such as their preferred language or font size.
- Local storage can be used to store the items in the user's shopping cart.
- Cookies can be used to store the user's login status or the session ID.
- Cookies can be used to track the user's browsing activity.
