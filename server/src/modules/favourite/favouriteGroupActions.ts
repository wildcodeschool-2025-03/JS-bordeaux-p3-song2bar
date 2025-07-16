import type { RequestHandler } from "express";
import FavouriteGroupRepository from "./favouriteGroupRepository";

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.body.user_id);
    const groupId = Number(req.body.music_group_id);

    if (Number.isNaN(userId) || Number.isNaN(groupId)) {
      res.status(400).json({ error: "Invalid user_id or music_group_id" });
      return;
    }

    const deletedCount = await FavouriteGroupRepository.delete(userId, groupId);

    if (deletedCount === 0) {
      res.status(404).json({ error: "Favourite group not found" });
      console.log("Deleting", userId, groupId);

      return;
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { destroy };
