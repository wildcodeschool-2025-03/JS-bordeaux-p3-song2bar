import { useState } from "react";
import dislikeIcon from "/images/favourite_images/dislike.png";
import likeIcon from "/images/favourite_images/like.png";
import "./FavouriteButton.css";

type FavouriteButtonProps = {
  favouriteBar?: () => Promise<void>;
  unfavouriteBar?: () => Promise<void>;
  favouriteEvent?: () => Promise<void>;
  unfavouriteEvent?: () => Promise<void>;
  unfavouriteMusicGroup?: () => Promise<void>;
};

function FavouriteButton({
  favouriteBar,
  unfavouriteBar,
  favouriteEvent,
  unfavouriteEvent,
  unfavouriteMusicGroup,
}: FavouriteButtonProps) {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <button
      className="favourite-button"
      type="button"
      onClick={() => {
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
        if (unfavouriteMusicGroup) {
          if (!isFavourite) {
            //favouriteEvent();
            setIsFavourite(true);
          } else {
            unfavouriteMusicGroup;
            setIsFavourite(false);
          }
        }
      }}
    >
      <img
        src={isFavourite ? likeIcon : dislikeIcon}
        alt={
          isFavourite
            ? "Icône de groupe favorisé"
            : "Icône de groupe non favorisé"
        }
        width="35"
        height="auto"
      />
    </button>
  );
}

export default FavouriteButton;
