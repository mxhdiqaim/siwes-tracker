import { UserRoleEnum, type UserType } from "@/types/user-type";

export const dummyUsers: UserType[] = [
    {
        firstName: "Admin",
        lastName: "Demo",
        email: "admin@demo.com",
        password: "password",
        role: UserRoleEnum.ADMIN,
    },
    {
        firstName: "Supervisor",
        lastName: "Demo",
        email: "supervisor@demo.com",
        password: "password",
        role: UserRoleEnum.SUPERVISOR,
    },
    {
        firstName: "Lecturer",
        lastName: "Demo",
        email: "lecturer@demo.com",
        password: "password",
        role: UserRoleEnum.LECTURER,
    },
    {
        firstName: "Student",
        lastName: "Demo",
        email: "student@demo.com",
        password: "password",
        role: UserRoleEnum.STUDENT,
    },
];
