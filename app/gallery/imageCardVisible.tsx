import Image from 'next/image'

interface ImageCardVisibleProps {
  id: number
  imageId: number
  img: string
  name: string
  attributes: Array<string>
}
interface Attribute {
  trait_type: string
  value: string
}

export const ImageCardVisible = ({
  id,
  imageId,
  img,
  name,
  attributes,
}: ImageCardVisibleProps) => {
  return (
    <>
      {imageId === id && (
        <div className="m-2 flex min-w-[700px] flex-col items-center justify-center">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden">
            <Image
              src={img}
              width="650"
              height="800"
              style={{ objectFit: 'cover' }}
              alt="TrackCover"
            />
          </div>
          <span>{name}</span>
          <span>
            {attributes &&
              attributes.map((attribute) => (
                <>
                  <span>
                    {attribute.trait_type}
                    {': '}
                  </span>
                  <span>
                    <strong>{attribute.value}</strong>
                    {', '}
                  </span>
                </>
              ))}
          </span>
        </div>
      )}
    </>
  )
}
