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

    try {
        const patient = await prisma.$transaction(async (tx) => {
        const patientTx = await tx.patient.create({
            data : {
                userId: data.user.id, 
                email: payload.email, 
                name: payload.name
            }
        })

        return patientTx; 
    }); 

    
    return {
        ...data, 
        patient
    }
    } catch (error) {
        console.log("Transaction Error: ", error); 
        await prisma.user.delete({
            where : {
                id: data.user.id
            }
        })
        throw error;
    }
}; 



interface ILoginUserPayload {
    email: string; 
    password: string; 
}

const loginUser = async(payload: ILoginUserPayload) => {
    const {email, password} = payload; 

    const data = await auth.api.signInEmail({
        body: {
            email, 
            password
        }
    }); 

    if(data.user.status === UserStatus.BLOCKED) {
        throw new Error("User is blocked")
    }; 

    if(data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("User is deleted")
    }; 

    return data.user; 
}


export const authService = {
    registerPatient, 
    loginUser
}