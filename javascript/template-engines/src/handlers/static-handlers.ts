import { Request, Response } from 'express';

const serveHomePage = (req: Request, res: Response): void => {
  res.render('index');
};

export { serveHomePage };
