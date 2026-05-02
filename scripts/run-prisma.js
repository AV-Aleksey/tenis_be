"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const node_child_process_1 = require("node:child_process");
const database_url_1 = require("../src/common/config/database-url");
(0, dotenv_1.config)();
process.env.DATABASE_URL = (0, database_url_1.buildDatabaseUrlFromEnv)();
const args = process.argv.slice(2);
const result = (0, node_child_process_1.spawnSync)('npx', ['prisma', ...args], {
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
});
process.exit(result.status ?? 1);
//# sourceMappingURL=run-prisma.js.map