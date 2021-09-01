import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";


@ObjectType()
@Entity()
export class Post {
    @Field(() => Int)
    @PrimaryKey()
    id!: number; // string is also supported

    @Field(() => String)
    @Property({ type: 'text' })
    title!: string;

    @Field()
    @Property({ type: 'date' })
    createdAt: Date = new Date();

    @Field()
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
  }