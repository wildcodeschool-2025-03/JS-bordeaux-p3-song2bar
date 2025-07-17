import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class favouriteRepository {
  async favouriteBar(favourite: Partial<FavouriteBar>) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO favourite_bar (user_id, bar_id) VALUES (?, ?)",
      [favourite.userId, favourite.barId],
    );

    return result.affectedRows;
  }

  async unfavouriteBar(userId: number, barId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM favourite_bar WHERE user_id = ? AND bar_id = ?",
      [userId, barId],
    );

    return result.affectedRows;
  }

  async favouriteEvent(favourite: Partial<FavouriteEvent>) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO favourite_event (user_id, event_id) VALUES (?, ?)",
      [favourite.userId, favourite.eventId],
    );

    return result.affectedRows;
  }

  async unfavouriteEvent(userId: number, eventId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM favourite_event WHERE user_id = ? AND event_id = ?",
      [userId, eventId],
    );

    return result.affectedRows;
  }

  async unFavouriteMusicGroup(userId: number, musicGroupId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM favourite_music_group WHERE user_id = ? AND music_group_id = ?",
      [userId, musicGroupId],
    );
    return result.affectedRows;
  }
}

export default new favouriteRepository();
