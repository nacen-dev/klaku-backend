import express from 'express';
import { createSessionHandler, refreshAccessTokenHandler } from '../controller/authController';
import { validateResource } from '../middleware/validateResource';
import { createSessionSchema } from '../schema/authSchema';

export const authRouter = express.Router();

authRouter.post("/api/sessions", validateResource(createSessionSchema), createSessionHandler) 

authRouter.post("/api/sessions/refresh", refreshAccessTokenHandler)