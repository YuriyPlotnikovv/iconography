import { JSX } from 'react'
import clsx from 'clsx'

import { FaqFromServer } from '@/types/types'
import faqStyles from './Faq.module.scss'
import { fetchCollection } from '@/lib/api-client'
import { createSanitizedHTML, stripHtml } from '@/functions/functions'

export default async function Faq(): Promise<JSX.Element | null> {
  const faqData: FaqFromServer[] = await fetchCollection<FaqFromServer>('faq', {
    sort: { sort: 1 },
  })

  if (!faqData || faqData.length === 0) {
    return null
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: stripHtml(faq.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(faq.answer),
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={clsx('section', faqStyles['faq'])} id="faq">
        <div className="container">
          <h2 className="section__title" data-animate="fade-up">
            Вопрос-ответ
          </h2>

          <ul className={faqStyles['faq__list']}>
            {faqData.map((faq, index) => {
              return (
                <li
                  className={faqStyles['faq__item']}
                  key={faq._id}
                  data-animate="fade-up"
                  data-stagger={String(index)}
                >
                  <details className={faqStyles['faq__item-details']} name="question">
                    <summary
                      className={clsx('block-html', faqStyles['faq__item-title'])}
                      dangerouslySetInnerHTML={createSanitizedHTML(faq.question)}
                    />

                    <p
                      className={clsx('block-html', faqStyles['faq__item-text'])}
                      dangerouslySetInnerHTML={createSanitizedHTML(faq.answer)}
                    />
                  </details>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
