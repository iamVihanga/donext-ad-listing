import { createRoute } from "@hono/zod-openapi";
import {
  jsonContent,
  jsonContentOneOf,
  jsonContentRequired
} from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { z } from "zod";

import {
  TasksSchema,
  TasksCreateInputSchema
} from "@/types/schema-types/index";
import {
  createErrorSchema,
  createMessageObjectSchema
} from "stoker/openapi/schemas";
import { notFoundSchema } from "@/server/helpers/constants";
import { serverAuthMiddleware } from "@/server/middlewares/auth-middleware";

const tags = ["Tasks"];

const IdParamsSchema = z.object({ id: z.string() });

// --------- List Tasks ----------
export const list = createRoute({
  tags,
  path: "/",
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(TasksSchema), "The list of tasks")
  }
});

export type ListRoute = typeof list;

// --------- Create Task ----------
const createTaskSchema = TasksCreateInputSchema.refine(
  (data) => {
    return data.name.length > 0;
  },
  { message: "Task name is required !", path: ["name"] }
);

export const create = createRoute({
  tags,
  path: "/",
  method: "post",
  // middleware: [serverAuthMiddleware],
  request: {
    body: jsonContentRequired(createTaskSchema, "The task to create")
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      createTaskSchema,
      "The created task"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(createTaskSchema),
      "The validation error(s)"
    )
  }
});

export type CreateRoute = typeof create;

// --------- Get One ----------

export const getOne = createRoute({
  tags,
  path: "/{id}",
  method: "get",
  request: {
    params: IdParamsSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(TasksSchema, "Requested task by id"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error"
    )
  }
});

export type GetOneRoute = typeof getOne;

// --------- Update Task ----------
// const updateTaskSchema = TasksUpdateInputSchema;
const updateTaskSchema = TasksSchema.partial().omit({ id: true });

export const update = createRoute({
  tags,
  path: "/{id}",
  method: "put",
  middleware: [serverAuthMiddleware],
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(updateTaskSchema, "Update task data")
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(TasksSchema, "The updated task"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(updateTaskSchema), createErrorSchema(IdParamsSchema)],
      "The validation error(s)"
    )
  }
});

export type UpdateRoute = typeof update;

// --------- Delete Task ----------
export const remove = createRoute({
  tags,
  path: "/{id}",
  method: "delete",
  middleware: [serverAuthMiddleware],
  request: {
    params: IdParamsSchema
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Task deleted successfully"
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid Id param"
    )
  }
});

export type RemoveRoute = typeof remove;
