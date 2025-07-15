import express from 'express';
import dotenv from 'dotenv';
import router from './routes/url.js';
import connectDb from './utils/connectDb.js';

const app = express();
app.use(express.json());
dotenv.config();

connectDb(process.env.MONGO_URL);

app.use('/',router);
const PORT = process.env.PORT || 3000


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})