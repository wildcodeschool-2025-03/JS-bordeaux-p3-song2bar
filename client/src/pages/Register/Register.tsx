import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./Register.css";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { toast, ToastContainer } from "react-toastify";
import LogoSite2 from "/images/logo-site2.png";

function Register() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const noRefresh: FormEventHandler = async (event) => {
    event.preventDefault();

    if (password.length < 8 || password !== confirmPassword) {
      toast("Création de compte invalide !", {
        type: "error",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lastname,
            firstname,
            email,
            password,
            confirmPassword,
          }),
        },
      );

      if (response.status === 409) {
        toast("Cet e-mail est déjà lié à un compte existant", {
          type: "error",
          autoClose: 3000,
        });
        return;
      }

      if (response.status === 201) {
        navigate("/login", {
          state: { accountCreated: true },
        });
      } else {
        toast("Création de compte invalide !", {
          type: "error",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="auth">
        <article>
          <Link to={"/"}>
            <img
              id="logo-site"
              src={LogoSite2}
              alt="logo du site"
              width="100"
              height="100"
            />
          </Link>
          <h1>S'inscrire</h1>
          <form className="register-form" onSubmit={noRefresh}>
            <input
              className={`input ${lastname.length >= 2 && /^[a-zA-ZÀ-ÿ\s\-']+$/.test(lastname) ? "green" : ""}`}
              type="text"
              value={lastname}
              placeholder="Nom"
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              className={`input ${firstname.length >= 2 && /^[a-zA-ZÀ-ÿ\s\-']+$/.test(firstname) ? "green" : ""}`}
              type="text"
              value={firstname}
              placeholder="Prénom"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              className={`input ${/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "green" : ""}`}
              value={email}
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password">
              <p
                className={
                  password.length === 0
                    ? "text-black"
                    : password.length > 0 && password.length < 8
                      ? "text-red"
                      : "text-green"
                }
              >
                Votre mot de passe doit contenir au moins 8 caractères
              </p>
              <input
                className={`input ${password.length >= 8 ? "green" : ""}`}
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Mot de passe"
              />
            </div>
            <input
              className={`input ${password === confirmPassword && confirmPassword.length > 0 ? "green" : ""}`}
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirmation mot de passe"
            />
            <button id="register-button" type="submit">
              S'inscrire
            </button>
          </form>
          <h3>
            As-tu un compte ? &nbsp;
            <Link
              className="underline"
              to={"/login"}
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo(0, 0);
                }, 0);
              }}
            >
              Se connecter
            </Link>
          </h3>
        </article>
        <ToastContainer theme="colored" position="top-right" limit={2} />
      </section>
    </>
  );
}

export default Register;
