import {fileURLToPath} from 'url';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from "express-mongo-sanitize";
import routes from './routes/index.js';
import APIError from "./utils/apiError.utils.js";
import connectToDB from "./config/db.js";
import {webhookCheckout} from "./controller/orderController.js";

dotenv.config();
const app = express();
app.use(cors());
app.options('*', cors());

const PORT = process.env.PORT || 4000;

// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true});
// mongoose.connection.on('open', () => {
//     console.log("Database Connected");
// })

connectToDB();

const server = app.listen(PORT, () => {
    console.log(`App starting on ${PORT}`);
})

const currentDirPath = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(currentDirPath, "uploads")));

app.post(
    "/api/webhook",
    express.raw({type: "application/json"}),
    webhookCheckout
);

//Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// HTTP Request Logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json({limit: '15kb'}));

//No sql injection
app.use(mongoSanitize());

app.use(routes);

app.all("*", (req, res, next) => {
    next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
});


process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("UNCAUGHT_EXCEPTIONS! Server Shutting down...");
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error(err.name, err.message);
    server.close(() => {
        console.log("UNHANDLED_REJECTIONS! Server Shutting down...");
        process.exit(1);
    });
});

