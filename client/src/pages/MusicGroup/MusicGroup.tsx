import "./MusicGroup.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify/unstyled";
import styleIcon from "/images/group_images/music-style-icon.svg";
import LikeButton from "../../components/LikeButton/LikeButton";
import { useAuth } from "../../contexts/AuthContext";
import type { MusicGroupInterface } from "../../types/musicGroup";

function MusicGroup() {
  const [musicGroup, setMusicGroup] = useState<MusicGroupInterface | null>(
    null,
  );
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
        `${import.meta.env.VITE_API_URL}/api/favourite_music_group/${userId}/${musicGroupId}`,
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
      <section className="group-information">
        <div className="group-title-banner">
          <h1 className="button-title">{musicGroup.name}</h1>
          <div className="favorite-button">
            <LikeButton
              favouriteMusicGroup={favouriteMusicGroup}
              unfavouriteMusicGroup={unfavouriteMusicGroup}
            />
          </div>
        </div>
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
          <aside>
            <img
              className="poster-group"
              src={musicGroup.image}
              alt="poster du groupe"
            />
          </aside>
          <aside>
            <p className="description">{musicGroup.description}</p>
          </aside>
        </article>
      </section>
      <section className="bar-caroussel">
        <p>Caroussel de bars à venir</p>
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

export default MusicGroup;
