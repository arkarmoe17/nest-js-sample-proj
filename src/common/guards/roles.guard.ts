import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "./roles.decorator";

// Roles Based Authentication
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {

    }

    canActivate(
        context: ExecutionContext
    ): boolean  {
        // return true; // if 'true', request will proceed othewise Nest will deny.
        const roles = this.reflector.get(Roles, context.getHandler());
        console.log(`Roles :#${roles}`)
        if(!roles){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // return matchRoles(roles, user.roles);
        return true;
    }

}
