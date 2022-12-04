import express from 'express'
import dotenv from 'dotenv'
import {createServer} from 'http'
import cookieParser from 'cookie-parser'
import router from './routes/user.routes'
import cors from 'cors'
import { WsController } from './websocketController/wsController'



dotenv.config();


let corsOptions = {
  origin: 'http://localhost:3000',
  methods:['GET', 'PUT', 'POST','DELETE',],
  credentials:true,
}
const app = express();
export const httpServer = createServer(app);


WsController.Ws400ms();

app.use(cookieParser());
app.use(express.json());
app.use('/api',cors(corsOptions),router);
app.use(cors(corsOptions));


httpServer.listen(5000)