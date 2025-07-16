import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";

class FavouriteGroupRepository {
  async delete(userId: number, groupId: number) {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "DELETE FROM favourite_music_group WHERE user_id = ? AND music_group_id = ?",
      [userId, groupId],
    );
    return result.affectedRows;
  }
}

export default new FavouriteGroupRepository();
