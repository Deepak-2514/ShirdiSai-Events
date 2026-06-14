import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioPortrait({ src }: { src: string }) {
  return (
    <div className="w-full max-w-[10rem]">
      <AspectRatio ratio={9 / 16} className="rounded-lg bg-muted">
        <Image
          src={src}
          alt="Photo"
          fill
          className="rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
    </div>
  )
}
