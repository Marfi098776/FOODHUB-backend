import app from "./app";
import { prisma } from "./lib/prisma"

const PORT = process.env.PORT || 3000;

async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to db successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on Port http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("an error occured", error)
        await prisma.$disconnect();
        process.exit(1);
    };

}

main();