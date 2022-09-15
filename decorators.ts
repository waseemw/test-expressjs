import {fastify} from "./main";
import {FastifyReply, FastifyRequest} from "fastify";
import {string, ZodError} from "zod";

export const Path = (path: string) => (target: any, propertyKey: string) => {
    if (!path.startsWith("/")) path = "/" + path;
    endpoint(path, target[propertyKey]);
};

export type EndpointMethod = (body?: object) => object | void | Promise<object> | Promise<void>;
export const endpoint = (path: string, method: EndpointMethod) => {
    if (!path.startsWith("/")) path = "/" + path;
    fastify.post(path, async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            reply.send(await method(request.body as object));
        } catch (e) {
            reply.status(405);
            if (e instanceof ZodError)
                reply.send(e.errors);
            else if (e instanceof string)
                reply.send({message: e});
            else {
                console.error(e);
                reply.send({message: "Internal server error"});
            }
        }
    });
};