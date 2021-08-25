import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {
    @PrimaryKey()
    id!: number; // string is also supported
    
    @Property()
    title!: string;

    @Property()
    createdAt: Date = new Date();
  
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
  }