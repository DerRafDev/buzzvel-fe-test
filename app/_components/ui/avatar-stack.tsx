import Image from "next/image";

import type { Avatar } from "@/app/_data/content";

type AvatarStackProps = {
  avatars: Avatar[];
  size: 32 | 40;
  ring: "cream" | "yellow";
  className?: string;
};

/**
 * Overlapping learner avatars. They are decorative: the text next to them
 * ("Trusted by 24,000+ learners") carries the information.
 */
export function AvatarStack({ avatars, size, ring, className = "" }: AvatarStackProps) {
  return (
    <div className={`flex ${className}`} aria-hidden="true">
      {avatars.map((avatar, index) => (
        <Image
          key={index}
          src={avatar.src}
          alt=""
          width={size}
          height={size}
          sizes={`${size}px`}
          className={`rounded-full border-2 bg-primary-soft object-cover ${ring === "cream" ? "border-cream" : "border-yellow"} ${index > 0 ? "-ml-2" : ""}`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}
