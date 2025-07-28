import EventCard from "../../components/EventCard/EventCard";
import "./Events.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import type { EventType } from "../../types/Event";
import "../../components/HorizontalCalendar/HorizontalCalendar";
import DatePicker from "react-datepicker";
import HorizontalCalendar from "../../components/HorizontalCalendar/HorizontalCalendar";

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
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(
    selectedDate ? new Date(selectedDate) : null,
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [participantsCount, setParticipantsCount] = useState<
    Record<number, number>
  >({});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const clearDateFilter = () => {
    setDate(null);
  };

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
    const fetchParticipantsCounts = async () => {
      const counts: Record<number, number> = {};

      await Promise.all(
        allEvents.map(async (event) => {
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

    if (allEvents.length > 0) {
      fetchParticipantsCounts();
    }
  }, [allEvents]);

  useEffect(() => {
    if (date) {
      const formatted = formatDate(date);
      const filtered = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        const eventFormatted = formatDate(eventDate);
        return eventFormatted === formatted;
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(allEvents);
    }
  }, [date, allEvents]);

  useEffect(() => {
    const doResetPage = () => {
      if (search || selectedStyles.length > 0 || date) {
        setCurrentPage(1);
      }
    };

    doResetPage();
  }, [search, selectedStyles, date]);

  if (error) return <h1>Désolé il n'y a pas d'évènements </h1>;

  const musicStyles = Array.from(
    new Set(allEvents.map((event) => event.music_style)),
  );

  const filteredAndSearchedEvents = filteredEvents
    .filter((event) => {
      return (
        selectedStyles.length === 0 ||
        selectedStyles.includes(event.music_style)
      );
    })
    .filter((event) => {
      return (
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.bar_name.toLowerCase().includes(search.toLowerCase())
      );
    });

  const totalPages = Math.ceil(filteredAndSearchedEvents.length / itemsPerPage);
  const paginatedEvents = filteredAndSearchedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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
        <button
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
          className="calendar-icon-button"
        />
      </section>

      <div className="menu-button">
        <p>Filtre l'agenda</p>
      </div>

      <section className="filters-checkbox">
        {musicStyles.map((style) => (
          <label key={style}>
            <input
              type="checkbox"
              value={style}
              checked={selectedStyles.includes(style)}
              onChange={(e) => {
                const value = e.target.value;
                if (selectedStyles.includes(value)) {
                  setSelectedStyles(selectedStyles.filter((s) => s !== value));
                } else {
                  setSelectedStyles([...selectedStyles, value]);
                }
              }}
            />
            <span>{style}</span>
          </label>
        ))}
      </section>

      <HorizontalCalendar
        selectedDate={date}
        onSelectDate={(newDate) => setDate(newDate)}
        onToggleCalendar={() => setShowCalendar((prev) => !prev)}
      />

      {showCalendar && (
        <DatePicker
          selected={date}
          onChange={(newDate) => {
            setDate(newDate);
            setShowCalendar(false);
          }}
          inline
          calendarStartDay={1}
          locale="fr"
        />
      )}
      {date && (
        <button
          type="button"
          className="reset-date-button"
          onClick={clearDateFilter}
        >
          Réinitialiser la date
        </button>
      )}

      {filteredAndSearchedEvents.length === 0 ? (
        <p>Aucun événement trouvé pour cette date</p>
      ) : (
        <>
          <section className="event-list">
            {paginatedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                participantsCount={participantsCount[event.id] ?? 0}
              />
            ))}
          </section>

          <div className="pagination-controls">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ←
            </button>

            <span>
              {currentPage} ... {totalPages}
            </span>

            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Events;
