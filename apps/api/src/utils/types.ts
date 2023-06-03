import {
  FastifyRequest,
  FastifyReply,
  RouteGenericInterface,
  FastifyInstance,
} from "fastify";

export type FastifyHandler<
  TRoute extends RouteGenericInterface = RouteGenericInterface
> = (
  app: FastifyInstance,
  request: FastifyRequest<TRoute>,
  reply: FastifyReply
) => void;
