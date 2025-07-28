import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import participateRepository from "./participateRepository";

const browseByUserId: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.auth?.sub);

    if (!userId) {
      res.status(StatusCodes.UNAUTHORIZED);
    }

    const participations = await participateRepository.readAllByUserId(userId);

    if (!participations || participations.length === 0) {
      res.status(StatusCodes.OK).json({ message: "Aucune participation" });
    }

    res.status(StatusCodes.OK).json(participations);
  } catch (err) {
    console.error("Erreur lors de la récupération des participations :", err);
  }
};

const readByEventId: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userId = Number(req.auth?.sub);
    const eventId = Number(req.params.eventId);

    if (!userId || !eventId || Number.isNaN(userId) || Number.isNaN(eventId)) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const participation = await participateRepository.findParticipation(
      userId,
      eventId,
    );

    res.status(StatusCodes.OK).json({ participates: !!participation });
  } catch (err) {
    next(err);
    return;
  }
};

const add: RequestHandler = async (req, res, next) => {
  if (!req.auth.role) {
    res.sendStatus(StatusCodes.FORBIDDEN);
    return;
  }

  try {
    const userId = Number.parseInt(req.auth.sub);
    const eventId = Number(req.body.eventId);

    if (!userId || !eventId || Number.isNaN(userId) || Number.isNaN(eventId)) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }

    const affectedRows = await participateRepository.create(userId, eventId);

    if (affectedRows <= 0) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "La création de la participation a échoué" });
    } else {
      res.status(StatusCodes.CREATED).json({ affectedRows });
    }
  } catch (err) {
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next): Promise<void> => {
  if (!req.auth.role) {
    res.sendStatus(StatusCodes.FORBIDDEN);
    return;
  }

  try {
    const userId = Number(req.auth.sub);
    const eventId = Number(req.params.eventId);

    if (!userId || !eventId || Number.isNaN(userId) || Number.isNaN(eventId)) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const affectedRows = await participateRepository.delete(userId, eventId);

    if (affectedRows <= 0) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Echec de la suppression" });
      return;
    }

    res.status(StatusCodes.OK).json({ affectedRows });
  } catch (err) {
    next(err);
    return;
  }
};

export default { add, remove, browseByUserId, readByEventId };
