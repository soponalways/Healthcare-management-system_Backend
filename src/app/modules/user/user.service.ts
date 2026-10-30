import { envVars } from "../../../config/env";
import { Specialty } from "../../../generated/prisma/client";
import { Role, UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { IDoctorCreatePayload } from "./user.interface";

const createDoctor = async ( payload : IDoctorCreatePayload ) => {
    const { password, doctor, } = payload; 

    const specialties : Specialty[] = []; 

    // for(specialtyId of payload.specialties) {
    //     const specialty = await prisma.specialty.findUnique({
    //         where : {
    //             id: specialtyId
    //         }

            
    //     })
    // }
    payload.specialties.forEach(async (specialtyId) => {
        const specialty = await prisma.specialty.findUnique({
            where: {
                id : specialtyId
            }
        }); 
        if(!specialty) {
            throw new Error(`Specialty is not found with this id : ${specialtyId}`)
        }

        specialties.push(specialty)
    }); 

    const userExists = await prisma.user.findUnique({
        where: {
            id: payload.doctor.email
        }
    }); 
    if(userExists) {
        throw new Error("User email has already Exists")
    }



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

   try {
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
                address: doctor.address, 
                userId: data.user.id, 
                experience: doctor.experience, 
            }
        }); 

        const doctorSpecialtyData = specialties.map(specialty => {
            return {
                doctorId : creatingDoctor.id, 
                specialtyId: specialty.id, 
            }
        }); 

        await tx.doctorSpecialty.createMany({
            data : doctorSpecialtyData
        })
        
        const doctorData = await tx.doctor.findUnique({
            where: {
                id: creatingDoctor.id
            }, 
            select : {
                name: true, 
                email: true, 
                contactNumber: true, 
                profilePhoto: true, 
                address: true, 
                currentWorkingPlace: true, 
                designation: true, 
                appointmentFee: true, 
                averageRating: true,
                experience: true, 
                gender: true, 
                id: true, 
                qualification: true, 
                registrationNumber: true,
                createdAt: true, 
                updatedAt: true, 
                user: {
                    select: {
                        id: true, 
                        email: true,
                        role: true, 
                        name: true, 
                        status: true, 
                        emailVerified: true, 
                        createdAt: true, 
                        isDeleted: true, 
                        deletedAt: true, 
                        updatedAt: true, 
                        image: true, 
                    }
                }, 
                specialties : {
                    select : {
                        specialty: {
                            select: {
                                id: true, 
                                title: true, 
                                description: true,
                            }
                        }
                    }
                }
            }
        })
        
        
        return doctorData; 
    });


    return doctorData; 
   } catch (error) {
     await prisma.user.delete({
            where: {
                id: data.user.id, 
            }, 
        }); 

        if(envVars.NODE_ENV === "development") {
            console.log("For not create a doctor , that is why user role backed , please register again ")
            console.log("Transaction Error:", error)
        }
        throw error;
   }
}; 

export const userService = { 
    createDoctor
}