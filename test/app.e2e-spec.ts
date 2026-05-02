import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { HttpExceptionFilter } from './../src/common/filters/http-exception.filter';
import { PrismaService } from './../src/prisma/prisma.service';

describe('Проверки (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        onModuleInit: (): Promise<void> => Promise.resolve(),
        onModuleDestroy: (): Promise<void> => Promise.resolve(),
        $connect: (): Promise<void> => Promise.resolve(),
        $disconnect: (): Promise<void> => Promise.resolve(),
        $runCommandRaw: (): Promise<unknown> => Promise.resolve({}),
      })
      .compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('GET /api/v1/admin/test', () => {
    return request(app.getHttpServer())
      .get('/api/v1/admin/test')
      .expect(200)
      .expect((res: { body: { ok: boolean; message: string } }) => {
        expect(res.body.ok).toBe(true);
        expect(res.body.message).toBe('hello-world');
      });
  });

  it('GET /api/v1/health/live', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health/live')
      .expect(200)
      .expect({ status: 'ok' });
  });

  afterEach(async () => {
    await app.close();
  });
});
