import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { ParticipateList } from "../../types/participateList";

class participateRepository {
  async create(userId: number, eventId: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO participate (user_id, event_id) VALUES (?, ?)",
      [userId, eventId],
    );

    return result.affectedRows;
  }

  async delete(userId: number, eventId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM participate WHERE user_id = ? AND event_id = ?",
      [userId, eventId],
    );

    return result.affectedRows;
  }

  async readAllByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        p.*,
        e.*, 
        b.name AS bar_name,
        g.name AS group_name,
        g.style AS music_style
      FROM participate p
      LEFT JOIN event e ON p.event_id = e.id
      LEFT JOIN bar b ON e.bar_id = b.id
      LEFT JOIN music_group g ON e.music_group_id = g.id
      WHERE p.user_id = ?`,
      [userId],
    );

    return rows;
  }

  async findParticipation(userId: number, eventId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM participate WHERE user_id = ? AND event_id = ?",
      [userId, eventId],
    );

    return rows.length > 0 ? rows[0] : null;
  }
}

export default new participateRepository();
