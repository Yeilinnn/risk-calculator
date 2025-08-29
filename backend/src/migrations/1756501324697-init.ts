import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1756501324697 implements MigrationInterface {
    name = 'Init1756501324697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`risks\` (\`id\` varchar(36) NOT NULL, \`hazard\` varchar(255) NOT NULL, \`likelihood\` tinyint UNSIGNED NOT NULL, \`severity\` tinyint UNSIGNED NOT NULL, \`score\` int UNSIGNED NOT NULL, \`level\` enum ('Low', 'Medium', 'High', 'Critical') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_risk_hazard\` (\`hazard\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx_risk_hazard\` ON \`risks\``);
        await queryRunner.query(`DROP TABLE \`risks\``);
    }

}
