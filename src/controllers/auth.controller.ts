import { userService } from '../services/user.service';
import * as Jwt from 'jsonwebtoken';

const throwNotAutorized = (res, message) => res.status(401).json({message });
export class AuthController{

     static async login(req,res){
        const {email, password} = req.body;
        try {
            const data = await userService.login(email,password);


            const token = Jwt.sign(data, process.env.SECRET_KEY, {
                expiresIn: 3600 
              });

              return res.json({
                  access_token: token,
                  token_type: 'Bearer', 
                  expires_in: 3600
                });
            
        } catch (error) {
            return throwNotAutorized(res, error.message);
        }
    }

}