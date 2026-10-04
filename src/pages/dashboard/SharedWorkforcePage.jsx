import { FREELANCERS } from "../../data/freelancers.js";
import "./SharedWorkforcePage.css";

export default function SharedWorkforcePage() {
  return (
    <div className="swf">
      {FREELANCERS.map((f) => (
        <article className="swf-card" key={f.name}>
          <div className="swf-card__photo" aria-hidden="true">
            <span className="swf-card__avatar" />
          </div>
          <div className="swf-card__body">
            <h3>{f.name}</h3>
            <p className="swf-card__role">{f.role}</p>
          </div>
          <div className="swf-card__footer">
            <span className="swf-card__price">{f.price}</span>
            <span className="swf-card__exp">{f.experience}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
