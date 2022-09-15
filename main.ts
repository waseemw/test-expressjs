import "source-map-support/register";
import Fastify from "fastify";

export const fastify = Fastify();
import {UserController} from "./user/user.controller";


fastify.listen(3000);


new UserController();