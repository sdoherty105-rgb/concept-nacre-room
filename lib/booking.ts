import { isClosedDay } from "./hours";

export type BookingValues = {
  name: string;
  email: string;
  phone: string;
  date: string;
  window: string;
  stylist: string;
  notes: string;
  ack: boolean;
};

export type BookingErrors = Partial<Record<"service" | "name" | "email" | "phone" | "date" | "window" | "ack", string>>;

function weekday(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

export function validateBooking(values: BookingValues, hasService: boolean, today: string): BookingErrors {
  const errors: BookingErrors = {};
  if (!hasService) errors.service = "Choose a service in the reservation so we know what to prepare for.";
  if (values.name.trim().length < 2) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Enter an email address like name@example.com.";
  }
  if (values.phone.trim() && values.phone.replace(/[^\d]/g, "").length < 8) {
    errors.phone = "Enter a phone number with at least 8 digits, or leave it blank.";
  }
  if (!values.date) errors.date = "Choose a preferred date.";
  else if (today && values.date < today) errors.date = "Choose a date that is today or later.";
  else if (isClosedDay(weekday(values.date))) {
    errors.date = "We are closed on Sundays and Mondays. Please choose Tuesday to Saturday.";
  }
  if (!values.window) errors.window = "Choose a preferred time.";
  else if (values.window === "evening" && values.date && !errors.date && weekday(values.date) !== 4) {
    errors.window = "Evening appointments are available on Thursdays only.";
  }
  if (!values.ack) errors.ack = "Please confirm you understand this is a demonstration.";
  return errors;
}

export const emptyBooking: BookingValues = {
  name: "",
  email: "",
  phone: "",
  date: "",
  window: "",
  stylist: "no-preference",
  notes: "",
  ack: false,
};
