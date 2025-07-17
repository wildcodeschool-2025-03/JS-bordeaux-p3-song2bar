import { useState } from "react";
import "./Participate.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

function Participate() {
  const [isParticipated, setIsParticipated] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const userId = auth?.user.id;
  const eventId = Number(id);

  const addParticipation = async () => {
    if (!auth) {
      navigate("/login", { state: { islogged: false } });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/participate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            eventId,
            userId,
          }),
        },
      );

      if (response) {
        toast("Vous participez à cet évènement", {
          type: "success",
        });
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      console.error("Erreur lors de la participation à cet évènement", error);
      toast("Erreur lors de l'inscription à l'évènement", { type: "error" });
      throw error;
    }
  };

  const deleteParticipation = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/participate/${userId}/${eventId}`,
        {
          method: "DELETE",
        },
      );
      if (response) {
        toast("Vous ne participez plus à cet évènement", { type: "info" });
      } else {
        throw new Error("Erreur lors de la suppression de la participation");
      }
    } catch {
      console.error("Erreur lors de la participation à cet évènement", Error);
      throw Error;
    }
  };

  return (
    <>
      <button
        className="participate-button"
        type="button"
        onClick={() => {
          if (isParticipated) {
            deleteParticipation();
            setIsParticipated(true);
          } else {
            addParticipation();
            setIsParticipated(false);
          }
        }}
      >
        {isParticipated ? "Je ne participe plus" : "Je participe"}
      </button>

      <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={2000}
        limit={2}
      />
    </>
  );
}

export default Participate;
