import "./EventCard.css";
import { useNavigate } from "react-router";
import type { EventType } from "../../types/Event";

type EventCardProps = {
  event: EventType;
};

function EventCard({ event }: EventCardProps) {
  console.log(event);
  const formatTime = (value: string) => {
    return `${value.slice(0, 2)}h`;
  };
  const navigate = useNavigate();

  return (
    <article
      className="card"
      onClick={() => navigate(`/events/${event.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          navigate(`/events/${event.id}`);
        }
      }}
    >
      <aside className="card-image">
        <img
          className="card-image"
          src={event.image}
          alt={`Illustration de ${event.title}`}
        />
      </aside>
      <aside className="card-content">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-style">{event.music_style}</p>
      </aside>
      <aside className="card-bottom">
        <div className="card-bottom-corner">
          <img
            src="/images/event_images/location_icon.png"
            alt="Localisation"
            className="location_icon"
          />
          <p className="event-bar">{event.bar_name}</p>
        </div>
        <div className="card-bottom-corner">
          <img
            src="/images/event_images/time_icon.png"
            alt="Heure"
            className="time_icon"
          />
          <p className="event-time">{formatTime(event.start_at)}</p>
        </div>
      </aside>
    </article>
  );
}
export default EventCard;
