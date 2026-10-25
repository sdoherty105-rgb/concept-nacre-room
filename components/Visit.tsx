import { formatClock, weekHours } from "@/lib/hours";
import { OpenNowLazy } from "./OpenNowLazy";

const order = [2, 3, 4, 5, 6, 0, 1];

export function Visit() {
  return (
    <section id="visit" className="section section-umber" aria-labelledby="visit-title">
      <div className="container visit-grid">
        <div>
          <p className="eyebrow">Hours &amp; location</p>
          <h2 id="visit-title">Come and see us</h2>
          <OpenNowLazy />
          <table className="hours-table">
            <caption className="sr-only">Opening hours</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Hours</th>
              </tr>
            </thead>
            <tbody>
              {order.map((i) => {
                const d = weekHours[i];
                return (
                  <tr key={d.day}>
                    <th scope="row">{d.day}</th>
                    <td>
                      {d.open === null ? "Closed" : `${formatClock(d.open)} to ${formatClock(d.close!)}`}
                      {d.note && <span className="hours-note"> ({d.note})</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="visit-card">
          <svg viewBox="0 0 480 220" className="map-art" role="img" aria-label="Stylised illustration of a street corner with a marker for Nacre Room. Not a real map.">
            <rect width="480" height="220" fill="#E8E1D9" />
            <path d="M0 150H480M0 60H480M120 0V220M330 0V220" stroke="#F3EFEA" strokeWidth="14" />
            <path d="M0 150H480M120 0V220" stroke="#DBBBB3" strokeWidth="2" strokeDasharray="6 8" />
            <rect x="140" y="76" width="170" height="60" rx="6" fill="#DBBBB3" opacity="0.7" />
            <rect x="350" y="76" width="110" height="60" rx="6" fill="#CDB9A8" opacity="0.7" />
            <rect x="10" y="76" width="96" height="60" rx="6" fill="#CDB9A8" opacity="0.7" />
            <circle cx="225" cy="106" r="16" fill="#24201E" />
            <circle cx="225" cy="106" r="6" fill="#F3EFEA" />
          </svg>
          <div className="visit-card-body">
            <h3>Nacre Room</h3>
            <address>
              Shop 3, 14 Tidewater Lane
              <br />
              Marlowe Cove, Perth WA
            </address>
            <p className="fine-print">A fictional address in a fictional suburb. Contact details are invented.</p>
            <ul className="visit-facts">
              <li>Step-free entry and an accessible restroom</li>
              <li>Street parking on Tidewater Lane</li>
              <li>A short walk from the Marlowe Cove bus interchange</li>
            </ul>
            <p>(08) 5550 0142, hello@nacre-room.example</p>
          </div>
        </div>
      </div>
    </section>
  );
}
