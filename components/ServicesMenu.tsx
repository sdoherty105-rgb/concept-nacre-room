import { categories, services } from "@/lib/services";
import { formatDuration, formatPrice } from "@/lib/planner";
import { ChooseLink } from "./ChooseLink";

export function ServicesMenu() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">The menu</p>
          <h2 id="services-title">Services, times and prices</h2>
          <p className="lead">
            Every appointment begins with a conversation. Prices are shown in Australian dollars. Choose “Plan this”
            on any service to start building your visit.
          </p>
        </div>

        <div className="menu-grid">
          {categories.map((cat) => (
            <article key={cat.id} className="menu-card" aria-labelledby={`cat-${cat.id}`}>
              <h3 id={`cat-${cat.id}`}>{cat.name}</h3>
              <p className="menu-blurb">{cat.blurb}</p>
              <ul className="menu-list">
                {services
                  .filter((s) => s.category === cat.id)
                  .map((s) => (
                    <li key={s.id} className="menu-item">
                      <div className="menu-item-main">
                        <h4>{s.name}</h4>
                        <p>{s.description}</p>
                      </div>
                      <div className="menu-item-meta">
                        <span className="menu-price">{formatPrice(s.price)}</span>
                        <span className="menu-time">{formatDuration(s.minutes)}</span>
                        <ChooseLink serviceId={s.id} serviceName={s.name} />
                      </div>
                    </li>
                  ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="fine-print">
          Colour services include a patch test reminder and a take-home toning guide. Prices and services are invented
          for this concept.
        </p>
      </div>
    </section>
  );
}
