import express from "express";
const app=express();

import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from './routes/PostRoutes.js';
import userRoutes from './routes/UserRoutes.js';

dotenv.config({ path: '../.env' });
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

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