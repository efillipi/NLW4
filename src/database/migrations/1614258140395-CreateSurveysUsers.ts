import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSurveysUsers1614258140395 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'surveys_users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'survey_id',
                        type: 'uuid',
                    },
                    {
                        name: 'value',
                        type: 'number',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',

                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            "surveys_users",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                name: "fk_uers_user_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "surveys_users",
            new TableForeignKey({
                columnNames: ["survey_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "surveys",
                name: "fk_surveys_survey_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey(
            "surveys_users",
            "fk_uers_user_id"
        );

        await queryRunner.dropForeignKey(
            "surveys_users",
            "surveys"
        );

        await queryRunner.dropTable('surveys_users')

    }

}
