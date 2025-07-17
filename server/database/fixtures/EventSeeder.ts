import AbstractSeeder from "./AbstractSeeder";
import "dotenv/config";
import client from "../client";

class EventSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "event", truncate: true });
  }

  async run() {
    const [rows] = await client.query("SELECT id, name FROM music_group");
    const groups = rows as { id: number; name: string }[];
    for (let i = 0; i < 24; i++) {
      const randomGroup = groups[Math.floor(Math.random() * groups.length)];
      const fakeEvent = {
        date: this.faker.date.soon({ days: 30 }),
        start_at: this.faker.date.anytime().toTimeString().slice(0, 5),
        end_at: this.faker.date.anytime().toTimeString().slice(0, 5),
        description: this.faker.lorem.paragraph(),
        image: this.faker.image.urlPicsumPhotos({ width: 400, height: 200 }),
        title: `${this.faker.music.genre()} Show with ${this.faker.person.firstName()}`,
        creator_id: this.faker.number.int({ min: 1, max: 30 }),
        bar_id: this.faker.number.int({ min: 1, max: 28 }),
        music_group_id: randomGroup.id,
        refName: `event_${i}`,
      };

      this.insert(fakeEvent);
    }
  }
}

export default EventSeeder;
