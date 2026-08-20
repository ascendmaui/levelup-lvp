import { cn } from "@/lib/cn";

type FramedImageProps = {
  src: string;
  alt: string;
  /** CSS object-position — keep the floor plane in frame */
  position?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

/**
 * Responsive crop frame. Parent owns the box (aspect + overflow).
 * The photo is always object-cover so it fills the frame without
 * stretching, and object-position keeps the plank plane visible
 * when the crop ratio changes between mobile and desktop.
 */
export function FramedImage({
  src,
  alt,
  position = "center 68%",
  className,
  imgClassName,
  priority = false,
}: FramedImageProps) {
  return (
    <figure
      className={cn(
        "relative isolate w-full overflow-hidden bg-charcoal-elevated",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "absolute inset-0 h-full w-full max-w-none object-cover",
          imgClassName,
        )}
        style={{ objectPosition: position }}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </figure>
  );
}
