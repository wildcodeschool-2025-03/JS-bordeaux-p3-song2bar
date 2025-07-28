import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link, useNavigate, useParams } from "react-router";
import Participate from "../../components/Participate/Participate";
import "../../assets/_variables.css";
import "leaflet/dist/leaflet.css";
import { toast, ToastContainer } from "react-toastify";
import LikeButton from "../../components/LikeButton/LikeButton";
import { useAuth } from "../../contexts/AuthContext";
import type { EventType } from "../../types/Event";
import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [fetchError, setFetchError] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const userId = auth?.user.id;
  const eventId = Number(id);
  const [participantsCount, setParticipantsCount] = useState<number>(0);

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
        setFetchError(true);
      }
    };
    fetchEvent();
  }, [id]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/${eventId}/participants/count`,
      );

      const data = await res.json();
      setParticipantsCount(data.participantsCount || 0);
    };

    fetchParticipants();
  }, [eventId]);

  if (fetchError) return <p>Évènement introuvable</p>;
  if (!event) return <p>Chargement en cours...</p>;

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
          body: JSON.stringify({ userId, eventId }),
        },
      );
      if (response.ok) {
        toast("Cet évènement est maintenant dans vos favoris", {
          type: "success",
        });
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      console.error("Erreur lors de la favorisation de l'évènement", error);
      toast("Impossible d'ajouter l'évènement aux favoris", {
        type: "error",
      });
    }
  };

  const unfavouriteEvent = async () => {
    if (!auth) {
      navigate("/login", { state: { isloggedToFavouriteBar: false } });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favourite_event/${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      if (response.ok) {
        toast("Cet évènement a été retiré de vos favoris", {
          type: "success",
        });
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      console.error("Erreur lors du retrait de l'évènement", error);
      toast("Impossible de retirer l'évènement des favoris", {
        type: "error",
      });
    }
  };

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  };

  return (
    <>
      <section>
        <article className="return-button-container">
          <button
            type="button"
            className="return-button"
            onClick={() => navigate(-1)}
          >
            ← Retour
          </button>
        </article>

        <article className="button-title-container">
          <h1 className="button-title">
            {event.title}{" "}
            <LikeButton
              favouriteEvent={favouriteEvent}
              unfavouriteEvent={unfavouriteEvent}
            />
          </h1>
        </article>
      </section>

      <section className="event-container">
        <article className="event-picture">
          <img src={event.image} alt={event.bar_name} />
        </article>
        <article className="event-infos">
          <div className="event-meta">
            <div className="bar-title">
              <Link to={`/bars/${event.bar_id}`} className="bar-title bold">
                🍺 {event.bar_name}
              </Link>
            </div>
            <div className="location">
              📍 {event.address}, {event.postcode} {event.city}
            </div>
            <div className="music-style">🎵 {event.music_style}</div>
            <div className="groups-name">
              <Link to={`/groups/${event.music_group_id}`}>
                🎤 {event.music_group_name}
              </Link>
            </div>
            <div className="hour-event">
              🕐 {formatTime(event.start_at)} à {formatTime(event.end_at)}
            </div>
            <div className="participate-number">
              <p>
                👥​ ​{" "}
                {participantsCount === 0
                  ? "Aucun participant à cet évènement"
                  : `${participantsCount} personne${participantsCount > 1 ? "s" : ""} participe${participantsCount > 1 ? "nt" : ""} à cet évènement`}
              </p>
            </div>
          </div>
          <div className="participate-wrapper">
            <Participate />
          </div>
        </article>
        <article className="description-content">
          <p>{event.description}</p>
        </article>

        <article className="googlemap">
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
                <strong>{event.event_name}</strong>
                <br />
                {event.music_style}
              </Popup>
            </Marker>
          </MapContainer>
        </article>
      </section>
      <ToastContainer
        theme="colored"
        position="top-right"
        limit={2}
        autoClose={3000}
      />
    </>
  );
}

export default EventDetails;
