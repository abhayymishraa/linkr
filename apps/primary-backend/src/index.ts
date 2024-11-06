import cors  from 'cors'
import express from 'express';
import { userRouter } from './routes/user';
import { zapRouter } from './routes/zap';
import { triggerRouter } from './routes/trigger';
import { actionRouter } from './routes/action';

const app = express();

const port = 4000;

app.use(express.json())

app.use(cors());

app.use("/api/v1/user",userRouter);

app.use("/api/v1/zap",zapRouter);

app.use("/api/v1/trigger", triggerRouter);

app.use("/api/v1/action", actionRouter);

app.listen(port,()=> console.log(`Server is running on the ${port}`));