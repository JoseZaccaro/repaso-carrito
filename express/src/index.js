import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import indexRouter from '../routes/index.js';
import '../config/database.js';
const app = express();

//? Middlewares here
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//? Endopoints / router here
app.use((req, res, next) => {
    // log all requests
    console.log(`${req.method} ${req.url}`);
    // pass the request to the next middleware
    
    next();
})
app.use('/api', indexRouter)


//? Production configs here
const PORT = process.env['PORT'] || 3000;
const HOST = process.env['HOST'] || 'localhost';


app.listen(PORT, HOST, ()=> console.log(`server listening on ${HOST} at port: ${PORT}`));


export default app;