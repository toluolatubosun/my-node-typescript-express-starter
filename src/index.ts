import "express-async-errors";
import http from "http";
import express from "express";

const app = express();
const httpServer = http.createServer(app);

// Pre-route middlewares
import preRouteMiddleware from "./middlewares/pre-route.middleware";
preRouteMiddleware(app);

// routes
import routes from "./routes";
app.use(routes);

// Error middlewares
import errorMiddleware from "./middlewares/error.middleware";
errorMiddleware(app);

import "./database/mongo";

import { PORT } from "./config";

// Listen to server port
httpServer.listen(PORT, async () => {
    console.log(`:::> Server listening on port ${PORT} @ http://localhost:${PORT}`);
});

// On server error
app.on("error", (error) => {
    console.error(`<::: An error occurred on the server: \n ${error}`);
});

export default app;
