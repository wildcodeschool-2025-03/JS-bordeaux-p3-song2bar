import express from "express";
import favouriteActions from "./modules/Favourite/favouriteActions";
import authActions from "./modules/authActions";
import barActions from "./modules/bar/barActions";
import eventActions from "./modules/event/eventActions";
import groupActions from "./modules/groups/groupActions";
import participateActions from "./modules/participate/participateActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

router.get("/api/events", eventActions.browse);
router.get("/api/events/:id", eventActions.read);

router.get("/api/groups/:id", groupActions.read);

router.get("/api/bars/:id", barActions.read);

router.post("/api/users", authActions.hashPassword, userActions.add);

router.post("/api/login", authActions.login);

//router.use(authActions.verifyToken);

router.post("/api/participate", participateActions.add);
router.delete("/api/participate/:userId/:eventId", participateActions.remove);

router.post("/api/favourite_bar", favouriteActions.addFavouriteBar);
router.delete(
  "/api/favourite_bar/:userId/:barId",
  favouriteActions.destroyFavouriteBar,
);

router.post("/api/favourite_event", favouriteActions.addFavouriteEvent);
router.delete(
  "/api/favourite_event/:userId/:eventId",
  favouriteActions.destroyFavouriteEvent,
);

router.delete(
  "/api/favourite_music_group/:userId/:musicGroupId",
  favouriteActions.destroyFavouriteMusicGroup,
);

export default router;
