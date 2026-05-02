import { config } from 'dotenv';
import { spawnSync } from 'node:child_process';
import { buildDatabaseUrlFromEnv } from '../src/common/config/database-url';

config();
process.env.DATABASE_URL = buildDatabaseUrlFromEnv();
const args: string[] = process.argv.slice(2);
const result = spawnSync('npx', ['prisma', ...args], {
  stdio: 'inherit',
  env: process.env,
  shell: process.platform === 'win32',
});
process.exit(result.status ?? 1);
