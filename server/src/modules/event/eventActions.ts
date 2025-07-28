import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import eventRepository from "./eventRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const search = req.query.search as string;

    const events = search
      ? await eventRepository.readAllEventsFiltered(search)
      : await eventRepository.readAll();

    res.json(events);
  } catch (err) {
    console.error("Erreur lors de la récupération des événements :", err);
  }
};

const browseEventsByBarId: RequestHandler = async (req, res, next) => {
  try {
    const events = await eventRepository.readAllEventsByBarId(
      Number(req.params.id),
    );

    if (!events || events.length === 0) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No events found for this bar" });
    } else {
      res.status(StatusCodes.OK).json(events);
    }
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);
    const event = await eventRepository.find(eventId);

    if (!event) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Event not found" });
    } else {
      res.json(event);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, browseEventsByBarId, read };
