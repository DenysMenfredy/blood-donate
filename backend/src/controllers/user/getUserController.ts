import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetUserController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const user = await prismaClient.user.findUnique({
            where: { id: Number(id) }
        })

        if(!user) {
            return response.status(404).send({"message": "user not found."})
        }

        return response.json(user);
    }
}