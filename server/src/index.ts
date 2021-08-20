import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./Schema";
import cors from "cors";
import { createConnection } from "typeorm";
import { Users } from "./Entities/Users";
import { Notes } from "./Entities/Notes";
import { PASSWORD, USERNAME } from "./config";

const main = async () => {
  await createConnection({
    type: "mysql",
    database: "notescrud",
    username: USERNAME,
    password: PASSWORD,
    logging: true,
    synchronize: true,
    entities: [Users, Notes],
  });

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP((req, res, graphQLParams) => {
      return {
        schema,
        graphiql: true,
        context: { request: req },
      };
    })
  );

  app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
  });
};

main().catch((err) => {
  console.log(err);
});
