import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";

import type { Application } from "express";

export default (app: Application) => {
    // Set Env File
    dotenv.config({
        path: path.resolve(__dirname, "..", "..", ".env")
    });

    // enable CORS
    app.use(cors());

    // Secure the app by setting various HTTP headers off.
    app.use(helmet({ contentSecurityPolicy: false }));

    // Logger
    app.use(morgan("common"));

    // Tell express to recognize the incoming Request Object as a JSON Object
    app.use(express.json());

    // app.use(express.static(path.join(__dirname, "..", "..", "public")));

    // Express body parser
    app.use(express.urlencoded({ extended: true }));

    // Server Uploads
    app.use("/uploads", express.static(path.join(__dirname, "..", "..", "uploads")));

    return app;
};
