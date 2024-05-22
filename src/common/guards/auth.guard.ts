import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

// Authentication Guard
@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        // return validateRequest(request);
        return true; // if 'true', request will proceed othewise Nest will deny.
    }

}