import express from "express";
import favouriteActions from "./modules/favourite/favouriteActions";
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
router.get("/api/groups/:id/bars", barActions.browseBarsByMusicGroupId);
router.get("/api/bars/:id/events", eventActions.browseEventsByBarId);

router.get("/api/users/:id", userActions.read);
router.get("/api/users/favourite_groups", favouriteActions.getFavouriteGroups);
router.get(
  "/api/:eventId/participants/count",
  favouriteActions.displayParticipation,
);

router.get("/api/users/favourite_events", favouriteActions.getFavouriteEvents);

router.post("/api/users", authActions.hashPassword, userActions.add);

router.post("/api/login", authActions.login);

router.use(authActions.verifyToken);

router.get("/api/participate/:eventId", participateActions.findByEventId);

router.post("/api/participate", participateActions.add);
router.delete("/api/participate/:eventId", participateActions.remove);

router.get("/api/favourite_bar/:barId", favouriteActions.readByBarId);
router.post("/api/favourite_bar", favouriteActions.addFavouriteBar);
router.delete(
  "/api/favourite_bar/:barId",
  favouriteActions.destroyFavouriteBar,
);

router.get("/api/favourite_event/:eventId", favouriteActions.readByEventId);
router.post("/api/favourite_event", favouriteActions.addFavouriteEvent);
router.delete(
  "/api/favourite_event/:eventId",
  favouriteActions.destroyFavouriteEvent,
);

router.get(
  "/api/favourite_music_group/:musicGroupId",
  favouriteActions.readByMusicGroupId,
);
router.post(
  "/api/favourite_music_group",
  favouriteActions.addFavouriteMusicGroup,
);
router.delete(
  "/api/favourite_music_group/:musicGroupId",
  favouriteActions.destroyFavouriteMusicGroup,
);

export default router;
