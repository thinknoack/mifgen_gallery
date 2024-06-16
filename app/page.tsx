import Image from 'next/image'
import ImageGallery from './gallery/gallery'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <ImageGallery />
    </main>
  )
}
