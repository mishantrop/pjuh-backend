import { Logger } from '@nestjs/common'
import { Options } from '@mikro-orm/core'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { Book } from './entities'

const logger = new Logger('MikroORM')

// npx mikro-orm migration:create   # Create new migration with current schema diff
// npx mikro-orm migration:up       # Migrate up to the latest version
// npx mikro-orm migration:down     # Migrate one step down
// npx mikro-orm migration:list     # List all executed migrations
// npx mikro-orm migration:pending  # List all pending migrations
// npx mikro-orm migration:fresh    # Drop the database and migrate up to the latest version

const config: Options = {
    dbName: process.env.POSTGRES_DB,
    debug: true,
    entities: [Book],
    highlighter: new SqlHighlighter(),
    host: process.env.POSTGRES_HOST,
    logger: logger.log.bind(logger),
    migrations: {
        path: 'dist/migrations',
        pathTs: 'src/migrations',
    },
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    type: 'postgresql',
    user: process.env.POSTGRES_USER,
}

export default config
