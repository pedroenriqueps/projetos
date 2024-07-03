import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import {
  routerGet,
  routerPost,
  routerCreateUser,
  routerAuthUser,
} from "./routes/route.js";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(routerGet);
app.use(routerPost);
app.use(routerAuthUser);
app.use(routerCreateUser);

app.listen(PORT, () => {
  console.log(`Server running`);
});
