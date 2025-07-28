import { type FormEventHandler, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import LogoSite from "/images/logo-site.png";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (state?.accountCreated === true) {
      toast(
        "Compte créé avec succès ! Vous pouvez maintenant vous connecter.",
        {
          type: "success",
        },
      );
    }
    if (state?.islogged === false) {
      toast("Veuillez vous connecter pour participer à un évènement", {
        type: "error",
      });
    }
    if (state?.isloggedToFavouriteBar === false) {
      toast("Veuillez vous connecter pour ajouter un bar à vos favoris", {
        type: "error",
      });
    }
    if (state?.isloggedToFavouriteEvent === false) {
      toast("Veuillez vous connecter pour ajouter un évènement à vos favoris", {
        type: "error",
      });
    }
    if (state?.isloggedToFavouriteMusicGroup === false) {
      toast(
        "Veuillez vous connecter pour ajouter un groupe de musique à vos favoris",
        {
          type: "error",
        },
      );
    }
  }, [state]);

  const loginUser: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: (emailRef.current as HTMLInputElement).value,
            password: (passwordRef.current as HTMLInputElement).value,
          }),
        },
      );

      if (response.status === 200) {
        const user = await response.json();
        setAuth(user);

        navigate("/");
      } else {
        console.info(response);
        toast(
          "Connexion impossible ! Votre identifiant ou mot de passe est invalide",
          { type: "error", autoClose: 3000 },
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header id="header-login">
        <article>
          <button
            id="home-navigation"
            type="button"
            onClick={() => navigate("/")}
          >
            <img src={LogoSite} alt="logo du site" width="80" height="auto" />
          </button>
        </article>
        <h2>Connexion utilisateur</h2>
      </header>
      <main className="login-page">
        <section id="login-section">
          <article className="login">
            <form onSubmit={loginUser} id="login-form">
              <aside className="input-login">
                <label className="bold" htmlFor="email">
                  Email
                </label>
                <input ref={emailRef} type="email" id="email" />
              </aside>
              <aside className="input-login">
                <label className="bold" htmlFor="password">
                  Mot de passe
                </label>
                <input type="password" ref={passwordRef} id="password" />
              </aside>
              <button className="button-login" type="submit">
                SE CONNECTER
              </button>
            </form>
          </article>
          <article className="register-container">
            <h3 className="bold">Vous n'avez pas de compte Song2Bar ?</h3>
            <p>
              Créer un compte vous permet de retrouver toutes vos annonces et de
              les modifier.
            </p>
            <button
              className="register-button"
              type="button"
              onClick={() => navigate("/register")}
            >
              S'INSCRIRE
            </button>
          </article>
        </section>
        <ToastContainer
          theme="colored"
          position="top-right"
          limit={1}
          autoClose={4000}
        />
      </main>
    </>
  );
}
