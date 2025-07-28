import type { RequestHandler } from "express";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import favouriteRepository from "./favouriteRepository";

const readByBarId: RequestHandler = async (req, res, next): Promise<void> => {
  if (!req.auth?.role) {
    res.sendStatus(StatusCodes.FORBIDDEN);
    return;
  }

  try {
    const userId = Number(req.auth?.sub);
    const barId = Number(req.params.barId);

    if (!userId || !barId || Number.isNaN(userId) || Number.isNaN(barId)) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const favourite = await favouriteRepository.findBarFavourited(
      userId,
      barId,
    );

    res.status(StatusCodes.OK).json({ favourite: !!favourite });
  } catch (err) {
    next(err);
    return;
  }
};

const addFavouriteBar: RequestHandler = async (req, res, next) => {
  if (!req.auth?.role) {
    res.sendStatus(StatusCodes.FORBIDDEN);
    return;
  }

  try {
    const userId = Number.parseInt(req.auth?.sub);
    const barId = Number(req.body.barId);

    if (!userId || !barId || Number.isNaN(userId) || Number.isNaN(barId)) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const affectedRows = await favouriteRepository.favouriteBar(userId, barId);

    if (affectedRows <= 0) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "La favorisation du bar a échoué" });
    } else {
      res.status(StatusCodes.CREATED).json({ affectedRows });
    }
  } catch (err) {
    next(err);
  }
};

const destroyFavouriteBar: RequestHandler = async (req, res, next) => {
  if (!req.auth?.role) {
    res.sendStatus(StatusCodes.FORBIDDEN);
    return;
  }

  try {
    const userId = Number(req.auth?.sub);
    const barId = Number(req.params.barId);

    if (
      !userId ||
      !barId ||
      typeof userId !== "number" ||
      typeof barId !== "number"
    ) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const affectedRows = await favouriteRepository.unfavouriteBar(
      userId,
      barId,
    );

    if (affectedRows <= 0) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Echec de la suppression" });
    } else {
      res.status(StatusCodes.OK).json({ affectedRows });
    }
  } catch (err) {
    next(err);
  }
};

const readByEventId: RequestHandler = async (req, res, next): Promise<void> => {
  if (!req.auth?.role) {
    res.sendStatus(StatusCodes.FORBIDDEN);
    return;
  }

  try {
    const userId = Number(req.auth?.sub);
    const eventId = Number(req.params.eventId);

    if (!userId || !eventId || Number.isNaN(userId) || Number.isNaN(eventId)) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const favourite = await favouriteRepository.findEventFavourited(
      userId,
      eventId,
    );

    res.status(StatusCodes.OK).json({ favourite: !!favourite });
  } catch (err) {
    next(err);
    return;
  }
};

const addFavouriteEvent: RequestHandler = async (req, res, next) => {
  if (!req.auth?.role) {
    res.sendStatus(StatusCodes.FORBIDDEN);
    return;
  }

  try {
    const userId = Number.parseInt(req.auth?.sub);
    const eventId = Number(req.body.eventId);

    if (!userId || !eventId || Number.isNaN(userId) || Number.isNaN(eventId)) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const affectedRows = await favouriteRepository.favouriteEvent(
      userId,
      eventId,
    );

    if (affectedRows <= 0) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "La favorisation de l'évènement a échoué" });
    } else {
      res.status(StatusCodes.CREATED).json({ affectedRows });
    }
  } catch (err) {
    next(err);
  }
};

const destroyFavouriteEvent: RequestHandler = async (req, res, next) => {
  if (!req.auth?.role) {
    res.sendStatus(StatusCodes.FORBIDDEN);
    return;
  }

  try {
    const userId = Number(req.auth?.sub);
    const eventId = Number(req.params.eventId);

    if (
      !userId ||
      !eventId ||
      typeof userId !== "number" ||
      typeof eventId !== "number"
    ) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const affectedRows = await favouriteRepository.unfavouriteEvent(
      userId,
      eventId,
    );

    if (affectedRows <= 0) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Echec de la suppression" });
    } else {
      res.status(StatusCodes.OK).json({ affectedRows });
    }
  } catch (err) {
    next(err);
  }
};

