import { useNavigate } from "react-router";
import type { Bar } from "../../types/bar";

type BarCardProps = {
  bar: Bar;
};

function BarCard({ bar }: BarCardProps) {
  const navigate = useNavigate();

  return (
    <>
      <article
        className="card"
        onClick={() => navigate(`/bars/${bar.id}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/bars/${bar.id}`);
          }
        }}
      >
        <img
          className="card-image"
          src={bar.image1}
          alt={`Illustration de ${bar.name}`}
        />
        <aside className="card-content">
          <h2 className="card-title">{bar.name}</h2>
          <p className="card-style">{bar.address}</p>
        </aside>
      </article>
    </>
  );
}

export default BarCard;
