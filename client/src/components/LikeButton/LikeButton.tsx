import { useEffect, useState } from "react";
import "./LikeButton.css";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router";

type LikeButtonProps = {
  favouriteBar?: () => Promise<void>;
  unfavouriteBar?: () => Promise<void>;
  favouriteEvent?: () => Promise<void>;
  unfavouriteEvent?: () => Promise<void>;
  favouriteMusicGroup?: () => Promise<void>;
  unfavouriteMusicGroup?: () => Promise<void>;
};

function LikeButton({
  favouriteBar,
  unfavouriteBar,
  favouriteEvent,
  unfavouriteEvent,
  favouriteMusicGroup,
  unfavouriteMusicGroup,
}: LikeButtonProps) {
  const [isFavourite, setIsFavourite] = useState(false);
  const { auth } = useAuth();
  const { id } = useParams();
  const userId = auth?.user.id;

  function getTypeOfFavourite() {
    if (favouriteBar && unfavouriteBar) return "bar";
    if (favouriteEvent && unfavouriteEvent) return "event";
    if (favouriteMusicGroup && unfavouriteMusicGroup) return "music_group";
    return null;
  }

  const typeOfFavourite = getTypeOfFavourite();

  useEffect(() => {
    const checkFavourite = async () => {
      if (!auth || !userId || !id || !typeOfFavourite) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favourite_${typeOfFavourite}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        );
        if (response.ok) {
          const result = await response.json();
          setIsFavourite(result.favourite);
        } else {
          console.error("Erreur lors de la récupération des favoris");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    };

    checkFavourite();
  }, [userId, auth, id, typeOfFavourite]);

  const handleToggle = () => {
    if (favouriteBar && unfavouriteBar) {
      if (!isFavourite) {
        favouriteBar();
        setIsFavourite(true);
      } else {
        unfavouriteBar();
        setIsFavourite(false);
      }
    }
    if (favouriteEvent && unfavouriteEvent) {
      if (!isFavourite) {
        favouriteEvent();
        setIsFavourite(true);
      } else {
        unfavouriteEvent();
        setIsFavourite(false);
      }
    }
    if (favouriteMusicGroup && unfavouriteMusicGroup) {
      if (!isFavourite) {
        favouriteMusicGroup();
        setIsFavourite(true);
      } else {
        unfavouriteMusicGroup();
        setIsFavourite(false);
      }
    }
  };

  return (
    <div className="con-like">
      <input
        className="like"
        type="checkbox"
        title="like"
        checked={isFavourite}
        onChange={handleToggle}
      />
      <div className="checkmark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="outline"
          viewBox="0 0 24 24"
        >
          <title>Heart outline</title>
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="filled"
          viewBox="0 0 24 24"
        >
          <title>Heart filled</title>
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="100"
          width="100"
          className="celebrate"
        >
          <title>Celebration animation</title>
          <polygon className="poly" points="10,10 20,20" />
          <polygon className="poly" points="10,50 20,50" />
          <polygon className="poly" points="20,80 30,70" />
          <polygon className="poly" points="90,10 80,20" />
          <polygon className="poly" points="90,50 80,50" />
          <polygon className="poly" points="80,80 70,70" />
        </svg>
      </div>
    </div>
  );
}

export default LikeButton;