const getFavouriteGroups: RequestHandler = async (req, res, next) => {
  if (!req.auth?.role) {
    res.sendStatus(StatusCodes.FORBIDDEN);
    return;
  }

  try {
    const userId = Number(req.auth?.sub);

    if (!userId || typeof userId !== "number") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const favouriteGroups =
      await favouriteRepository.getFavouriteGroupsByUserId(userId);

    res.status(StatusCodes.OK).json(favouriteGroups);
  } catch (err) {
    next(err);
  }
};

const readByMusicGroupId: RequestHandler = async (
  req,
  res,
  next,
): Promise<void> => {
  if (!req.auth?.role) {
    res.sendStatus(StatusCodes.FORBIDDEN);
    return;
  }

  try {
    const userId = Number(req.auth?.sub);
    const musicGroupId = Number(req.params.musicGroupId);

    if (
      !userId ||
      !musicGroupId ||
      Number.isNaN(userId) ||
      Number.isNaN(musicGroupId)
    ) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }
    const favourite = await favouriteRepository.findMusicGroupFavourited(
      userId,
      musicGroupId,
    );

    res.status(StatusCodes.OK).json({ favourite: !!favourite });
  } catch (err) {
    next(err);
    return;
  }
};

const addFavouriteMusicGroup: RequestHandler = async (req, res, next) => {
  if (!req.auth?.role) {
    res.sendStatus(StatusCodes.FORBIDDEN);
    return;
  }

  try {
    const userId = Number.parseInt(req.auth?.sub);
    const musicGroupId = Number(req.body.musicGroupId);

    if (
      !userId ||
      !musicGroupId ||
      typeof userId !== "number" ||
      typeof musicGroupId !== "number"
    ) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const affectedRows = await favouriteRepository.favouriteMusicGroup(
      userId,
      musicGroupId,
    );

    if (affectedRows <= 0) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "La favorisation du groupe de musique a échoué !" });
    } else {
      res.status(StatusCodes.CREATED).json({
        message: "Une ressource a été créée avec succès sur le serveur",
      });
    }
  } catch (err) {
    next(err);
  }
};

const destroyFavouriteMusicGroup: RequestHandler = async (req, res, next) => {
  if (!req.auth?.role) {
    res.sendStatus(StatusCodes.FORBIDDEN);
    return;
  }

  try {
    const userId = Number(req.auth?.sub);
    const musicGroupId = Number(req.params.musicGroupId);

    if (Number.isNaN(userId) || Number.isNaN(musicGroupId)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid user_id or music_group_id" });
      return;
    }

    const affectedRows = await favouriteRepository.unfavouriteMusicGroup(
      userId,
      musicGroupId,
    );

    if (affectedRows <= 0) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Echec de la suppression" });
    } else {
      res.status(StatusCodes.OK).json({ affectedRows });
    }
  } catch (err) {
    next(err);
  }
};

const displayParticipation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const eventId = Number(req.params.eventId);
    if (Number.isNaN(eventId)) {
      res.status(400).json({ message: "eventId invalide" });
      return;
    }

    const participantsCount = await favouriteRepository.favouriteCount(eventId);

    if (participantsCount <= 0) {
      res.status(404).json({ message: "Aucune participation trouvée" });
    } else {
      res.status(200).json({ participantsCount });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  addFavouriteBar,
  destroyFavouriteBar,
  addFavouriteEvent,
  destroyFavouriteEvent,
  getFavouriteGroups,
  addFavouriteMusicGroup,
  destroyFavouriteMusicGroup,
  readByBarId,
  readByEventId,
  readByMusicGroupId,
  displayParticipation,
};
