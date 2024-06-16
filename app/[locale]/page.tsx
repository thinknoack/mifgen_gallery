import { Metadata } from 'next'
import { genPageMetadata } from './seo'
import { getListPage } from '@/lib/contentParser'
import { markdownify } from '@/lib/utils/textConverter'
import { LocaleTypes } from './i18n/settings'
import ImageGallery from './images/images'

interface HomeProps {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: HomeProps): Promise<Metadata> {
  return genPageMetadata({
    title: 'home',
    description: 'home',
    params: { locale: locale },
  })
}

const Home = ({ params: { locale } }: HomeProps) => {
  const homepage = getListPage(`homepage/${locale}/_index.md`)
  const { frontmatter } = homepage
  const {
    banner,
  }: {
    banner: { title: string; image: string; description?: string }
  } = frontmatter
  return (
    <>
      <ImageGallery />
    </>
  )
}

export default Home
