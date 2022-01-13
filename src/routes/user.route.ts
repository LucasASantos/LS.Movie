import express from "express"
import { Roles } from "../models/user.model";
import { registerRoutes } from '../utils/route.utils';
import { UserController } from '../controllers/user.controller';

const PREFIX = '/users';

export const init = async(server:express.Express)=>{ 
    await registerRoutes([{
        server,
        method: 'post',
        path: getRoute(''),
        handle: UserController.create
    },{
        server,
        method: 'patch',
        path: getRoute(''),
        handle: UserController.update
    },{
        server,
        method: 'delete',
        path: getRoute(''),
        handle: UserController.delete
    },{
        server,
        method: 'post',
        path: getRoute('/:id/set-admin'),
        accessRole:Roles.admin,
        handle: UserController.setAdmin
    },
])


}

const getRoute = (path) => `${PREFIX}${path}`;