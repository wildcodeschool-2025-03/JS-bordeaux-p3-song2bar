import "./MusicGroup.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify/unstyled";
import styleIcon from "/images/group_images/music-style-icon.svg";
import BarCard from "../../components/BarCard/BarCard";
import type { Bar } from "../../types/bar";
import LikeButton from "../../components/LikeButton/LikeButton";
import { useAuth } from "../../contexts/AuthContext";
import type { MusicGroupInterface } from "../../types/musicGroup";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";

function MusicGroup() {
  const [musicGroup, setMusicGroup] = useState<MusicGroupInterface | null>(
    null,
  );
  const [bars, setBars] = useState<Bar[]>([]);
  const { id } = useParams();
  const musicGroupId = Number(id);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const userId = auth?.user.id;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/groups/${id}`)
      .then((response) => response.json())
      .then((musicGroup) => {
        setMusicGroup(musicGroup);
      });
  }, [id]);

  useEffect(() => {
    async function fetchBars() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/groups/${id}/bars`,
        );
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des bars");
        }
        const bars = await res.json();
        setBars(bars);
      } catch (error) {
        console.error("Erreur lors du fetch", error);
      }
    }
    fetchBars();
  }, [id]);

  if (!musicGroup)
    return (
      <>
        <section className="fail">
          <h1>Groupe de musique introuvable</h1>
          <button type="button" onClick={() => navigate("/")}>
            Revenir à l'accueil
          </button>
        </section>
      </>
    );

  const favouriteMusicGroup = async () => {
    if (!auth) {
      navigate("/login", { state: { isloggedToFavouriteMusicGroup: false } });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favourite_music_group`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
          body: JSON.stringify({
            userId,
            musicGroupId,
          }),
        },
      );
      if (response.ok) {
        toast("Ce groupe de musique est maintenant dans vos favoris", {
          type: "success",
        });
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      console.error("Erreur lors de la favorisation de l'évènement", error);
      toast(
        "Impossible d'ajouter le groupe de musique dans votre liste de favoris",
        {
          type: "error",
        },
      );
      throw error;
    }
  };

  const unfavouriteMusicGroup = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favourite_music_group/${musicGroupId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );
      if (response.ok) {
        toast("Cet groupe de musique a été retiré de vos favoris", {
          type: "success",
        });
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du favori :", error);
      toast(
        "Impossible d'ajouter ce groupe de musique dans votre liste de favoris",
        {
          type: "error",
        },
      );
      throw error;
    }
  };

  return (
    <>
      <section>
        <article className="return-button-container">
          <button
            type="button"
            className="return-button"
            onClick={() => {
              navigate(-1);
            }}
          >
            ← Retour
          </button>
        </article>
        <article className="button-title-container">
          <h1 className="button-title">
            {musicGroup.name}{" "}
            <LikeButton
              favouriteMusicGroup={favouriteMusicGroup}
              unfavouriteMusicGroup={unfavouriteMusicGroup}
            />
          </h1>
        </article>
      </section>
      <section className="group-information">
        <article className="group-title">
          <img
            src={styleIcon}
            alt="icone style de musique"
            width="40"
            height="auto"
          />
          <h2>{musicGroup.style}</h2>
        </article>
        <article className="group-articles">
          <img
            className="poster-group"
            src={musicGroup.image}
            alt="poster du groupe"
          />
          <aside className="description-content-group">
            <p className="description">{musicGroup.description}</p>
          </aside>
        </article>
      </section>
      <section className="carousel-section">
        <h2>Bars dans lesquels vous pourrez retrouver ce groupe de musique</h2>
        <article className="carousel">
          {bars && bars.length > 0 ? (
            <EmblaCarousel
              slides={bars.map((bar) => ({
                id: bar.id,
                content: <BarCard bar={bar} />,
              }))}
              options={{ loop: true, align: "start" }}
            />
          ) : (
            <div className="carousel-empty">
              <h3>
                Ce groupe de musique n'a pas encore d'évènement prévu dans un
                bar
              </h3>
            </div>
          )}
        </article>
      </section>
      <ToastContainer
        position="top-right"
        theme="colored"
        autoClose={3000}
        limit={2}
      />
    </>
  );
}

export default MusicGroup;
