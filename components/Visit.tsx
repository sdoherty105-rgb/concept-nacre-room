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

