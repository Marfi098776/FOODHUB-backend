import express, { Application } from "express"
import { mealRouter } from "./modules/meal/meals.route";
import { categoryRoutes } from "./modules/category/category.route";

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello FOODHUB!!")
})

app.use("/meals", mealRouter)
app.use("/categories", categoryRoutes);

export default app;