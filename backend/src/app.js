import express from "express";
const app=express();

import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from './routes/PostRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config({ path: '../.env' });
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const port = process.env.port || 8050 ;
const uri=process.env.MONGO_URL;
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(uri);
}

app.use(postRoutes);
app.use(userRoutes);



app.listen(port, ()=>{
    console.log(`server is listening to port ${port}`);
})