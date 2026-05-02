import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';

describe('Контроллер админки', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
    }).compile();
    controller = module.get<AdminController>(AdminController);
  });

  it('executeSmokeTest возвращает hello-world', () => {
    const actual = controller.executeSmokeTest();

    expect(actual.ok).toBe(true);

    expect(actual.message).toBe('hello-world');
  });
});
