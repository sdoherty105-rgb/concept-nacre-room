import Link from "next/link";
import { categories, services } from "@/lib/services";
import { formatDuration, formatPrice } from "@/lib/planner";
import { joinMeta } from "@/lib/meta";

export function CarteList({ variant }: { variant: "full" | "index" }) {
  return (
    <div className={`carte-list carte-${variant}`}>
      {categories.map((category) => {
        const rows = services.filter((service) => service.category === category.id);
        return (
          <section key={category.id} className="carte-group" aria-labelledby={`cat-${variant}-${category.id}`}>
            <h3 id={`cat-${variant}-${category.id}`} className="kicker">
              {category.name}
            </h3>
            {variant === "full" ? <p className="carte-blurb">{category.blurb}</p> : null}
            <ul>
              {rows.map((service) => (
                <li key={service.id} id={variant === "full" ? service.id : undefined}>
                  {variant === "full" ? (
                    <>
                      <div className="leader-main">
                        <span className="leader-name">{service.name}</span>
                        <span className="leader-dots" aria-hidden="true" />
                        <span className="leader-price">{formatPrice(service.price)}</span>
                      </div>
                      <p className="leader-meta">{joinMeta(formatDuration(service.minutes), service.description)}</p>
                      <Link className="text-link" href={`/reserve?service=${service.id}`}>
                        Plan this: {service.name}
                      </Link>
                    </>
                  ) : (
                    <Link className="leader-link" href={`/reserve?service=${service.id}`}>
                      <span className="leader-main">
                        <span className="leader-name">{service.name}</span>
                        <span className="leader-dots" aria-hidden="true" />
                        <span className="leader-price">from {formatPrice(service.price)}</span>
                      </span>
                      <span className="leader-meta">
                        {formatDuration(service.minutes)}
                        <span className="leader-book">Reserve</span>
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
