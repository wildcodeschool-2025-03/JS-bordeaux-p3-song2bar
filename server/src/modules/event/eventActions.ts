import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import eventRepository from "./eventRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const events = await eventRepository.readAll();

    res.json(events);
  } catch (err) {
    console.error("Erreur lors de la récupération des événements :", err);
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

export default { browse, read };
