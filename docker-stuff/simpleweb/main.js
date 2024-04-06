const express = require('express');

const createApp = () => {
    const app = express();

    app.get('/', (_, res) => {
        res.send('Bye there');
    });

    return app;
}

const main = () => {
    const app = createApp()
    app.listen(8000, () => console.log("Listening on port", 8000));
}

main()

