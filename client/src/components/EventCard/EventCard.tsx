import "./EventCard.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { EventType } from "../../types/Event";

type EventCardProps = {
  event: EventType;
  participantsCount: number;
};

function EventCard({ event, participantsCount }: EventCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const formatTime = (value: string) => {
    return `${value.slice(0, 2)}h`;
  };
  const navigate = useNavigate();

  // Fallback image based on music style (only used when external images fail)
  const getFallbackImage = (musicStyle: string) => {
    const style = musicStyle.toLowerCase();
    if (style.includes('jazz')) return '/images/event_images/jazz_band.jpg';
    if (style.includes('rock')) return '/images/event_images/rock_band.jpg';
    if (style.includes('electro')) return '/images/event_images/electronic_synth_pop_band.jpg';
    if (style.includes('world')) return '/images/event_images/folk_band.jpg';
    if (style.includes('pop')) return '/images/event_images/pop_rock_band.jpg';
    return '/images/event_images/stand_alone_singer.jpg'; // Default
  };

  const handleImageError = () => {
    setImageError(true);
  };

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
          src={imageError ? getFallbackImage(event.music_style) : event.image}
          alt={`Illustration de ${event.title}`}
          onError={handleImageError}
        />
      </aside>
      <aside className="card-content">
        <h2 className="event-title">{event.title}</h2>

        <p className="event-style">{event.music_style}</p>
      </aside>
      <p className="participant-nb">👥 {participantsCount}</p>

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
