import { ImageCard } from './imageCard'
import './imageGallery.scss'

type Props = {
  img: string
  name: string
  imageId: number
  id: number
  isFull: boolean
  isSearch: boolean
  search: string
  windowWidth: number
  setId: (e: number) => void
}

export const Images = (props: Props): JSX.Element | null => {
  const { img, name, imageId, isFull, id, windowWidth, setId } = props

  if (isFull === false && windowWidth <= 830) {
    if (imageId === id) {
      return (
        <div className="w-95vw h-1/2 ">
          <ImageCard img={img} name={name} setId={setId} imageId={imageId} />
        </div>
      )
    }
  } else {
    return (
      <>
        <ImageCard img={img} name={name} setId={setId} imageId={imageId} />
      </>
    )
  }

  return null
}
