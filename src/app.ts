import express, { Application } from "express"
import { mealRouter } from "./modules/meal/meals.route";
import { categoryRoutes } from "./modules/category/category.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors'
import { ProviderRoute } from "./modules/providerProfile/providerProfile.route";
import { orderRouter } from "./modules/order/order.route";
import { reviewRouter } from "./modules/review/review.route";

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
app.use("/categories", categoryRoutes);
app.use("/provider", ProviderRoute)
app.use("/provider/meals", mealRouter)
app.use("/orders", orderRouter)
app.use("/reviews", reviewRouter);

export default app;