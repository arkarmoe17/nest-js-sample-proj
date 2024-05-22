import { Get, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, MiddlewareBuilder } from '@nestjs/core';
import { logger } from './common/middleware/logger.middleware';
import { HttpExceptionFilter } from './common/exceptions/http.execption.filter';
import { AllExceptionFilter } from './common/exceptions/all.exception.filter';
import { RolesGuard } from './common/guards/roles.guard';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';

@Module({
  // import modules 
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    }, {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    
  ],
})
export class AppModule { // need to implement nestModule
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(logger) // can add multi middlewares with comma seperated
  //     .forRoutes(CatsController);
  // }
}
