import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategories1655068419682 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'categories',
                columns: [
                    {
                        name: 'category_id',
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        isUnique: true,
                    },
                    {
                        name: 'name',
                        type: "varchar",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories")
    }
}
