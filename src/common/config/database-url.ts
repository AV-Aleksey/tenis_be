/**
 * Собирает строку подключения PostgreSQL из переменных окружения.
 */
type DatabaseUrlParts = {
  readonly host: string;
  readonly port: number;
  readonly login: string;
  readonly password: string;
  readonly name: string;
  readonly schema: string;
};

const DEFAULT_DB_PORT = 5432;
const DEFAULT_DB_SCHEMA = 'public';

function buildDatabaseUrl(parts: DatabaseUrlParts): string {
  const login: string = encodeURIComponent(parts.login);
  const password: string = encodeURIComponent(parts.password);

  return `postgresql://${login}:${password}@${parts.host}:${String(parts.port)}/${parts.name}?schema=${parts.schema}`;
}

type EnvGetter = (key: string) => string | undefined;

/**
 * @param getEnv - геттер значений (по умолчанию `process.env`). Если задан `DATABASE_URL`, он используется как есть.
 */
export function buildDatabaseUrlFromEnv(
  getEnv: EnvGetter = (key: string): string | undefined => process.env[key],
): string {
  const explicitUrl: string | undefined = getEnv('DATABASE_URL');

  if (explicitUrl !== undefined && explicitUrl.length > 0) {
    return explicitUrl;
  }

  const host: string = getEnv('DB_HOST') ?? 'localhost';
  const portRaw: string | undefined = getEnv('DB_PORT');
  const port: number =
    portRaw === undefined ? DEFAULT_DB_PORT : Number.parseInt(portRaw, 10);
  const login: string | undefined = getEnv('DB_LOGIN');
  const password: string | undefined = getEnv('DB_PASSWORD');
  const name: string | undefined = getEnv('DB_NAME');
  const schema: string = getEnv('DB_SCHEMA') ?? DEFAULT_DB_SCHEMA;

  if (
    login === undefined ||
    password === undefined ||
    name === undefined ||
    Number.isNaN(port)
  ) {
    throw new Error(
      'Set DATABASE_URL or DB_HOST, DB_PORT, DB_LOGIN, DB_PASSWORD, DB_NAME (optional DB_SCHEMA).',
    );
  }
  return buildDatabaseUrl({
    host,
    port,
    login,
    password,
    name,
    schema,
  });
}
