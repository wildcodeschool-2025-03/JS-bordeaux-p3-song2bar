import "./Header.css";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  return (
    <>
      <section className="header">
        <article className="logo-site">
          <button
            id="logo-song2bar"
            type="button"
            onClick={() => navigate("/")}
          >
            <img
              src="/images/logo-site.png"
              alt="logo du site"
              width="100"
              height="100"
            />
          </button>
        </article>

        <article className="navigation-container">
          <nav>
            <button
              className="button-events"
              type="button"
              onClick={() => {
                navigate("/events");
                setTimeout(() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }, 0);
              }}
            >
              Évènements
            </button>
            {auth && (
              <button
                className="button-profile"
                type="button"
                onClick={() => {
                  navigate("/profile");
                  setTimeout(() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }, 0);
                }}
              >
                Mon profil
              </button>
            )}
          </nav>
          <h3>Salut ! Bienvenue sur Song 2 Bar ! </h3>
        </article>

        <article className="logo-connexion-container">
          {!auth ? (
            <button
              className="logo-connexion-button"
              type="button"
              onClick={() => {
                navigate("/login");
                setTimeout(() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }, 0);
              }}
            >
              <img
                className="logo-connexion"
                src="/icon/profile-icon.svg"
                alt="le logo de la connexion"
                width="40"
                height="auto"
              />
            </button>
          ) : (
            <button
              className="logo-connexion-button"
              type="button"
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  window.location.reload();
                }, 0);
              }}
            >
              <img
                className="logo-connexion"
                src="/images/deconnexion.png"
                alt="le logo de la déconnexion"
                width="40"
                height="auto"
              />
            </button>
          )}
        </article>
      </section>
    </>
  );
}

export default Header;
