import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <img
        src={`https://picsum.photos/400/220?random=${event.id}`}
        className="card-img-top"
        alt={event.title}
        style={{ objectFit: "cover", height: 180 }}
      />
      <div className="card-body d-flex flex-column">
        <span className="badge bg-success mb-2">{event.category}</span>
        <h5 className="card-title fw-semibold">{event.title}</h5>
        <p className="text-muted small mb-2">Jakarta • Offline</p>
        <h6 className="text-success fw-bold">Rp {event.price}</h6>
        <Link
          to={`/event/${event.id}`}
          state={{ event }}   // 🔥 KIRIM DATA EVENT
          className="btn btn-outline-success mt-auto rounded-pill"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
