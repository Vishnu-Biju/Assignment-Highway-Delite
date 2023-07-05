import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config';
import mongoose from "mongoose";
import router from "./router/index.js";
const port = process.env.PORT || 8080;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', router());
mongoose.connect(dbUrl)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Error connecting to MongoDB", err));
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
//# sourceMappingURL=index.js.map