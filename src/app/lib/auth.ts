import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
    }),
    emailAndPassword: {
        enabled: true, 
    }, 


    user : {
        additionalFields: {
            role: {
                type: "string",
                required: true, 
                default: Role.PATIENT
            }, 
            status : { 
                type: "string", 
                required: true, 
                default: UserStatus.ACTIVE
            }, 
            needPasswordChange: {
                type: "boolean", 
                required: true,
                default: false
            }, 
            isDeleted: {
                type: "boolean",
                required: true, 
                default: false
            }, 
            deletedAt: {
                type: "date", 
                required: false, 
                default: null
            }
        }
    }
    
},);