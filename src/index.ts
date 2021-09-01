import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();
    // const post = orm.em.create(Post, { title: 'Hey!'});
    // await orm.em.persistAndFlush(post);
    // or
    // await orm.em.nativeInsert(Post, { title: 'Hey!'});
    const app = express();
    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver],
            validate: true
        }),
	    context: () => ({ em: orm.em })
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });
    
    app.listen(4000, () => console.log('Server started on localhost:4000'));
}

main();