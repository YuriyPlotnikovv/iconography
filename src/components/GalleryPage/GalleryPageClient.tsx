'use client'

import { JSX, useEffect, useRef } from 'react'
import clsx from 'clsx'
import lightGallery from 'lightgallery'
import Masonry from 'react-masonry-css'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'
import type { LightGallery } from 'lightgallery/lightgallery'
import { GalleryItemForClient } from '@/types/types'
import galleryPageStyles from './GalleryPage.module.scss'
import GalleryBadge from './GalleryBadge'
import { GALLERY_BREAKPOINT_COLUMNS } from '@/const/const'

type GalleryPageClientProps = {
  items: GalleryItemForClient[]
}

export default function GalleryPageClient({ items }: GalleryPageClientProps): JSX.Element {
  const router = useRouter()
  const galleryRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const lightGalleryInstances = useRef<Map<string, LightGallery>>(new Map())

  useEffect(() => {
    const instances = lightGalleryInstances.current

    items.forEach((item) => {
      const isCategory = item.type === 'Категория'
      const hasNestedCategories = item.hasNestedCategories

      if ((isCategory && !hasNestedCategories && item.children.length > 0) || !isCategory) {
        const ref = galleryRefs.current.get(item._id)

        if (ref) {
          const galleryItems = !isCategory
            ? items
                .filter((i) => i.type !== 'Категория')
                .map((i) => ({
                  src: i.imageLargeUrl,
                  thumb: i.imageThumbUrl,
                  subHtml: `<h4>${i.title}</h4>`,
                }))
            : item.children.map((child) => ({
                src: child.imageLargeUrl,
                thumb: child.imageThumbUrl,
                subHtml: `<h4>${child.title}</h4>`,
              }))

          const instance = lightGallery(ref, {
            dynamic: true,
            dynamicEl: galleryItems,
            plugins: [lgThumbnail, lgZoom],
            speed: 500,
          })

          instances.set(item._id, instance)
        }
      }
    })

    return () => {
      instances.forEach((instance) => {
        instance.destroy()
      })
      instances.clear()
    }
  }, [items])

  const handleItemClick = (item: GalleryItemForClient) => {
    const isCategory = item.type === 'Категория'
    const hasNestedCategories = item.hasNestedCategories

    if (isCategory && hasNestedCategories) {
      router.push(`/gallery/${item.fullPath}`)
    } else {
      const instance = lightGalleryInstances.current.get(item._id)

      if (instance) {
        let openIndex = 0

        if (!isCategory) {
          const photoItems = items.filter((i) => i.type !== 'Категория')
          openIndex = photoItems.findIndex((i) => i._id === item._id)
        }

        instance.openGallery(openIndex)
      }
    }
  }

  return (
    <section className={clsx('section', galleryPageStyles['gallery'])}>
      <div className="container">
        <Masonry
          className={galleryPageStyles['gallery__masonry']}
          breakpointCols={GALLERY_BREAKPOINT_COLUMNS}
          columnClassName={galleryPageStyles['gallery__masonry-column']}
        >
          {items.map((item, index) => {
            const isCategory = item.type === 'Категория'

            return (
              <div
                className={galleryPageStyles['gallery__item']}
                key={item._id}
                data-index={index}
                data-animate="scale-in"
                data-stagger={String(index % 8)}
              >
                <div
                  className={galleryPageStyles['gallery__card']}
                  ref={(el) => {
                    if (el) {
                      galleryRefs.current.set(item._id, el)
                    }
                  }}
                  onClick={() => handleItemClick(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <Image
                    className={galleryPageStyles['gallery__image']}
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    width={400}
                    height={400}
                  />

                  <div className={galleryPageStyles['gallery__content']}>
                    <h3 className={galleryPageStyles['gallery__title']}>{item.title}</h3>

                    {isCategory && (
                      <GalleryBadge
                        categoriesCount={item.categoriesCount}
                        photosCount={item.photosCount}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </Masonry>
      </div>
    </section>
  )
}
