import { useState } from "react";
import CalendarPopup from "../../components/CalendarPopUp/CalendarPopUp";
import "./Home.css";
import "./../../assets/_variables.css";
import { useNavigate } from "react-router";

function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const DateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      navigate("/events", { state: { selectedDate: date.toISOString() } });
    }
  };

  return (
    <>
      <main id="home-page">
        <img
          className="flower-guitar"
          src="../../../images/micro-guitare.svg"
          alt="représentation de la guitare avec des fleurs"
        />
        <section className="guide">
          <CalendarPopup value={selectedDate} onChangeDate={DateChange} />

          <article className="user-action">
            <div>
              <p>1. </p>
              <img
                src="/images/home_images/mini-icone-calendrier.png"
                alt="representation mini-icone-coeur"
              />
              <p>Choisissez une date</p>
            </div>
            <div>
              <p>2. </p>
              <img
                src="/images/home_images/mini-icone-epingle.png"
                alt="mini-icone-coeur"
              />
              <p>Cliquez pour plus d'infos</p>
            </div>
            <div>
              <p>3. </p>
              <img
                src="/images/home_images/mini-icone-coeur.png"
                alt="mini-icone-coeur"
              />
              <p>Créez votre sélection</p>
            </div>
            <div>
              <p>4. </p>
              <img
                src="/images/home_images/mini-icone-guitare.png"
                alt="mini-icone-guitare"
              />
              <p>Explorez les concerts du jour</p>
            </div>
            <div>
              <p>5. </p>
              <img
                src="/images/home_images/mini-icone-loupe.png"
                alt="mini-icone-loupe"
              />
              <p>Utilisez les filtres</p>
            </div>
            <div>
              <p>6. </p>
              <img
                src="/images/home_images/mini-icone-carte.png"
                alt="mini-icone-carte"
              />
              <p>Trouvez votre chemin</p>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default Home;
