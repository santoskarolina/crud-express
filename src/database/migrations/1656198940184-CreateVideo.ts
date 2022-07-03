import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateVideo1656198940184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'video',
                columns: [
                    {
                        name: 'video_id',
                        type: 'int',
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
                        name: 'duration',
                        type: "numeric",
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "category_id",
                        type: "int"
                    }
                ],

                foreignKeys: [
                    {
                        name: "fk_video_categeory",
                        columnNames: ["category_id"],
                        referencedTableName: "categories",
                        referencedColumnNames: ["category_id"],
                    }
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("video")
    }

}
