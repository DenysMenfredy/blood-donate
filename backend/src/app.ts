import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
})




app.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`)
})