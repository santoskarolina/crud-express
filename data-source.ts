import { DataSource } from "typeorm"
import { Category } from "./src/entities/category.entity";
import { Video } from "./src/entities/video.entity";

const myDataSource   = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "filmes",
    schema: "private",
    entities: [Category , Video],
    migrationsRun: true,
    migrationsTableName: "migrations",
    migrations: ['src/database/migrations/*.ts'],
})

export default myDataSource;