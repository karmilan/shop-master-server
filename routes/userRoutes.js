import express from 'express';
import { deleteUser, getUsers } from '../controllers/userControllers.js';

const router = express.Router();

router.get("/users", getUsers)
router.delete("/deleteuser/:id", deleteUser)


export default router
