import Image from 'next/image'

interface ImageCardVisibleProps {
  id: number
  imageId: number
  img: string
  name: string
}

export const ImageCardVisible = ({ id, imageId, img, name }: ImageCardVisibleProps) => {
  return (
    <>
      {imageId === id && (
        <div className="m-2 flex min-w-[700px] flex-col items-center justify-center">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden">
            <Image
              src={img}
              width="1080"
              height="1338"
              style={{ objectFit: 'cover' }}
              alt="TrackCover"
            />
          </div>
          <span>{name}</span>
        </div>
      )}
    </>
  )
}
