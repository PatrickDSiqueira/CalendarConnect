import express from "express";
import consign from "consign";
import cors from "cors";
import config from "../config";
import sequelize from "./database/db-connection";

const app = express();

(async () => await sequelize.sync())();

app.use(express.json());

app.use(cors());

consign()
    .include("src/routes")
    .then("src/controllers")
    .then("src/repositories")
    .into(app);

app.get("/", function (req, res) {
    res.status(200).json({message: "Connected!"})
});

app.listen(config.port, () => console.log("APP running in port " + config.port));