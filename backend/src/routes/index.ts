import { Router } from "express";
import { CreateUserController } from "../controllers/user/createUserController";
import { GetUserController } from "../controllers/user/getUserController";
import { UpdateUserController } from "../controllers/user/updateUserController";
import { DeleteUserController } from "../controllers/user/deleteUserController";

const router = Router();

const createUser = new CreateUserController();
const getUser = new GetUserController();
const updateUser = new UpdateUserController();
const deleteUser = new DeleteUserController();

router.post("/user", createUser.handle);
router.get("/user/:id", getUser.handle);
router.patch("/user/:id", updateUser.handle);
router.delete("/user/:id", deleteUser.handle);

export { router }