import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class BarRepository {
  async readAllBarsByMusicGroupId(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        b.id AS id,
        b.name AS name,
        b.address AS address,
        b.image1 AS image1
      FROM event e
      JOIN bar b ON e.bar_id = b.id
      WHERE e.music_group_id = ?`,
      [id],
    );

    return rows;
  }

  async find(id: number) {
    const [barRows] = await databaseClient.query<Rows>(
      "SELECT * FROM bar WHERE id = ?",
      [id],
    );

    if (barRows.length === 0) {
      return null;
    }

    const bar = barRows[0];

    if (bar.hours_id) {
      const [hoursRows] = await databaseClient.query<Rows>(
        "SELECT * FROM hours WHERE id = ?",
        [bar.hours_id],
      );

      if (hoursRows.length > 0) {
        bar.hours = hoursRows[0];
      }
    }

    // Get upcoming events for this bar, sorted by date
    const [eventRows] = await databaseClient.query<Rows>(
      `SELECT 
        event.id,
        event.title,
        event.date,
        event.start_at,
        event.image,
        music_group.name AS music_group_name,
        music_group.style AS music_style
      FROM event
      LEFT JOIN music_group ON event.music_group_id = music_group.id
      WHERE event.bar_id = ? AND event.date >= CURDATE()
      ORDER BY event.date ASC, event.start_at ASC`,
      [id],
    );

    bar.events = eventRows;

    return bar;
  }
}

export default new BarRepository();
