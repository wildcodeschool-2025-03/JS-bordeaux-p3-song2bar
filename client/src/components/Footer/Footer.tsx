import "./Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <div className="networks">
          <p className="follow-us">Rejoignez-nous sur les reseaux sociaux :</p>
          <div className="image-social-logo">
            <img
              src="/images/home_images/mini-logo-flickr.png"
              alt="mini-logo-flickr"
            />
            <img
              src="/images/home_images/mini-logo-ico.png"
              alt="mini-logo-ico"
            />
            <img
              src="/images/home_images/mini-logo-rss.png"
              alt="mini-logo-rss"
            />
            <img
              src="/images/home_images/mini-logo-twitter.png"
              alt="mini-logo-twitter"
            />
            <img
              src="/images/home_images/mini-logo-vimeo.png"
              alt="mini-logo-vimeo"
            />
            <img
              src="/images/home_images/mini-logo-facebook.png"
              alt="mini-logo-facebook"
            />
          </div>

          <button type="button" className="button-subscribers">
            S'ABONNER <br /> (Déjà 150 000 abonnés !)
          </button>
        </div>
        <div className="footer-middle-container">
          <p className="legal-notices">Mentions légales, crédits et C.G.U.</p>
          <img
            src="/images/home_images/micro.png"
            alt="micro"
            width="auto"
            height="120"
          />
        </div>
        <div className="info-song2bar">
          <div className="paragraph-song2bar">
            <p>Song2Bar 2025-</p>
            <p>
              Song2Bar.fr le guide de vos concerts dans les meilleurs bars de
              Bordeaux.
            </p>
          </div>
          <div className="newletter-song2bar">
            <div className="newletter">
              <p>NewsLetter</p>
            </div>
            <div className="song2bar">
              <p>Song2Bar</p>
            </div>
          </div>
          <div className="about-contact">
            <div className="about">
              <p>A propos</p>
            </div>
            <div className="contact">
              <p>Contact</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
