/* eslint-disable indent */
import { Entity, Property, PrimaryKey } from '@mikro-orm/core'

@Entity()
export class Book {
    @PrimaryKey()
    id!: number

    @Property()
    title: string

    constructor(title: string) {
        this.title = title
        // this.author = author
    }
}
