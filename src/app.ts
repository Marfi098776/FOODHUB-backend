import express, { Application } from "express"
import { mealRouter } from "./modules/meal/meals.route";
import { categoryRoutes } from "./modules/category/category.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors'
import { ProviderRoute } from "./modules/providerProfile/providerProfile.route";

const app: Application = express();
app.use(cors({
    origin: process.env.APP_URL! || "http://localhost:5000",
    credentials: true
}))

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello FOODHUB!!")
})
app.use("/provider", ProviderRoute)
app.use("/categories", categoryRoutes);
app.use("/provider/meals", mealRouter)

export default app;