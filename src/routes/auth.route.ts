import express from 'express';
import * as Jwt from 'jsonwebtoken'
import { Roles } from '../models/user.model';
import { registerRoutes } from '../utils/route.utils';
import { AuthController } from '../controllers/auth.controller';

const PREFIX = '';

export const init = async (server)=>{
    await registerRoutes([
        {
            server,
            method: 'post',
            path: getRoute('/login'),
            handle: AuthController.login
        }
    ])

}

const getRoute = (path) => `${PREFIX}${path}`