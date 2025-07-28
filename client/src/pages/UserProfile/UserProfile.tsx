import { useState } from "react";
import EventsFavouritedByUser from "../../components/EventsFavouritedByUser/EventsFavouritedByUser";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import MusicGroupsFavouritedByUser from "../../components/MusicGroupsFavouritedByUser/MusicGroupsFavouritedByUser";
import { useAuth } from "../../contexts/AuthContext";
import "./UserProfile.css";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("bars");
  const { auth } = useAuth();

  if (!auth?.user) {
    return <LoadingScreen />;
  }

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
            <MusicGroupsFavouritedByUser />
          </div>
        );
      case "events":
        return (
          <div className="tab-content">
            <EventsFavouritedByUser />
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
            {auth.user.firstname} {auth.user.lastname}
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

      <main className="user-profile-content">{renderTabContent()}</main>
    </div>
  );
}

export default UserProfile;
