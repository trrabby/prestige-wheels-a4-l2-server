import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/MiddleWares/globalerrorhandler';
import router from './app/routes';
import notFound from './app/MiddleWares/notFound';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is live');
});

// application routes
app.use('/api/v1', router);

//global error handler
app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
