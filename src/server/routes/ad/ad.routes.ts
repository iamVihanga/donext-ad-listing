import { createRoute, z } from "@hono/zod-openapi";
import {
  jsonContent,
  jsonContentOneOf,
  jsonContentRequired,
} from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";

import {
  createErrorSchema,
  createMessageObjectSchema,
} from "stoker/openapi/schemas";
import { notFoundSchema } from "@/server/helpers/constants";
import { serverAuthMiddleware } from "@/server/middlewares/auth-middleware";

import * as schemas from "./ad.schemas";

const tags = ["Ad"];

// --------- List Ads ----------
export const list = createRoute({
  tags,
  summary: "List all ads",
  description: "Retrieve a list of all ads",
  path: "/",
  method: "get",
  request: {
    query: schemas.querySchema.extend({
      filterByUser: z.boolean().default(false).optional(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      schemas.withPaginationSchema,
      "The list of ads"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({ message: z.string() }),
      "Something went wrong while fetching ads"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ message: z.string() }),
      "Unauthorized"
    ),
  },
});

export type ListRoute = typeof list;

// --------- Create Ad ----------
export const create = createRoute({
  tags,
  summary: "Create a new ad",
  description: "Fill all required fields to create a new ad",
  path: "/",
  method: "post",
  middleware: [serverAuthMiddleware],
  request: {
    body: jsonContentRequired(
      schemas.createAdSchema,
      "The ad details to create"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      schemas.selectAdSchema,
      "The created ad"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ message: z.string() }),
      "Unauthorized"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      z.object({ message: z.string() }),
      "The validation error(s)"
    ),
  },
});

export type CreateRoute = typeof create;

// --------- Get Single Ad by ID ----------
export const getOne = createRoute({
  tags,
  summary: "Get a single ad by ID",
  description: "Retrieve details of a specific ad using its ID",
  path: "/{id}",
  method: "get",
  request: {
    params: schemas.IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      schemas.selectAdSchema,
      "Requested ad by id"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ message: z.string() }),
      "Ad not found"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      z.object({ message: z.string() }),
      "Invalid id error"
    ),
  },
});

export type GetOneRoute = typeof getOne;

// --------- Update Task ----------
export const update = createRoute({
  tags,
  summary: "Update an existing ad",
  description: "Update the details of an existing ad using its ID",
  path: "/{id}",
  method: "put",
  middleware: [serverAuthMiddleware],
  request: {
    params: schemas.IdParamsSchema,
    body: jsonContentRequired(
      schemas.updateAdSchema,
      "New ad details to update"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(schemas.selectAdSchema, "The updated ad"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [
        createErrorSchema(schemas.updateAdSchema),
        createErrorSchema(schemas.IdParamsSchema),
      ],
      "The validation error(s)"
    ),
  },
});

export type UpdateRoute = typeof update;

// --------- Delete Ad ----------
export const remove = createRoute({
  tags,
  summary: "Delete an ad",
  description: "Delete an ad using its ID",
  path: "/{id}",
  method: "delete",
  middleware: [serverAuthMiddleware],
  request: {
    params: schemas.IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Ad deleted successfully",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Ad not found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(schemas.IdParamsSchema),
      "Invalid Id param"
    ),
  },
});

export type RemoveRoute = typeof remove;

// --------- Get User's Ads ----------
// export const getUserAds = createRoute({
//   tags,
//   summary: "Get current user's ads",
//   description: "Retrieve all ads created by the currently authenticated user",
//   path: "/by-user", // <-- Changed from "/user" to "/by-user" to be more specific
//   method: "get",
//   middleware: [serverAuthMiddleware],
//   responses: {
//     [HttpStatusCodes.OK]: jsonContent(
//       z.array(schemas.selectAdSchema),
//       "User's ads"
//     ),
//     [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
//       z.object({ message: z.string() }),
//       "Unauthorized"
//     ),
//     [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
//       z.object({ message: z.string() }),
//       "Something went wrong while fetching user ads"
//     ),
//   },
// });

// export type GetUserAdsRoute = typeof getUserAds;
