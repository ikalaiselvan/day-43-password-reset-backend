import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import  authRouter  from "./authentication/authentication.js"

dotenv.config();
const app = express();

const PORT = process.env.PORT;

const client = new MongoClient(process.env.MONGO_URL);
await client.connect();
console.log("Mongodb connected...");


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRouter);


app.get("/",(request, response)=>{
    response.send("welcome to my app...")
})

app.listen(PORT, ()=>console.log("app is running on port :",PORT ,"⭐⭐⭐"))

export { client };