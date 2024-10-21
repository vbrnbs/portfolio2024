import * as React from "react"

// import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ImageValue } from "sanity"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

export function CarouselDemo(images : any) {
  return (
    <Carousel className="w-full max-w-4xl">
      <CarouselContent>
        {Array.isArray(images.images) && images.images.length > 0 ? (
          images.images.map((image: ImageValue, index: number) => (
            <CarouselItem key={index}>
              <Image
                src={urlFor(image.asset as SanityImageSource).url()}
                alt={`${index} - Image ${index + 1}`}
                // fill
                width={2000}
                height={2000}
                // className="object-cover object-center"
              />
            </CarouselItem>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>No images available</p>
          </div>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
