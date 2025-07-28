import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import barRepository from "./barRepository";

const browseBarsByMusicGroupId: RequestHandler = async (req, res, next) => {
  try {
    const bars = await barRepository.readAllBarsByMusicGroupId(
      Number(req.params.id),
    );

    if (!bars || bars.length === 0) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No bars found for this music group" });
    } else {
      res.status(StatusCodes.OK).json(bars);
    }
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const bar = await barRepository.find(Number(req.params.id));

    if (!bar || bar.length === 0) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Bar not found" });
    } else {
      res.status(StatusCodes.OK).json(bar);
    }
  } catch (err) {
    next(err);
  }
};

export default { browseBarsByMusicGroupId, read };
