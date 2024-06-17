'use client'

import imageData from '../../public/metadata.json'
import React, { useEffect, useState } from 'react'
import { Images } from './images'
import { ImageCardVisible } from './imageCardVisible'

import './imageGallery.scss'

interface Image {
  edition: number
  image: string
  name: string
  attributes: Array<string>
}

const MemoizedImages = React.memo(Images)

export default function ImageGallery(): JSX.Element {
  const [id, setId] = useState<number>(0)
  const [isFull, setIsFull] = useState<boolean>(false)
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  const [images, setImages] = useState<Image[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
    }

    return (): void => window.removeEventListener('resize', handleResize)
  }, [])

  const handleResize = (): void => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    setImages(imageData)
    setIsLoading(false)
  }, [])

  return (
    <div className="images-wrapper">
      <div className="image-full">
        {images &&
          images.map((image) => (
            <ImageCardVisible
              key={image.edition}
              id={id}
              imageId={image.edition}
              img={image.image}
              name={image.name}
              attributes={image.attributes}
            />
          ))}
        <h1 className="pt-5 text-center">Mifella Genesis</h1>
        <p className="text-center">
          {"This is a collection about Mifella's begining"}
        </p>
      </div>
      <div className="image-list">
        {images &&
          images.map((image) => (
            <MemoizedImages
              key={image.edition}
              img={image.image}
              name={image.name}
              setId={setId}
              imageId={image.edition}
              id={id}
              isFull={isFull}
              windowWidth={windowWidth}
            />
          ))}
      </div>
    </div>
  )
}
