import AbstractSeeder from "./AbstractSeeder";
import "dotenv/config";
import client from "../client";

class EventSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "event", truncate: true });
  }

  async run() {
    const generateEventHours = (isWeekend = false): [string, string] => {
      const openHour = isWeekend
        ? this.faker.number.int({ min: 16, max: 18 })
        : this.faker.number.int({ min: 17, max: 19 });
      const openMinute = this.faker.helpers.arrayElement([0, 30]);

      const closeHour = this.faker.number.int({ min: 23, max: 26 });
      const closeMinute = this.faker.helpers.arrayElement([0, 30]);

      const openTime = `${openHour.toString().padStart(2, "0")}:${openMinute.toString().padStart(2, "0")}`;
      const closeTime = `${(closeHour > 23 ? closeHour - 24 : closeHour).toString().padStart(2, "0")}:${closeMinute.toString().padStart(2, "0")}`;

      return [openTime, closeTime];
    };

    const [rows] = await client.query("SELECT id, name FROM music_group");
    const groups = rows as { id: number; name: string }[];

    const musicGroupToBars = new Map<number, Set<number>>();
    const barGroupCombos = new Set<string>();
    const totalEvents = 120;

    let count = 0;
    let attempts = 0;
    const maxAttempts = 500;

    while (count < totalEvents && attempts < maxAttempts) {
      attempts++;

      const group = groups[Math.floor(Math.random() * groups.length)];
      const barId = this.faker.number.int({ min: 1, max: 28 });
      const comboKey = `${barId}-${group.id}`;

      if (barGroupCombos.has(comboKey)) continue;

      let barsSet = musicGroupToBars.get(group.id);
      if (!barsSet) {
        barsSet = new Set();
        musicGroupToBars.set(group.id, barsSet);
      }
      barsSet.add(barId);

      barGroupCombos.add(comboKey);

      const [start_at, end_at] = generateEventHours();
      const fakeEvent = {
        date: this.faker.date.soon({ days: 30 }),
        description: this.faker.lorem.paragraph(),
        start_at,
        end_at,
        image: this.faker.image.urlPicsumPhotos({ width: 400, height: 200 }),
        title: `${this.faker.music.genre()} Show with ${this.faker.person.firstName()}`,
        creator_id: this.faker.number.int({ min: 1, max: 30 }),
        bar_id: barId,
        music_group_id: group.id,
        refName: `event_${count}`,
      };

      this.insert(fakeEvent);
      count++;
    }
  }
}

export default EventSeeder;
