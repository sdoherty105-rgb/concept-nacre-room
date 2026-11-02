import { formatClock, weekHours } from "@/lib/hours";
import { DemoNote } from "./DemoNote";
import { OpenNowLazy } from "./OpenNowLazy";

const order = [2, 3, 4, 5, 6, 0, 1];

export function VisitCard() {
  return (
    <article className="visit-card">
      <div className="visit-bar" aria-hidden="true" />
      <p className="kicker">The printed card</p>
      <h3>Nacre Room</h3>
      <DemoNote kind="hours" />
      <OpenNowLazy />
      <address>
        Shop 3, 14 Tidewater Lane
        <br />
        Marlowe Cove, Perth WA
      </address>
      <table className="hours">
        <caption>Demonstration opening hours, Perth time</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Hours</th>
          </tr>
        </thead>
        <tbody>
          {order.map((index) => {
            const day = weekHours[index];
            return (
              <tr key={day.day}>
                <th scope="row">{day.day}</th>
                <td>
                  {day.open === null ? "Closed" : `${formatClock(day.open)} to ${formatClock(day.close!)}`}
                  {day.note ? <span className="hours-note"> ({day.note})</span> : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>In this fiction the room has a step-free entry and an accessible restroom.</p>
      <p>(08) 5550 0142, hello@nacre-room.example</p>
    </article>
  );
}
