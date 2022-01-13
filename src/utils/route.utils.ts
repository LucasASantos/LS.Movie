import { RegisterWithRole } from '../interfaces/route.interface';
import { registerMiddleware } from '../middlewares/role.middleware';

export const registerRoutes = async(routesOptions: Array<RegisterWithRole>)=>{
    await routesOptions.map(route => {
        const {server, path, method, handle, accessRole} = route;
        if(accessRole !== undefined){
            registerWithRole(route);
            return;
        }
        server[method](path,handle);
        return;
    })
} 



const registerWithRole = (routeOptions :RegisterWithRole) => {
    const {server, path,method, handle} = routeOptions;
    
    registerMiddleware(routeOptions);
    
    server[method](path,handle);
}

