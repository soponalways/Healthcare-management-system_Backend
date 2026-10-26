import { Role, UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

interface IRegisterPatientPayload {
    name: string;
    email: string;
    password: string;
}
const registerPatient = async (payload: IRegisterPatientPayload) => {
    const { name, email, password } = payload;
    const data = await auth.api.signUpEmail({
        body: {
            name, 
            email, 
            password,
            needPasswordChange: false, 
            isDeleted: false, 
            role: Role.PATIENT, 
            status: UserStatus.ACTIVE
        }
    }); 


    if(!data.user) {
        throw new Error("Patient registration failed");
    }

    // TODO: Add patient to the database after successful registration 

    // const pataint = await prisma.$transaction(async (tx) => {})
    

    return data
}; 



export const authService = {
    registerPatient
}