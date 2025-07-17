import "./MusicGroup.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify/unstyled";
import styleIcon from "/images/group_images/music-style-icon.svg";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";
import type { MusicGroupInterface } from "../../types/musicGroup";

function MusicGroup() {
  const [musicGroup, setMusicGroup] = useState<MusicGroupInterface | null>(
    null,
  );
  const { id } = useParams();
  const userId = Number(id);
  const musicGroupId = Number(id);

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
          <button type="button">Revenir à l'accueil</button>
        </section>
      </>
    );

  const unfavouriteMusicGroup = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favourite_music_group/${userId}/${musicGroupId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
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
      console.error("Erreur lors de la suppression du favori :", error);
      toast("Impossible d'ajouter l'évènement dans votre liste de favoris", {
        type: "error",
      });
      throw error;
    }
  };

  return (
    <>
      <section className="group-information">
        <h1 className="button-title">
          {musicGroup.name}&nbsp;
          <FavouriteButton unfavouriteMusicGroup={unfavouriteMusicGroup} />
        </h1>
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
