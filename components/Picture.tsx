const frames = {
  cover: { widths: [640, 768, 864], width: 864, height: 1152 },
  colour: { widths: [864], width: 864, height: 1152 },
  shears: { widths: [840], width: 840, height: 1120 },
  bottles: { widths: [840], width: 840, height: 1120 },
  basin: { widths: [1100], width: 1100, height: 825 },
  "people-colour": { widths: [800], width: 800, height: 1067 },
  "people-cut": { widths: [800], width: 800, height: 1067 },
  "people-texture": { widths: [800], width: 800, height: 1067 },
  "people-skin": { widths: [864], width: 864, height: 1152 },
} as const;

export type PictureName = keyof typeof frames;

type Props = {
  name: PictureName;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function Picture({ name, alt, sizes, priority = false, className }: Props) {
  const frame = frames[name];
  const src = (width: number, ext: string) => `/media/${name}-${width}.${ext}`;
  const last = frame.widths[frame.widths.length - 1];
  if (priority) {
    const avif = frame.widths.map((w) => `${src(w, "avif")} ${w}w`).join(", ");
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={className}
        src={src(frame.widths[0], "avif")}
        srcSet={avif}
        sizes={sizes}
        alt={alt}
        width={frame.width}
        height={frame.height}
        decoding="sync"
        fetchPriority="high"
        loading="eager"
      />
    );
  }
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={frame.widths.map((w) => `${src(w, "avif")} ${w}w`).join(", ")} sizes={sizes} />
      <source type="image/webp" srcSet={frame.widths.map((w) => `${src(w, "webp")} ${w}w`).join(", ")} sizes={sizes} />
      <img
        src={src(last, "webp")}
        alt={alt}
        width={frame.width}
        height={frame.height}
        sizes={sizes}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        loading={priority ? "eager" : "lazy"}
      />
    </picture>
  );
}
