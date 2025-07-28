import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { MusicGroup } from "../../types/musicGroup";

class FavouriteRepository {
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
  async favouriteMusicGroup(userId: number, musicGroupId: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO favourite_music_group (user_id, music_group_id) VALUES (?, ?)",
      [userId, musicGroupId],
    );
    return result.affectedRows;
  }

  async unfavouriteMusicGroup(userId: number, musicGroupId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM favourite_music_group WHERE user_id = ? AND music_group_id = ?",
      [userId, musicGroupId],
    );

    return result.affectedRows;
  }

  async getFavouriteGroupsByUserId(userId: number): Promise<MusicGroup[]> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT mg.id, mg.name, mg.style, mg.image, mg.description
       FROM music_group mg
       INNER JOIN favourite_music_group fmg ON mg.id = fmg.music_group_id
       WHERE fmg.user_id = ?`,
      [userId],
    );

    return rows as MusicGroup[];
  }

  async getFavouriteEventsByUserId(userId: number): Promise<any[]> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT e.id, e.title, e.date, e.start_at, e.end_at, e.description, e.image,
              e.bar_id, e.music_group_id as group_id, e.title as event_name,
              b.name as bar_name, b.address, b.postcode, b.city, b.latitude, b.longitude,
              mg.name as music_group_name, mg.style as music_style,
              HOUR(e.start_at) as hour_only,
              e.music_group_id
       FROM event e
       INNER JOIN favourite_event fe ON e.id = fe.event_id
       INNER JOIN bar b ON e.bar_id = b.id
       INNER JOIN music_group mg ON e.music_group_id = mg.id
       WHERE fe.user_id = ?
       ORDER BY e.date ASC`,
      [userId],
    );

    return rows as any[];
  }

  async favouriteGroup(userId: number, groupId: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO favourite_music_group (user_id, music_group_id) VALUES (?, ?)",
      [userId, groupId],
    );

    return result.affectedRows;
  }

  async unfavouriteGroup(userId: number, groupId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM favourite_music_group WHERE user_id = ? AND music_group_id = ?",
      [userId, groupId],
    );

    return result.affectedRows;
  }
  async favouriteCount(event_id: number): Promise<number> {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS count FROM participate WHERE event_id = ?",
      [event_id],
    );

    return rows[0].count;
  }
}

export default new FavouriteRepository();
