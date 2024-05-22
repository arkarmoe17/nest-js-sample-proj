import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { HttpExceptionFilter } from './common/exceptions/http.execption.filter';
import { AllExceptionFilter } from './common/exceptions/all.exception.filter';
import { RolesGuard } from './common/guards/roles.guard';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { ExcludeNullInterceptor } from './common/interceptor/exclude.null.interceptor';
import { ErrorsInterceptor } from './common/interceptor/errors.interceptor';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger) // can define global middleware with 'use'
  // app.useGlobalFilters(new HttpExceptionFilter()) // global exception level in here or app.module

  // all exception filter
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionFilter(httpAdapter)); 

  // app.useGlobalGuards(new RolesGuard)

  app.useGlobalInterceptors(new LoggingInterceptor(),
    new TransformInterceptor(),
    new ExcludeNullInterceptor(),
    new ErrorsInterceptor(),
    new TimeoutInterceptor()
  );

  await app.listen(3000);
}
bootstrap();
