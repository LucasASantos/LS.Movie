import { RegisterWithRole } from "../interfaces/route.interface";
import { Roles } from "../models/user.model";
import express from 'express';


export const registerMiddleware =({server, path, accessRole} :RegisterWithRole) =>{
    server.use(path, hasRole(accessRole));
}

const hasRole = (accessRole?: Roles) => {
    return function(req, res:express.Response, next) {
        if(req.user.role !== accessRole){
            return res.status(403).json({
                message: 'This function cannot be accessed by the user'
            })
        }
        return next();
    }
}