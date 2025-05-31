import { prisma } from "@/server/prisma/client";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/types/server";
import { GetOneRoute, ListRoute, SaveRoute, RemoveRoute } from "./media.routes";

// ---- List Media Handler ----
export const list: AppRouteHandler<ListRoute> = async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const media = await prisma.media.findMany({
    where: {
      uploaderId: user.id
    }
  });

  return c.json(media, HttpStatusCodes.OK);
};

// ---- Save Media Handler ----
export const save: AppRouteHandler<SaveRoute> = async (c) => {
  const user = c.get("user");
  const mediaDetails = c.req.valid("json");

  console.log({ mediaDetails });

  if (!user) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const createdMedia = await prisma.media.create({
    data: { ...mediaDetails, uploaderId: user.id }
  });

  return c.json(createdMedia, HttpStatusCodes.CREATED);
};

// ---- Get single media by id Handler ----
export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const mediaId = c.req.valid("param").id;
  const user = c.get("user");

  if (!user) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const media = await prisma.media.findUnique({
    where: { id: mediaId, uploaderId: user.id }
  });

  if (!media) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(media, HttpStatusCodes.OK);
};

// ---- Delete Ad Handler ----
export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const mediaId = c.req.valid("param").id;
  const user = c.get("user");

  if (!user) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const deletedMedia = await prisma.media.delete({
    where: { id: mediaId, uploaderId: user.id }
  });

  return c.json(deletedMedia, HttpStatusCodes.OK);
};
