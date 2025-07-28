import { useCallback, useEffect, useRef, useState } from "react";
import EventCard from "../EventCard/EventCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import type { FavoriteEvent } from "../../types/UserProfile";
import { useAuth } from "../../contexts/AuthContext";

function EventsFavouritedByUser() {
  const { auth } = useAuth();
  const [favoriteEvents, setFavoriteEvents] = useState<FavoriteEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsCurrentPage, setEventsCurrentPage] = useState(0);
  const eventsCarouselRef = useRef<HTMLDivElement>(null);
  const [participantsCount, setParticipantsCount] = useState<
    Record<number, number>
  >({});

  const fetchFavoriteEvents = useCallback(async () => {
    try {
      setEventsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/favourite_events`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch favorite events");
      }

      const events = await response.json();
      setFavoriteEvents(events);
    } catch (error) {
      console.error("Error fetching favorite events:", error);
    } finally {
      setEventsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auth?.user.id) {
      fetchFavoriteEvents();
    }
  }, [auth?.user.id, fetchFavoriteEvents]);

  useEffect(() => {
    const fetchParticipantsCounts = async () => {
      const counts: Record<number, number> = {};

      await Promise.all(
        favoriteEvents.map(async (event) => {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/api/${event.id}/participants/count`,
            );
            const data = await res.json();
            counts[event.id] = data.participantsCount ?? 0;
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
    };

    if (favoriteEvents.length > 0) {
      fetchParticipantsCounts();
    }
  }, [favoriteEvents]);

  const cardsPerPage = 5;
  const eventsTotalPages = Math.ceil(favoriteEvents.length / cardsPerPage);

  const scrollToEventsPage = (pageIndex: number) => {
    if (eventsCarouselRef.current) {
      const cardWidth = 160;
      const gap = 24;
      const scrollPosition = pageIndex * cardsPerPage * (cardWidth + gap);

      eventsCarouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      setEventsCurrentPage(pageIndex);
    }
  };

  const goToPreviousEventsPage = () => {
    if (eventsCurrentPage > 0) {
      scrollToEventsPage(eventsCurrentPage - 1);
    }
  };

  const goToNextEventsPage = () => {
    if (eventsCurrentPage < eventsTotalPages - 1) {
      scrollToEventsPage(eventsCurrentPage + 1);
    }
  };

  const handleEventsScroll = () => {
    if (eventsCarouselRef.current) {
      const cardWidth = 160;
      const gap = 24;
      const scrollLeft = eventsCarouselRef.current.scrollLeft;
      const newPage = Math.round(
        scrollLeft / (cardsPerPage * (cardWidth + gap)),
      );
      setEventsCurrentPage(Math.min(newPage, eventsTotalPages - 1));
    }
  };

  return (
    <div className="events-section">
      <h2>Mes Événements Favoris</h2>
      {eventsLoading ? (
        <LoadingScreen />
      ) : favoriteEvents.length > 0 ? (
        <div className="carousel-container">
          <div className="carousel-wrapper">
            <div
              className="events-carousel"
              ref={eventsCarouselRef}
              onScroll={handleEventsScroll}
            >
              {favoriteEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  participantsCount={participantsCount[event.id] ?? 0}
                />
              ))}
            </div>

            <button
              type="button"
              className="carousel-arrow left"
              onClick={goToPreviousEventsPage}
              disabled={eventsCurrentPage === 0}
              aria-label="Previous page"
            >
              ‹
            </button>

            <button
              type="button"
              className="carousel-arrow right"
              onClick={goToNextEventsPage}
              disabled={eventsCurrentPage === eventsTotalPages - 1}
              aria-label="Next page"
            >
              ›
            </button>
          </div>

          {eventsTotalPages > 1 && (
            <div className="carousel-dots">
              {Array.from({ length: eventsTotalPages }, (_, index) => (
                <button
                  key={`events-page-${index + 1}`}
                  type="button"
                  className={`carousel-dot ${index === eventsCurrentPage ? "active" : ""}`}
                  onClick={() => scrollToEventsPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>
          Vous n'avez pas encore d'événements favoris. Explorez nos événements
          et ajoutez-les à vos favoris !
        </p>
      )}
    </div>
  );
}

export default EventsFavouritedByUser; 