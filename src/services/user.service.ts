import { getRepository } from 'typeorm';
import { Roles, User } from '../models/user.model';



class UserService {

    async login(email, password){
        const user = await User.findOne(
            {
                where:{
                    email,
                    active:true
                }
            }
        );

        if (!user){
            throw new Error('User not found');
        }

        const {id, role} = user;

        const isAuthenticated = user.validatePassword(password);

        if(!isAuthenticated){
            throw new Error('Unauthorized');
        }

        return {id, role};
    }

    async create(name, email, password){
       const user = new User({
           name,
           email,
           password,
           role: Roles.user
       });

       await user.save();

       return user;
    }
    async update(id, user: Partial<User>){
        if(user.password){
            user.password = User.getHashPassword(user.password);
        }
        return await getRepository(User)
        .createQueryBuilder('user')
        .update({...user})
        .where({id})
        .execute();

    }
    async inactivate(id){
        return await getRepository(User)
        .createQueryBuilder('user')
        .update({active:false})
        .where({id})
        .execute();
    }
}

export const userService = new UserService();