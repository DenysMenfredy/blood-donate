import {Request, Response} from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, birthDate, bloodType, gender, phone, email } = request.body;

        const user = await prismaClient.user.create({
            data: {
                name,
                birthDate: new Date(birthDate),
                bloodType,
                gender,
                phone,
                email
            }
        }).catch(error => {
            console.log(error);
            return response.status(400).send({"error": "There was an error processing the request"});
        })
        return response.json(user);
    }
}