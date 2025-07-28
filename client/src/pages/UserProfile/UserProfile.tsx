import { useState, useRef, useEffect, useCallback } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import type { UserInfo } from "../../types/User";
import type { MusicGroupInterface } from "../../types/musicGroup";
import type { FavoriteEvent } from "../../types/UserProfile";
import "./UserProfile.css";
import GroupCard from "../../components/GroupCard/GroupCard";
import EventCard from "../../components/EventCard/EventCard";
import { useAuth } from "../../contexts/AuthContext";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("bars");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [favoriteGroups, setFavoriteGroups] = useState<MusicGroupInterface[]>(
    [],
  );
  const [favoriteEvents, setFavoriteEvents] = useState<FavoriteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [eventsCurrentPage, setEventsCurrentPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const eventsCarouselRef = useRef<HTMLDivElement>(null);
  const { auth } = useAuth();

  const fetchFavoriteGroups = useCallback(async () => {
    try {
      setGroupsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/favourite_groups`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch favorite groups");
      }

      const groups = await response.json();
      setFavoriteGroups(groups);
    } catch (error) {
      console.error("Error fetching favorite groups:", error);
      setError("Erreur lors du chargement des groupes favoris");
    } finally {
      setGroupsLoading(false);
    }
  }, [auth?.token]);

  const fetchFavoriteEvents = useCallback(async () => {
    try {
      setEventsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/favourite_events`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch favorite events");
      }

      const events = await response.json();
      setFavoriteEvents(events);
    } catch (error) {
      console.error("Error fetching favorite events:", error);
      setError("Erreur lors du chargement des événements favoris");
    } finally {
      setEventsLoading(false);
    }
  }, [auth?.token]);

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${auth?.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userData = await response.json();
      setUserInfo(userData);
    } catch (error) {
      console.error("Error fetching user info:", error);
      setError("Erreur lors du chargement des informations utilisateur");
    }
  }, [auth?.user.id, auth?.token]);

  useEffect(() => {
    if (auth?.user.id) {
      fetchUserInfo();
      fetchFavoriteGroups();
      fetchFavoriteEvents();
      setLoading(false);
    }
  }, [auth?.user.id, fetchUserInfo, fetchFavoriteGroups, fetchFavoriteEvents]);

  if (!auth?.user) {
    return <LoadingScreen />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="user-profile-container">
        <div className="error-container">
          <h2>Erreur</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Carousel functions for groups
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

  // Carousel functions for events
  const eventsTotalPages = Math.ceil(favoriteEvents.length / cardsPerPage);

  const scrollToEventsPage = (pageIndex: number) => {
    if (eventsCarouselRef.current) {
      const cardWidth = 160;
      const gap = 24;
      const scrollPosition = pageIndex * cardsPerPage * (cardWidth + gap);

      eventsCarouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      setEventsCurrentPage(pageIndex);
    }
  };

  const goToPreviousEventsPage = () => {
    if (eventsCurrentPage > 0) {
      scrollToEventsPage(eventsCurrentPage - 1);
    }
  };

  const goToNextEventsPage = () => {
    if (eventsCurrentPage < eventsTotalPages - 1) {
      scrollToEventsPage(eventsCurrentPage + 1);
    }
  };

  const handleEventsScroll = () => {
    if (eventsCarouselRef.current) {
      const cardWidth = 160;
      const gap = 24;
      const scrollLeft = eventsCarouselRef.current.scrollLeft;
      const newPage = Math.round(
        scrollLeft / (cardsPerPage * (cardWidth + gap)),
      );
      setEventsCurrentPage(Math.min(newPage, eventsTotalPages - 1));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "bars":
        return (
          <div className="tab-content">
            <div>
              <h2>Mes Bars Favoris</h2>
              <p>Mes bars favoris apparaîtront ici prochainement</p>
            </div>
          </div>
        );
      case "groups":
        return (
          <div className="tab-content">
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
                <p>Aucun groupe favori pour le moment</p>
              )}
            </div>
          </div>
        );
      case "events":
        return (
          <div className="tab-content">
            <div className="events-section">
              <h2>Mes Événements Favoris</h2>
              {eventsLoading ? (
                <LoadingScreen />
              ) : favoriteEvents.length > 0 ? (
                <div className="carousel-container">
                  <div className="carousel-wrapper">
                    <div
                      className="events-carousel"
                      ref={eventsCarouselRef}
                      onScroll={handleEventsScroll}
                    >
                      {favoriteEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>

                    <button
                      type="button"
                      className="carousel-arrow left"
                      onClick={goToPreviousEventsPage}
                      disabled={eventsCurrentPage === 0}
                      aria-label="Previous page"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      className="carousel-arrow right"
                      onClick={goToNextEventsPage}
                      disabled={eventsCurrentPage === eventsTotalPages - 1}
                      aria-label="Next page"
                    >
                      ›
                    </button>
                  </div>

                  {eventsTotalPages > 1 && (
                    <div className="carousel-dots">
                      {Array.from({ length: eventsTotalPages }, (_, index) => (
                        <button
                          key={`page-${index + 1}`}
                          type="button"
                          className={`carousel-dot ${index === eventsCurrentPage ? "active" : ""}`}
                          onClick={() => scrollToEventsPage(index)}
                          aria-label={`Go to page ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p>Aucun événement favori pour le moment</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="user-profile-container">
      <header className="user-profile-header">
        <div className="user-info">
          <div className="user-icon">
            <img
              src="/icon/profile-icon.svg"
              alt="User Profile"
              className="user-icon-image"
            />
          </div>
          <h1>
            {userInfo ? `${userInfo.firstname} ${userInfo.lastname}` : `${auth.user.firstname} ${auth.user.lastname}`}
          </h1>
        </div>
      </header>

      <nav className="nav-tabs">
        <div className="nav-tabs-container">
          <button
            type="button"
            className={`nav-tab ${activeTab === "bars" ? "active" : ""}`}
            onClick={() => setActiveTab("bars")}
          >
            BARS
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === "groups" ? "active" : ""}`}
            onClick={() => setActiveTab("groups")}
          >
            GROUPES
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === "events" ? "active" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            ÉVÉNEMENTS
          </button>
        </div>
      </nav>

      <main className="user-profile-main">{renderTabContent()}</main>
    </div>
  );
}

export default UserProfile;
