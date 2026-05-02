import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * Административные эндпоинты и smoke-test.
 */
@ApiTags('Админ')
@Controller('admin')
export class AdminController {
  @Get('test')
  @ApiOperation({ summary: 'Проверка доступности (smoke test)' })
  executeSmokeTest(): { readonly ok: boolean; readonly message: string } {
    return { ok: true, message: 'hello-world' };
  }
}
