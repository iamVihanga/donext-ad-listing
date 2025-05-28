import { prisma } from "@/server/prisma/client";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/types/server";
import {
  ListRoute,
  CreateRoute,
  GetOneRoute,
  UpdateRoute,
  RemoveRoute
} from "./ad.routes";

// ---- List Ads Handler ----
export const list: AppRouteHandler<ListRoute> = async (c) => {
  const ads = await prisma.ad.findMany({});

  return c.json(ads, HttpStatusCodes.OK);
};

// ---- Create Ads Handler ----
export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const adDetails = c.req.valid("json");

  const createdAd = await prisma.ad.create({
    data: adDetails
  });

  return c.json(createdAd, HttpStatusCodes.CREATED);
};

// ---- Get single Ad Handler ----
export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const adId = c.req.valid("param").id;

  const ad = await prisma.ad.findUnique({
    where: { id: adId }
  });

  if (!ad) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(ad, HttpStatusCodes.OK);
};

// ---- Update Ad Handler ----
export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const adId = c.req.valid("param").id;
  const adUpdates = c.req.valid("json");

  const ad = await prisma.ad.update({
    where: { id: adId },
    data: adUpdates
  });

  return c.json(ad, HttpStatusCodes.OK);
};

// ---- Delete Ad Handler ----
export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const adId = c.req.valid("param").id;

  const deletedAd = await prisma.ad.delete({
    where: { id: adId }
  });

  return c.json(deletedAd, HttpStatusCodes.OK);
};
