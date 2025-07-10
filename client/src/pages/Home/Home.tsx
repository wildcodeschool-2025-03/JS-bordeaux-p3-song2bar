import "./Home.css";

function Home() {
  return (
    <>
      <main>
        <img
          className="flower-guitar"
          src="/images/home_images/micro-guitard.svg"
          alt="représentation de la guitare avec des fleurs"
          width="cover"
          height="auto"
        />
        <section className="guide">
          <button
            className="when-button"
            type="button"
            style={{ width: "28rem", height: "6rem" }}
          >
            QUAND ?
          </button>
          <article className="user-action">
            <p>
              1.
              <img
                src="/images/home_images/mini-icone-calendrier.png"
                alt="representation mini-icone-coeur"
              />
              Choisissez une date
            </p>
            <p>
              2.
              <img
                src="/images/home_images/mini-icone-epingle.png"
                alt="mini-icone-coeur"
              />
              Cliquez pour plus d'infos
            </p>
            <p>
              3.
              <img
                src="/images/home_images/mini-icone-coeur.png"
                alt="mini-icone-coeur"
              />
              Créez votre sélection
            </p>
            <p>
              4.
              <img
                src="/images/home_images/mini-icone-guitare.png"
                alt="mini-icone-guitare"
              />
              Explorez les concerts du jour
            </p>
            <p>
              5.
              <img
                src="/images/home_images/mini-icone-loupe.png"
                alt="mini-icone-loupe"
              />
              Utilisez les filtres
            </p>
            <p>
              6.
              <img
                src="/images/home_images/mini-icone-carte.png"
                alt="mini-icone-carte"
              />
              Trouvez votre chemin
            </p>
          </article>
        </section>
      </main>
    </>
  );
}

export default Home;
