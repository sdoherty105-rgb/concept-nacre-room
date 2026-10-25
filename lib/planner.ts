import { addOns, services, type AddOn, type Service } from "./services";

export type PlannerSelection = {
  serviceId: string | null;
  addOnIds: string[];
};

export type PlannerSummary = {
  service: Service | null;
  addOns: AddOn[];
  minutes: number;
  price: number;
};

export const emptySelection: PlannerSelection = { serviceId: null, addOnIds: [] };

export function findService(id: string | null): Service | null {
  return services.find((s) => s.id === id) ?? null;
}

export function addOnsFor(serviceId: string | null): AddOn[] {
  const service = findService(serviceId);
  if (!service) return [];
  return addOns.filter((a) => a.appliesTo.includes(service.category) && !a.excludes?.includes(service.id));
}

export function selectService(selection: PlannerSelection, serviceId: string): PlannerSelection {
  const allowed = new Set(addOnsFor(serviceId).map((a) => a.id));
  return { serviceId, addOnIds: selection.addOnIds.filter((id) => allowed.has(id)) };
}

export function toggleAddOn(selection: PlannerSelection, addOnId: string): PlannerSelection {
  if (!selection.serviceId) return selection;
  if (!addOnsFor(selection.serviceId).some((a) => a.id === addOnId)) return selection;
  const addOnIds = selection.addOnIds.includes(addOnId)
    ? selection.addOnIds.filter((id) => id !== addOnId)
    : [...selection.addOnIds, addOnId];
  return { ...selection, addOnIds };
}

export function summarise(selection: PlannerSelection): PlannerSummary {
  const service = findService(selection.serviceId);
  if (!service) return { service: null, addOns: [], minutes: 0, price: 0 };
  const allowed = new Set(addOnsFor(service.id).map((a) => a.id));
  const chosen = addOns.filter((a) => selection.addOnIds.includes(a.id) && allowed.has(a.id));
  return {
    service,
    addOns: chosen,
    minutes: service.minutes + chosen.reduce((n, a) => n + a.minutes, 0),
    price: service.price + chosen.reduce((n, a) => n + a.price, 0),
  };
}

export function formatDuration(minutes: number): string {
  if (minutes <= 0) return "0 min";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

export function formatPrice(amount: number): string {
  return `$${amount}`;
}
