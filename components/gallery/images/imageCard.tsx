import Image from 'next/image'
import { useCallback, useState } from 'react'

interface ImageCardProps {
  img: string
  name: string
  setId: (id: number) => void
  imageId: number
}

export const ImageCard = ({ img, name, setId, imageId }: ImageCardProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false)

  const handleClick = useCallback(() => {
    setId(imageId)
  }, [setId, imageId])

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <div
      className={`mb-1 mr-1 flex cursor-pointer flex-col items-center justify-center rounded-md border p-5 ${
        isFocused ? 'focus-outline' : ''
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClick()
        }
      }}
    >
      <div className="aspect-w-1 aspect-h-1 overflow-hidden">
        <Image src={img} width="250" height="250" style={{ objectFit: 'cover' }} alt="TrackCover" />
      </div>
      <div className="truncate">{name}</div>
    </div>
  )
}
