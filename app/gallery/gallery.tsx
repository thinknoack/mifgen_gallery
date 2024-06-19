'use client'
import { DataList } from '../../public/metadata.js'
import { TraitList } from '../../public/TraitList.js'
import imageData from '../../public/metadata.json'
import React, { useEffect, useCallback, useState } from 'react'
import { Images } from './images'
import { ImageCardVisible } from './imageCardVisible'
import { Trait } from './trait'

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
  const [trait, setTrait] = useState<string>('')
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
  const clearTrait = useCallback(() => {
    setTrait('')
  }, [setTrait])
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
        {trait &&
          images &&
          DataList.map((image) =>
            image.attributes
              ?.filter((qList) => qList.value?.includes(trait))
              ?.map((filteredList) => (
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
              ))
          )}
        {!trait &&
          images &&
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

      <div className="filter-info">
        {trait ? (
          <div
            className="mb-3 mr-3 flex cursor-pointer flex-col items-center justify-center clear-button"
            onClick={clearTrait}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                clearTrait()
              }
            }}
          >
            Clear
          </div>
        ) : null}
        {trait == '' &&
          TraitList.map((trait, index) => (
            <Trait key={index} name={trait.trait} setTrait={setTrait} />
          ))}
      </div>
    </div>
  )
}
