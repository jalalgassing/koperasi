import { useAuth } from "../../context/AuthContext.jsx";
import { Icon } from "../../layouts/icons.jsx";
import "./DashboardHomePage.css";

export default function DashboardHomePage() {
  const { user } = useAuth();

  return (
    <div className="dhp">
      <h2 className="dhp__greeting">Good Morning, {user?.name || "Pengguna"}</h2>

      <div className="dhp__cards">
        <article className="dhp-card">
          <div className="dhp-card__top">
            <span className="dhp-card__label">Equity score</span>
            <span className="dhp-card__trend">
              <Icon name="arrowUp" />
            </span>
          </div>
          <p className="dhp-card__value">
            846 <span>Score</span>
          </p>
          <p className="dhp-card__sub">
            <span className="dhp-card__delta">+10%</span> last year
          </p>
          <button type="button" className="dhp-card__footer">
            Details
          </button>
        </article>

        <article className="dhp-card">
          <div className="dhp-card__top">
            <span className="dhp-card__label">Active purchase</span>
            <span className="dhp-card__trend">
              <Icon name="arrowUp" />
            </span>
          </div>
          <p className="dhp-card__value">80%</p>
          <p className="dhp-card__sub">
            <span className="dhp-card__delta">+10% contributes</span> 20 members
          </p>
          <button type="button" className="dhp-card__footer">
            Details
          </button>
        </article>

        <article className="dhp-card dhp-card--resources">
          <span className="dhp-card__label">Shared resources</span>
          <div className="dhp-card__resource-row">
            <div>
              <p className="dhp-card__value dhp-card__value--sm">67%</p>
              <p className="dhp-card__sub">AI usage</p>
            </div>
            <div>
              <p className="dhp-card__value dhp-card__value--sm">30%</p>
              <p className="dhp-card__sub">Cloud usage</p>
            </div>
          </div>
          <div className="dhp-card__chart" aria-hidden="true" />
        </article>
      </div>
    </div>
  );
}
