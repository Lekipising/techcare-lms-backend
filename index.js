import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import cors from "cors";
// import router from "./routes/index.js";

const app = express();
dotenv.config()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
// app.use(cors());
// app.use(router);

const port = process.env.PORT || "3001";


app.get('/', (req, res)=>{
    res.send("LMS api is up!");
});

app.listen(port, ()=>{
    console.log(`API running on port ${port}`);
});