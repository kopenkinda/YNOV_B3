import express from "express";
import { appRouter } from "./app.router.js";
import { bodyFormatErrorMiddleware } from "./common/body-format-error.middleware.js";
import { errorMiddleware } from "./common/error.middleware.js";
import "./common/orm.config.js";

const port = 3333;
const app = express();

app.use(express.json());
app.use(bodyFormatErrorMiddleware);
app.use(appRouter);
app.use(errorMiddleware);
app.listen(port, () => console.log(`Server is running listening port ${port}`));
