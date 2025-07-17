import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link, useNavigate, useParams } from "react-router";
import Participate from "../../components/Participate/Participate";
import "../../assets/_variables.css";
import "leaflet/dist/leaflet.css";
import { format, isToday } from "date-fns";
import { fr } from "date-fns/locale";
import { ToastContainer, toast } from "react-toastify";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import { useAuth } from "../../contexts/AuthContext";
import type { EventType } from "../../types/Event";
import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const userId = auth?.user.id;
  const eventId = Number(id);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        );
        const event = await res.json();
        setEvent(event);
      } catch (error) {
        console.error("Erreur lors du fetch", error);
        if (error) return <p>Evènement introuvable</p>;
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <p>Chargement en cours...</p>;
  const eventDate = new Date(event.date);
  const formattedDateText = isToday(eventDate)
    ? `Aujourd'hui le ${format(eventDate, "d MMMM yyyy", { locale: fr })}`
    : format(eventDate, "d MMMM yyyy", { locale: fr });

  const favouriteEvent = async () => {
    if (!auth) {
      navigate("/login", { state: { isloggedToFavouriteEvent: false } });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favourite_event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            userId,
            eventId,
          }),
        },
      );
      if (response) {
        toast("Cet évènement est maintenant dans vos favoris", {
          type: "success",
        });
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      console.error("Erreur lors de la favorisation de l'évènement", error);
      toast("Impossible d'ajouter l'évènement dans votre liste de favoris", {
        type: "error",
      });
      throw error;
    }
  };

  const unfavouriteEvent = async () => {
    if (!auth) {
      navigate("/login", { state: { isloggedToFavouriteBar: false } });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favourite_event/${userId}/${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      if (response) {
        toast("Cet évènement a été retiré de vos favoris", {
          type: "info",
        });
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      console.error("Erreur lors de la favorisation de l'évènement", error);
      toast("Impossible de retirer l'évènement' de votre liste de favoris", {
        type: "error",
      });
      throw error;
    }
  };

  return (
    <>
      <section className="event-details">
        <article className="event-header">
          <div className="header-style">
            <p className="music-style bold">{event.music_style}</p>
          </div>
          <h1>
            {event.title}{" "}
            <FavouriteButton
              favouriteEvent={favouriteEvent}
              unfavouriteEvent={unfavouriteEvent}
            />
          </h1>
          <img
            className="poster-event"
            src={event.image}
            alt={event.bar_name}
          />
          <div className="date">
            <div className="date-icon">
              <img
                src="/images/event_images/calendar.png"
                alt="calendar-icon"
              />
            </div>

            <p className={"date-event bold white"}>{formattedDateText}</p>
          </div>
          <div className="hour">
            <img
              src="/images/event_images/clock.png"
              alt="clock-icon"
              className="hour-icon"
            />
            <p className="hour-event white">
              de {event.start_at} à {event.end_at}
            </p>
          </div>
          <div className="participate">
            <Participate />
          </div>
          <div className="bar">
            <div className="localisation-icon">
              <img
                src="/images/event_images/localisation.png"
                alt="localisation-icon"
              />
            </div>
            <Link to={`/bars/${event.bar_id}`} className={"bar-title bold"}>
              {event.bar_name}
            </Link>
          </div>
          <div className={"bar-address"}>
            <p>{event.address}</p>
            <p>
              {event.postcode} {event.city}
            </p>
          </div>
        </article>
        <div className="googlemap">
          <MapContainer
            center={[event.latitude, event.longitude]}
            zoom={16}
            className="map-container"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[event.latitude, event.longitude]}>
              <Popup>
                <strong>{event.bar_name}</strong>
                <br />
                {event.music_style}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <article className="description-container">
          <p className="about white">A propos</p>
          <p className="event-description">{event.description}</p>
          <p className="artist white">Les artistes</p>
          <Link to={`/groups/${event.music_group_id}`} className="groups-name">
            {event.music_group_name}
          </Link>
        </article>
      </section>
      <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={3000}
        limit={2}
      />
    </>
  );
}

export default EventDetails;
