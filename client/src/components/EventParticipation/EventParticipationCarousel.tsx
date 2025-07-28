import { useEffect, useRef, useState } from "react";
import "./EventParticipationCarousel.css";
import { useAuth } from "../../contexts/AuthContext";
import type { EventType } from "../../types/Event";
import EventCard from "../EventCard/EventCard";

function EventParticipationCarousel() {
  const [participations, setParticipations] = useState<EventType[]>([]);
  const [participantsCount, setParticipantsCount] = useState<
    Record<number, number>
  >({});
  const carouselRef = useRef<HTMLDivElement>(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchParticipations = async () => {
      if (!auth) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/participate`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des participations");
        }

        const data = await response.json();
        setParticipations(data);

        const counts: Record<number, number> = {};
        await Promise.all(
          data.map(async (event: EventType) => {
            try {
              const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/${event.id}/participants/count`,
              );
              const countData = await res.json();
              counts[event.id] = countData.participantsCount ?? 0;
            } catch (error) {
              console.error(
                "Erreur lors du fetch participants pour l'événement",
                event.id,
              );
              counts[event.id] = 0;
            }
          }),
        );
        setParticipantsCount(counts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchParticipations();
  }, [auth]);

  const scrollByAmount = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8; // ~80% de la largeur visible
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (participations.length === 0) {
    return <p>Vous ne participez à aucun événement.</p>;
  }

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Mes Participations</h2>

      <button
        type="button"
        className="carousel-arrow left"
        onClick={() => scrollByAmount("left")}
      >
        ‹
      </button>

      <div className="carousel-wrapper">
        <div className="groups-carousel" ref={carouselRef}>
          {participations.map((event) => (
            <div key={event.id} className="carousel-card">
              <EventCard
                event={event}
                participantsCount={participantsCount[event.id] ?? 0}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="carousel-arrow right"
        onClick={() => scrollByAmount("right")}
      >
        ›
      </button>
    </div>
  );
}

export default EventParticipationCarousel;
