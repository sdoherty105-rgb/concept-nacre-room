/** Server-safe link into the planner; selection is applied when the client island loads. */
export function PlanLink({ serviceId, serviceName }: { serviceId: string; serviceName: string }) {
  return (
    <a href={`/#plan?service=${serviceId}`} className="plan-link" aria-label={`Plan this: ${serviceName}`}>
      Plan this
    </a>
  );
}
