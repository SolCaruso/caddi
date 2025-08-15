'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType, EmblaEventType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-autoplay'
import Image from 'next/image'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './embla-carousel-arrow-buttons'

// Type for the autoplay plugin
type AutoScrollPlugin = {
  play: () => void
  stop: () => void
  reset: () => void
  isPlaying: () => boolean
}

type PropType = {
  images: string[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { images, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
    containScroll: 'trimSnaps' as const,
    ...options 
  }, [
    AutoScroll({ 
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false
    })
  ])
  const [isPlaying, setIsPlaying] = useState(true)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll as unknown as AutoScrollPlugin
      if (!autoScroll) return

      autoScroll.reset()
      callback()
    },
    [emblaApi]
  )

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll as unknown as AutoScrollPlugin
    if (!autoScroll) return

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play
    playOrStop()
  }, [emblaApi])

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll as unknown as AutoScrollPlugin
    if (!autoScroll || !emblaApi) return

    setIsPlaying(autoScroll.isPlaying())
    emblaApi
      .on('autoScroll:play' as EmblaEventType, () => setIsPlaying(true))
      .on('autoScroll:stop' as EmblaEventType, () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(autoScroll.isPlaying()))
  }, [emblaApi])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((image, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <Image
                  src={image}
                  alt={`Custom work example ${index + 1}`}
                  width={400}
                  height={600}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onButtonAutoplayClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>

        <button className="embla__play" onClick={toggleAutoplay} type="button">
          {isPlaying ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  )
}

export default EmblaCarousel
