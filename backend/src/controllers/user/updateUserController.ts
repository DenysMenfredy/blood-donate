import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class UpdateUserController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, birthDate, bloodType, gender, phone, email } = request.body;

        const user = await prismaClient.user.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                birthDate: new Date(birthDate),
                bloodType,
                gender,
                phone,
                email
            }
        })

        return response.json({"message": "user updated successfully", user})
    }
}