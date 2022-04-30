import { Migration } from '@mikro-orm/migrations'

export class Migration20220424085641 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "book" ("id" serial primary key, "title" varchar(255) not null);',
        )
    }
}
