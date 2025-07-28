import { useCallback, useEffect, useRef, useState } from "react";
import GroupCard from "../GroupCard/GroupCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import type { MusicGroupInterface } from "../../types/musicGroup";
import { useAuth } from "../../contexts/AuthContext";

function MusicGroupsFavouritedByUser() {
  const { auth } = useAuth();
  const [favoriteGroups, setFavoriteGroups] = useState<MusicGroupInterface[]>([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const fetchFavoriteGroups = useCallback(async () => {
    try {
      setGroupsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/favourite_groups`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch favorite groups");
      }

      const groups = await response.json();
      setFavoriteGroups(groups);
    } catch (error) {
      console.error("Error fetching favorite groups:", error);
    } finally {
      setGroupsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auth?.user.id) {
      fetchFavoriteGroups();
    }
  }, [auth?.user.id, fetchFavoriteGroups]);

  const cardsPerPage = 5;
  const totalPages = Math.ceil(favoriteGroups.length / cardsPerPage);

  const scrollToPage = (pageIndex: number) => {
    if (carouselRef.current) {
      const cardWidth = 160;
      const gap = 24;
      const scrollPosition = pageIndex * cardsPerPage * (cardWidth + gap);

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      setCurrentPage(pageIndex);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      scrollToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      scrollToPage(currentPage + 1);
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const cardWidth = 160;
      const gap = 24;
      const scrollLeft = carouselRef.current.scrollLeft;
      const newPage = Math.round(
        scrollLeft / (cardsPerPage * (cardWidth + gap)),
      );
      setCurrentPage(Math.min(newPage, totalPages - 1));
    }
  };

  return (
    <div className="groups-section">
      <h2>Mes Groupes Favoris</h2>
      {groupsLoading ? (
        <LoadingScreen />
      ) : favoriteGroups.length > 0 ? (
        <div className="carousel-container">
          <div className="carousel-wrapper">
            <div
              className="groups-carousel"
              ref={carouselRef}
              onScroll={handleScroll}
            >
              {favoriteGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>

            <button
              type="button"
              className="carousel-arrow left"
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              aria-label="Previous page"
            >
              ‹
            </button>

            <button
              type="button"
              className="carousel-arrow right"
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              aria-label="Next page"
            >
              ›
            </button>
          </div>

          {totalPages > 1 && (
            <div className="carousel-dots">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={`page-${index + 1}`}
                  type="button"
                  className={`carousel-dot ${index === currentPage ? "active" : ""}`}
                  onClick={() => scrollToPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>
          Vous n'avez pas encore de groupes favoris. Explorez nos
          événements pour découvrir de nouveaux groupes !
        </p>
      )}
    </div>
  );
}

export default MusicGroupsFavouritedByUser; 