import express from 'express';
import * as Jwt from 'jsonwebtoken'

const throwNotAutorized = (res, message) => res.status(401).json({message });
export const registerMiddleware = async (server:express.Express) => {
    server.use(async (req,res,next)=>{
        
        if(req.url === '/login' || (req.url ==='/users' && req.method ==='POST')){
            return next();
        }

        const authorization = req.headers['authorization'];

        if (!authorization){
            return throwNotAutorized(res, 'No token provided.');
        }

        const [bearer,auth] = authorization.toString().split(' ');

        if(!auth || (!bearer && bearer !== 'Bearer')){
            return throwNotAutorized(res, 'Bad formatted token');
        }

        try {
            
            const decoded = await Jwt.verify(auth, process.env.SECRET_KEY);
    
            req['user'] = decoded;
    
            
            next();

        } catch (error) {
            return throwNotAutorized(res, error.message);
        }

    });

}