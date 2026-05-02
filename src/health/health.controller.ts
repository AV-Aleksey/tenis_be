import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorService,
} from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Пробы работоспособности (liveness) и готовности (readiness).
 */
@ApiTags('Состояние')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly healthIndicator: HealthIndicatorService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('live')
  @ApiOperation({ summary: 'Проба работоспособности' })
  executeLivenessCheck(): { status: string } {
    return { status: 'ok' };
  }

  @Get('ready')
  @HealthCheck()
  @ApiOperation({ summary: 'Проба готовности (база данных)' })
  async executeReadinessCheck(): Promise<unknown> {
    return this.health.check([
      async () => {
        const check = this.healthIndicator.check('database');
        try {
          await this.prisma.$queryRawUnsafe('SELECT 1');
          return check.up();
        } catch {
          return check.down();
        }
      },
    ]);
  }
}
