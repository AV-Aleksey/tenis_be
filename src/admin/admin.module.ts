import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';

/**
 * Модуль административных маршрутов.
 */
@Module({
  controllers: [AdminController],
})
export class AdminModule {}
