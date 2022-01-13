import { userService } from '../services/user.service';
import { Roles } from '../models/user.model';
import { hasOwnProperty } from '../utils/object.utils';



export class UserController{
    static async create(req,res){
        const {name, email, password} = req.body;
        const user = await userService.create(name, email, password);

        const {password:pass,...ress} =  user

        return res.status(201).json(ress);
    }
    static async update(req,res){
        const { id } = req.user;
        const {name, email, password} = req.body;
        const result = await userService.update(id, hasOwnProperty({name, email, password}));

        return res.status(200).json({message: 'Ok.'});
    }
    static async delete(req,res){
        const { id } = req.user;

        const result = await userService.inactivate(id);

        return res.status(200).json({message: 'Ok.'});
    }
    static async setAdmin(req,res){
        const { id } = req.params;

        const result = await userService.update(id, {role: Roles.admin});

        return res.status(200).json({message: 'Ok.'});
    }
    
}