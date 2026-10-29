import { envVars } from "../../../config/env";
import { Role, UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { IDoctorCreatePayload } from "./user.interface";

const createDoctor = async ( payload : IDoctorCreatePayload ) => {
    const { password, doctor } = payload; 

    const data = await auth.api.signUpEmail({
        body : {
            name: doctor.name, 
            email: doctor.email, 
            password, 
            role: Role.DOCTOR, 
            status: UserStatus.ACTIVE, 
            needPasswordChange: true, 
            isDeleted: false, 
        }
    }); 

    if(!data.user) { 
        throw new Error("Doctor register failed")
    }; 

    const doctorData = await prisma.$transaction(async (tx) => {
        const creatingDoctor = await tx.doctor.create({
            data : {
                appointmentFee: doctor.appointmentFee, 
                currentWorkingPlace: doctor.currentWorkingPlace, 
                designation: doctor.designation, 
                email: doctor.email, 
                gender: doctor.gender, 
                name: doctor.name, 
                qualification: doctor.qualification, 
                registrationNumber: doctor.registrationNumber, 
                address: "Address of doctor", 
                userId: data.user.id
            }
        }); 
        return creatingDoctor; 
    });

    if(!doctorData.id) {
        await prisma.user.delete({
            where: {
                id: data.user.id, 
            }, 
        }); 

        if(envVars.NODE_ENV === "development") {
            console.log("For not create a doctor , that is why user role backed , please register again ")
        }
        throw new Error("Error to register Doctor"); 
    }


    return doctorData; 
}; 

export const userService = { 
    createDoctor
}