import { Global, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// cmd: nest g module cats

// @Global() // purpose to accessing from everywhere
@Module({
    controllers: [CatsController], 
    providers: [CatsService], 
    // share module to several other modules
    exports: [CatsService]
})
export class CatsModule {

}
