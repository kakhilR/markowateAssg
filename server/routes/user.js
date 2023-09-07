import express from 'express';
import { deleteUser, getUsers, getUsersById, loginUser, registerUser, updateUser } from '../controllers/userController.js';

const routes = express.Router();

routes.post('/register', registerUser);
routes.post('/login', loginUser)

routes.get('/users',getUsers)
routes.get('/user/:id',getUsersById);

routes.put('/update/user/:id',updateUser);
routes.delete('/delete/user/:id',deleteUser);

export const userRoutes = routes;