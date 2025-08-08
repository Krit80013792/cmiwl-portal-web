//* src/shared/utils/session.ts
import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
    password: process.env.PORTAL_API_KEY ?? "complex_password_at_least_32_characters_long",
    cookieName: `${process.env.APP_ENV}_cmiwl_session`,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, //* 1 hr
    },
};

declare module "iron-session" {
    interface IronSessionData {
        usrData?: any;
    }
};
