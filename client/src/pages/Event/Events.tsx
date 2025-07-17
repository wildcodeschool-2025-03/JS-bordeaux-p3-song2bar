import EventCard from "../../components/EventCard/EventCard";
import "./Events.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import type { EventType } from "../../types/Event";

const formatDate = (dateInput: Date | string) => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function Events() {
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || null;
  const [allEvents, setAllEvents] = useState<EventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const events = await res.json();
        setAllEvents(events);
        setFilteredEvents(events);
      } catch (error) {
        console.error("Erreur lors du fetch", error);
      }
    }
    fetchEvent();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const formatted = formatDate(selectedDate);
      const filtered = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        const eventFormatted = formatDate(eventDate);
        return eventFormatted === formatted;
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(allEvents);
    }
  }, [selectedDate, allEvents]);

  if (error) return <h1>Désolé il n'y a pas d'évènements </h1>;
  if (!filteredEvents) {
    <p>Chargement en cours...</p>;
  }

  return (
    <>
      <section className="filters-searchbar">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="Trouver votre événement, votre bar ou votre groupe de musique"
        />
      </section>

      {filteredEvents.length === 0 ? (
        <p>Aucun événement trouvé pour cette date</p>
      ) : (
        <section className="event-list">
          {filteredEvents
            .filter((event) => {
              return (
                event.title.toLowerCase().includes(search.toLowerCase()) ||
                event.bar_name.toLowerCase().includes(search.toLowerCase())
                // tu peux aussi ajouter: event.music_style.toLowerCase().includes(search.toLowerCase())
              );
            })
            .map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
        </section>
      )}
    </>
  );
}

export default Events;
