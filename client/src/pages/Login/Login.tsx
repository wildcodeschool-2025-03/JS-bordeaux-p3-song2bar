import { type FormEventHandler, useRef } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../contexts/UserContext";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import LogoSite from "/images/logo-site.png";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const noRefresh: FormEventHandler = async (event) => {
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

        setUser(user);

        navigate("/");
      } else {
        console.info(response);
        toast(
          "Connexion impossible ! Votre identifiant ou mot de passe est invalide",
          { type: "error" },
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header id="header-login">
        <img src={LogoSite} alt="logo du site" width="80" height="auto" />
        <h2>Connexion utilisateur</h2>
      </header>
      <main className="login-page">
        <section id="login-section">
          <article className="login">
            <form onSubmit={noRefresh} id="login-form">
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
              les modifer.
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
          position="bottom-left"
          theme="colored"
          autoClose={3000}
          limit={1}
        />
      </main>
    </>
  );
}
