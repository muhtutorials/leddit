import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);

    const post = orm.em.create(Post, { title: 'Hey!'});
    await orm.em.persistAndFlush(post);
    // or
    await orm.em.nativeInsert(Post, { title: 'Hey!'});
}

main();