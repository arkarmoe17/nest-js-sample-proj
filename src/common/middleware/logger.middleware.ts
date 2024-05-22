import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware{
//     use(req: any, res: any, next: NextFunction) {
//         console.log(`Request ....`)
//         next();
//     }
    
// }


// functional middle doesn't need any dependencies
export function logger(req: Request, res: Response, next: NextFunction){
    console.log(`Request ....`)
    next();
}