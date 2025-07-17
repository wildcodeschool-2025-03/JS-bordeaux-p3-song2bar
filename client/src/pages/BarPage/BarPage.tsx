import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { barService } from "../../services/barService";
import type { Bar } from "../../types/bar";
import "../../assets/_variables.css";
import "./BarPage.css";
import { ToastContainer, toast } from "react-toastify";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import { useAuth } from "../../contexts/AuthContext";

function BarPage() {
  const { id } = useParams<{ id: string }>();
  const barId = Number(id);
  const [bar, setBar] = useState<Bar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const userId = auth?.user.id;

  useEffect(() => {
    const fetchBarData = async () => {
      try {
        setLoading(true);
        const barData = await barService.getBarById(barId);
        setBar(barData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBarData();
  }, [barId]);

  const formatTimeRange = (timeRange: string, isOpeningHours = false) => {
    if (isOpeningHours && timeRange === "Fermé") {
      return timeRange;
    }

    const parts = timeRange.split("-");
    const startTime = parts[0];
    const endTime = parts[1];

    return `${startTime} - ${endTime}`;
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;
  if (!bar) return <div className="error">Bar non trouvé</div>;

  const images = [bar.image1, bar.image2, bar.image3, bar.image4];

  const getTodayHours = () => {
    if (!bar || !bar.hours) {
      return "Non spécifié";
    }

    const today = new Date().getDay();
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const propertyName =
      `${days[today]}_opening_hours` as keyof typeof bar.hours;
    const todayHours = bar.hours[propertyName] as string;

    return formatTimeRange(todayHours, true);
  };

  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(images.length - 1);
    }
  };

  const favouriteBar = async () => {
    if (!auth) {
      navigate("/login", { state: { isloggedToFavouriteBar: false } });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favourite_bar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            barId,
            userId,
          }),
        },
      );
      if (response) {
        toast("Ce bar est maintenant dans vos favoris", {
          type: "success",
        });
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      console.error("Erreur lors de la favorisation du bar", error);
      toast("Impossible d'ajouter le bar dans votre liste de favoris", {
        type: "error",
      });
      throw error;
    }
  };

  const unfavouriteBar = async () => {
    if (!auth) {
      navigate("/login", { state: { isloggedToFavouriteBar: false } });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favourite_bar/${userId}/${barId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      if (response) {
        toast("Ce bar a été retiré de vos favoris", {
          type: "info",
        });
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      console.error("Erreur lors de la favorisation du bar", error);
      toast("Impossible de retirer le bar de votre liste de favoris", {
        type: "error",
      });
      throw error;
    }
  };

  return (
    <div className="bar-details">
      <div className="return-button-container">
        <button type="button" className="return-button" onClick={() => {}}>
          ← Retour
        </button>
      </div>

      <div className="bar-name-banner">
        <h1 className="bar-name">
          {bar.name}{" "}
          <FavouriteButton
            favouriteBar={favouriteBar}
            unfavouriteBar={unfavouriteBar}
          />
        </h1>
      </div>

      <section className="bar-info">
        <div className="image-gallery">
          <div className="main-image">
            <img src={images[currentImageIndex]} alt={bar.name} />
            <button
              type="button"
              className="nav-button prev"
              onClick={prevImage}
            >
              ‹
            </button>
            <button
              type="button"
              className="nav-button next"
              onClick={nextImage}
            >
              ›
            </button>
          </div>
          <div className="thumbnail-grid">
            {images.slice(0, 3).map((img, index) => (
              <img
                key={`${bar.name}-${index}`}
                src={img}
                alt={`${bar.name} ${index + 1}`}
                className={index === currentImageIndex ? "active" : ""}
                onClick={() => setCurrentImageIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setCurrentImageIndex(index);
                  }
                }}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        <div className="bar-details-content">
          <div className="bar-meta">
            <div className="location">
              📍 {bar.address}, {bar.postcode} {bar.city}
            </div>
            <div className="music-style">🎵 {bar.music_style}</div>
            <div className="hours">🕐 {getTodayHours()}</div>
            {bar.hours?.happy_hours &&
              formatTimeRange(bar.hours.happy_hours) && (
                <div className="happy-hours">
                  🍻 {formatTimeRange(bar.hours.happy_hours)}
                </div>
              )}
          </div>
        </div>
      </section>

      <section className="events-carousel">
        <div className="no-events">
          <h3>Événements</h3>
          <p>Les événements seront bientôt disponibles.</p>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        theme="colored"
        autoClose={3000}
        limit={2}
      />
    </div>
  );
}

export default BarPage;
