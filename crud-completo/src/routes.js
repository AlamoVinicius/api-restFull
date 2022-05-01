import { Router } from "express";

import helloController from "./controller/helloController";
import UsersController from "./controller/UsersController";

const routes = new Router();

routes.get("/hello", helloController.index);

//  RESTfull
routes.get("/users", UsersController.index); //all users
routes.get("/users/:id", UsersController.showUser); // only one user
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);

export default routes;
