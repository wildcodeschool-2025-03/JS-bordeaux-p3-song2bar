import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./Register.css";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { ToastContainer, toast } from "react-toastify";

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
      toast("Création de compte invalide !", { type: "error" });
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
        });
        return;
      }

      if (response.status === 201) {
        navigate("/login", {
          state: { accountCreated: true },
        });
      } else {
        toast("Création de compte invalide !", { type: "error" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="auth">
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
            <p className={password.length >= 8 ? "green" : "red"}>
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
          <button className="participate-button" type="submit">
            S'inscrire
          </button>
        </form>
        <h3>
          As-tu un compte ?{" "}
          <Link className="underline" to={"/login"}>
            Se connecter
          </Link>
        </h3>
        <ToastContainer position="top-right" theme="colored" autoClose={3000} />
      </section>
    </>
  );
}

export default Register;
