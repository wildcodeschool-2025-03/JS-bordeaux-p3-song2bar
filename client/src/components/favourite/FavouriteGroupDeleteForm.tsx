import { useState } from "react";
import dislikeIcon from "../../public/images/dislike.png";
import likeIcon from "../../public/images/like.png";
import "./Favourite.css";

function Favourite() {
  const [isFavourite, setIsFavourite] = useState(false);
  const user_id = 1;
  const music_group_id = 42;

  const handleRemoveFavourite = async () => {
    try {
      if (isFavourite) {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/favourite_music_group`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id, music_group_id }),
          },
        );

        setIsFavourite(false);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du favori :", error);
    }
  };

  return (
    <div className="container-Favourite">
      <button type="button" onClick={handleRemoveFavourite}>
        <img
          src={isFavourite ? likeIcon : dislikeIcon}
          alt={
            isFavourite
              ? "Icône de groupe favorisé"
              : "Icône de groupe non favorisé"
          }
          width="30px"
          height="auto"
        />
      </button>
    </div>
  );
}

export default Favourite;
