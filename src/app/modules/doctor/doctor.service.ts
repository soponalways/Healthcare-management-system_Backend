import { envVars } from "../../../config/env";
import { prisma } from "../../lib/prisma";
import { IUpdateDoctorsPayload } from "./doctor.interface";

const getAllDoctors = async () => {
  const doctors = await prisma.doctor.findMany({
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });
  return doctors;
};

const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      specialties: true,
    },
  });

  if (!doctor) {
    throw new Error(`Doctor not found with this id: ${id}`);
  }

  return doctor;
};

const updateDoctorById = async (id: string, payload: IUpdateDoctorsPayload) => {
  try {
    const doctorUpdateData = await prisma.$transaction(
      async (tx) => {
        const doctor = await tx.doctor.update({
          where: { id },
          data: {
            ...payload.doctor,
          },
        });

        if (payload.specialties) {
          payload.specialties.forEach(async (sp) => {
            await tx.doctorSpecialty.update({
              where: {
                doctorId_specialtyId: {
                  doctorId: doctor.id,
                  specialtyId: sp.existingSpecialtyId,
                },
              },
              data: {
                specialtyId: sp.newSpecialtyId,
              },
            });
          });
        }

        const result = await tx.doctor.findUnique({
          where: {
            id: id,
          },
          select: {
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
              },
            },
            specialties: {
              select: {
                specialty: {
                  select: {
                    id: true,
                    title: true,
                    description: true,
                  },
                },
              },
            },
          },
        });
        return result;
      },
      {
        maxWait: 10000,
        timeout: 20000,
      },
    );

    return doctorUpdateData;
  } catch (error) {
    if (envVars.NODE_ENV === "development") {
      console.log("Transaction Error", error);
    }
  }
};

const deleteDoctorById = async (id: string) => {
  const date = new Date();

  const existingDoctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
  });

  if (!existingDoctor) {
    throw new Error("Doctor not exists");
  }

  if (existingDoctor.isDeleted === true) {
    throw new Error("Doctors has already deleted");
  }


  
  try {
    const doctorDeleteTransaction = await prisma.$transaction(async (tx) => {
       await tx.doctor.update({
        where: {
          id: id,
        },
        data: {
          isDeleted: true,
          deletedAt: date,
        },
        include: {
          user: true,

          specialties: true,
        },
      });

       
         await tx.user.update({
        where: {
            email: existingDoctor.email
        }, 
        data : {
            isDeleted: true, 
            deletedAt: date
        }, 
      })


      const doctorData = await prisma.doctor.findUnique({
        where: {
            id
        }, 
        include: {
            user: true, 
            specialties: true,
        }
      })

      return doctorData; 

    });
    return doctorDeleteTransaction; 
  } catch (error) {
    if (envVars.NODE_ENV === "development") {
      console.log("Transaction Error: ", error);
    }
    throw error;
  }
};

export const doctorService = {
  getAllDoctors,
  getDoctorById,
  deleteDoctorById,
  updateDoctorById,
};
