import { betterAuth, boolean } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [process.env.APP_URL!],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "CUSTOMER",
                required: false
            },
            isActive: {
                type: "boolean",
                defaultValue: true,
                required: false
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            try {
                const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`
                const info = await transporter.sendMail({
                    from: '"Foodhub Team" <foodhubteam@example.com>', // sender address
                    to: "mabrurgotech@gmail.com", // list of recipients
                    subject: "please verify your email", // subject line
                    text: "Hello world?", // plain text body
                    html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Verify your email</title>
            </head>
            <body style="margin:0; padding:0; background-color:#f4f4f5; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5; padding:40px 0;">
                <tr>
                  <td align="center">
                    <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.08);">
                      
                      <!-- Header -->
                      <tr>
                        <td style="background-color:#f97316; padding:28px 32px; text-align:center;">
                          <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:700; letter-spacing:0.5px;">
                            🍔 FoodHub
                          </h1>
                        </td>
                      </tr>

                      <!-- Body -->
                      <tr>
                        <td style="padding:32px 32px 16px 32px;">
                          <h2 style="margin:0 0 12px 0; color:#1f2937; font-size:20px;">
                            Verify your email address
                          </h2>
                          <p style="margin:0 0 8px 0; color:#4b5563; font-size:15px; line-height:1.6;">
                            Hi ${user.name || "there"},
                          </p>
                          <p style="margin:0 0 24px 0; color:#4b5563; font-size:15px; line-height:1.6;">
                            Thanks for signing up for FoodHub! Please confirm your email address by clicking the button below. This helps us keep your account secure.
                          </p>
                        </td>
                      </tr>

                      <!-- Button -->
                      <tr>
                        <td style="padding:0 32px 32px 32px; text-align:center;">
                          <a href="${verificationUrl}" target="_blank"
                            style="display:inline-block; background-color:#f97316; color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; padding:14px 32px; border-radius:8px;">
                            Verify Email Address
                          </a>
                        </td>
                      </tr>

                      <!-- Fallback link -->
                      <tr>
                        <td style="padding:0 32px 32px 32px;">
                          <p style="margin:0 0 6px 0; color:#9ca3af; font-size:13px;">
                            Or copy and paste this link into your browser:
                          </p>
                          <p style="margin:0; word-break:break-all;">
                            <a href="${verificationUrl}" style="color:#f97316; font-size:13px; text-decoration:underline;">
                              ${verificationUrl}
                            </a>
                          </p>
                        </td>
                      </tr>

                      <!-- Divider -->
                      <tr>
                        <td style="padding:0 32px;">
                          <hr style="border:none; border-top:1px solid #e5e7eb; margin:0;" />
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style="padding:20px 32px 28px 32px; text-align:center;">
                          <p style="margin:0; color:#9ca3af; font-size:12px; line-height:1.5;">
                            If you didn't create a FoodHub account, you can safely ignore this email.<br/>
                            This link will expire in 24 hours.
                          </p>
                        </td>
                      </tr>

                    </table>
                    <p style="margin:16px 0 0 0; color:#9ca3af; font-size:12px;">
                      © ${new Date().getFullYear()} FoodHub. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </body>
            </html>`, // HTML body
                });
                console.log("message sent..", info.messageId);
            } catch (err) {
                console.error(err)
                throw err
            }
        }

    },
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    }
});