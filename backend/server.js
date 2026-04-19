import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import todoRoutes from './controller/todoController'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());   

app.use("/api/cards/", todoRoutes); 

mongoose.connect(`${process.env.db_url}`)
    .then(() => {
        console.log("DB connected");
        
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("DB connection failed:", err);
        process.exit(1);
    });