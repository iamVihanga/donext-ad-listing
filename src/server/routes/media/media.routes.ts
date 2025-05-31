import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";

import {
  createErrorSchema,
  createMessageObjectSchema
} from "stoker/openapi/schemas";
import { notFoundSchema } from "@/server/helpers/constants";
import { serverAuthMiddleware } from "@/server/middlewares/auth-middleware";

import * as schemas from "./media.schemas";

const tags = ["Media"];

// --------- List All Media ----------
export const list = createRoute({
  tags,
  summary: "List all media",
  description: "Retrieve a list of all media",
  path: "/",
  method: "get",
  middleware: [serverAuthMiddleware],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(schemas.selectMediaSchema),
      "The list of media"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    )
  }
});

export type ListRoute = typeof list;

// --------- Save Media ----------
export const save = createRoute({
  tags,
  summary: "Create a new media",
  description: "Fill all required fields to create a new media",
  path: "/",
  method: "post",
  middleware: [serverAuthMiddleware],
  request: {
    body: jsonContentRequired(
      schemas.saveMediaSchema,
      "The ad details to create"
    )
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      schemas.selectMediaSchema,
      "The created media"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(schemas.saveMediaSchema),
      "The validation error(s)"
    )
  }
});

export type SaveRoute = typeof save;

// --------- Get Single Media by ID ----------
export const getOne = createRoute({
  tags,
  summary: "Get a single media by ID",
  description: "Retrieve details of a specific media using its ID",
  path: "/{id}",
  method: "get",
  middleware: [serverAuthMiddleware],
  request: {
    params: schemas.IdParamsSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      schemas.selectMediaSchema,
      "Requested media by id"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Media not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(schemas.IdParamsSchema),
      "Invalid id error"
    )
  }
});

export type GetOneRoute = typeof getOne;

// --------- Delete Media by Id route ----------
export const remove = createRoute({
  tags,
  summary: "Delete a media",
  description: "Delete a media using its ID",
  path: "/{id}",
  method: "delete",
  middleware: [serverAuthMiddleware],
  request: {
    params: schemas.IdParamsSchema
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Media deleted successfully"
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Media not found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(schemas.IdParamsSchema),
      "Invalid Id param"
    )
  }
});

export type RemoveRoute = typeof remove;
