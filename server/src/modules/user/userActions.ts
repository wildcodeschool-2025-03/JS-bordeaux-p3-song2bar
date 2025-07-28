import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "./userRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      res.sendStatus(StatusCodes.CONFLICT);
      return;
    }

    const { lastname, firstname, hashed_password } = req.body;
    const role = "user";

    if (
      !lastname ||
      lastname.length < 2 ||
      typeof lastname !== "string" ||
      !/^[a-zA-ZÀ-ÿ\s\-']+$/.test(lastname) ||
      !firstname ||
      firstname.length < 2 ||
      !/^[a-zA-ZÀ-ÿ\s\-']+$/.test(firstname) ||
      typeof firstname !== "string" ||
      !email ||
      email === "" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof email !== "string"
    ) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    } else {
      await userRepository.create({
        lastname,
        firstname,
        role,
        email,
        hashed_password,
      });

      res.sendStatus(StatusCodes.CREATED);
    }
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    if (Number.isNaN(userId)) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid user ID" });
      return;
    }

    const user = await userRepository.read(userId);

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
      return;
    }

    const { id, firstname, lastname } = user;
    res.json({ id, firstname, lastname });
  } catch (err) {
    next(err);
  }
};

export default { add, read };
