import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
    try {
        // check if user is exists
        console.log("********Admin seeding started!!!!");
        const adminData = {
            name: "admin foodhub",
            email: "admin.foodhub@gmail.com",
            role: UserRole.ADMIN,
            password: "admin1423"
        }
        console.log("Checking Admin exists or not?");
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        });

        if (existingUser) {
            throw new Error("user already exists")
        }

        const signUpAdmin = await fetch("http://localhost:3000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:3000"
            },
            body: JSON.stringify(adminData)
        });

        if (signUpAdmin.ok) {
            console.log("Admin Created");
            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                }
            })
            console.log("Email verification status updated");
        }
        console.log("******* Success ******");


    }
    catch (error) {
        console.error(error);
    }
}

seedAdmin();