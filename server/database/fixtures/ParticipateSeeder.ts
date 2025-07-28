import AbstractSeeder from "./AbstractSeeder";
import EventSeeder from "./EventSeeder";

interface ParticipateData {
  user_id: number;
  event_id: number;
}

class ParticipateSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "participate",
      truncate: true,
      dependencies: [EventSeeder],
    });
  }

  run() {
    const userInParticipate = new Set();

    for (let fakeEventRefId = 1; fakeEventRefId < 120; fakeEventRefId++) {
      for (let i = 0; i < 10; i++) {
        const fakeParticipate = {
          user_id: this.faker.number.int({ min: 1, max: 30 }),
          event_id: this.getRef(`event_${fakeEventRefId}`).insertId,
        };
        const key = `${fakeParticipate.user_id}-${fakeParticipate.event_id}`;

        if (!userInParticipate.has(key)) {
          userInParticipate.add(key);

          this.insert(fakeParticipate as ParticipateData);
        }
      }
    }
  }
}

export default ParticipateSeeder;
