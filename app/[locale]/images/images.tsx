'use client'

import imageData from '../../../config/data/metadata.json'
import React, { useEffect, useState } from 'react'
import { Images } from '@/components/gallery/images'
import { ImageCardVisible } from '@/components/gallery/images/imageCardVisible'

import './images.scss'

interface Image {
  edition: number
  image: string
  name: string
}

const MemoizedImages = React.memo(Images)

export default function ImageGallery(): JSX.Element {
  const [edition, setId] = useState<number>(0)
  const [isFull, setIsFull] = useState<boolean>(false)
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  const [images, setMusics] = useState<Image[]>([])
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
    setMusics(imageData)
    setIsLoading(false)
  }, [])

  return (
    <div className="images-wrapper">
      <div className="image-full">
        {images &&
          images.map((image) => (
            <ImageCardVisible
              key={image.edition}
              id={edition}
              imageId={image.edition}
              img={image.image}
              name={image.name}
            />
          ))}
        <h1 className="pt-5 text-center">Mifella Genesis</h1>
        <p className="text-center">This is a collection about Mifella's Begining</p>
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
              id={edition}
              isFull={isFull}
              isSearch={isSearch}
              search={search}
              windowWidth={windowWidth}
            />
          ))}
      </div>
    </div>
  )
}
