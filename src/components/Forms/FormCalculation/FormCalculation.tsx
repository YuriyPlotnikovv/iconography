'use client'

import { JSX, useEffect, useRef, useState } from 'react'
import formStyles from '../../../styles/modules/form.module.scss'
import clsx from 'clsx'
import cockpit from '@/lib/CockpitAPI'
import type { PriceItem } from '@/types/types'

export default function FormCalculation(): JSX.Element {
  const [prices, setPrices] = useState<PriceItem[]>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const [goldType, setGoldType] = useState<'without_gold' | 'all' | 'halo'>('without_gold')
  const [calculated, setCalculated] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectOpen, setSelectOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement | null>(null)
  const optionsRef = useRef<Array<HTMLLIElement | null>>([])

  const radioSwitchRef = useRef<HTMLDivElement | null>(null)
  const radioLabelRefs = useRef<Array<HTMLLabelElement | null>>([])
  const radioIndicatorRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    setIsLoading(true)
    cockpit
      .getCollection('price', {
        sort: { sort: 1 },
      })
      .then((data: PriceItem[] | undefined) => {
        if (Array.isArray(data) && data.length > 0) {
          setPrices(data)
        } else {
          setError('Не удалось загрузить параметры расчёта')
        }
      })
      .catch(() => setError('Ошибка загрузки данных'))
      .finally(() => setIsLoading(false))
  }, [])

  const toggleSelect = () => setSelectOpen((prev) => !prev)
  const openSelect = () => setSelectOpen(true)
  const closeSelect = () => setSelectOpen(false)

  const selectOption = (id: string) => {
    setSelectedId(id)
    closeSelect()
  }

  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleSelect()
  }

  const handleCurrentKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault()
      openSelect()
      const idx = prices.findIndex((p) => p._id === selectedId)
      const useIdx = idx >= 0 ? idx : 0
      ;(optionsRef.current[useIdx] as HTMLElement)?.focus()
    }
    if (e.key === 'Escape') closeSelect()
  }

  const handleOptionKeyDown = (
    evt: React.KeyboardEvent<HTMLLIElement>,
    index: number,
    id: string,
  ) => {
    let nextIndex: number | undefined
    const total = prices.length
    switch (evt.key) {
      case 'ArrowDown':
        evt.preventDefault()
        nextIndex = (index + 1) % total
        ;(optionsRef.current[nextIndex] as HTMLElement)?.focus()
        break
      case 'ArrowUp':
        evt.preventDefault()
        nextIndex = (index - 1 + total) % total
        ;(optionsRef.current[nextIndex] as HTMLElement)?.focus()
        break
      case 'Home':
        ;(optionsRef.current[0] as HTMLElement)?.focus()
        break
      case 'End':
        evt.preventDefault()
        ;(optionsRef.current[total - 1] as HTMLElement)?.focus()
        break
      case 'Enter':
      case ' ': {
        evt.preventDefault()
        selectOption(id)
        break
      }
      case 'Escape':
        closeSelect()
        break
    }
  }

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      const target = evt.target as Node | null
      if (!target) return
      if (selectRef.current && !selectRef.current.contains(target)) {
        closeSelect()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    const updateIndicator = () => {
      const idx = goldType === 'without_gold' ? 0 : goldType === 'all' ? 1 : 2
      const label = radioLabelRefs.current[idx]
      const container = radioSwitchRef.current
      const indicator = radioIndicatorRef.current
      if (!label || !container || !indicator) return
      const labelRect = label.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const left = labelRect.left - containerRect.left
      indicator.style.width = `${labelRect.width}px`
      indicator.style.transform = `translateX(${left}px)`
    }

    updateIndicator()

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateIndicator) : null
    if (ro) {
      radioLabelRefs.current.forEach((l) => l && ro.observe(l))
    }
    window.addEventListener('resize', updateIndicator)

    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', updateIndicator)
    }
  }, [goldType, prices])

  useEffect(() => {
    if (!selectedId || !prices.length) {
      setCalculated('')
      return
    }
    const item = prices.find((p) => p._id === selectedId)
    if (!item) {
      setCalculated('')
      return
    }
    let value = 0
    if (goldType === 'without_gold') value = item.without_gold
    if (goldType === 'all') value = item.all
    if (goldType === 'halo') value = item.halo
    if (item.price_for_inch) {
      setCalculated(`от ${value} руб./дм²`)
    } else {
      setCalculated(`${value} руб.`)
    }
  }, [selectedId, goldType, prices])

  return (
    <form
      className={clsx(formStyles['form'], formStyles['form--calculation'])}
      action="#"
      autoComplete="off"
      aria-busy={isLoading}
    >
      {error && (
        <div className={formStyles['form__cell']} style={{ color: 'red', marginBottom: 8 }}>
          {error}
        </div>
      )}

      <div className={formStyles['form__label']}>
        <div id="calculation-sort" ref={selectRef} className={formStyles['form__select']}>
          <button
            type="button"
            className={clsx(formStyles['form__select__current'], formStyles['form__input'])}
            aria-haspopup="listbox"
            aria-expanded={selectOpen}
            id="calculationSortingButton"
            onClick={handleToggleClick}
            onKeyDown={(e) => {
              e.stopPropagation()
              handleCurrentKeyDown(e)
            }}
          >
            {selectedId
              ? prices.find((p) => p._id === selectedId)?.size || '—'
              : 'Размер/категория'}

            <svg
              className={formStyles['form__select__icon']}
              width="10"
              height="10"
              viewBox="0 0 10 10"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 3l4 4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <ul
            className={formStyles['form__select__list']}
            role="listbox"
            tabIndex={-1}
            aria-labelledby="calculationSortingButton"
            hidden={!selectOpen}
          >
            {prices.map((item, index) => (
              <li
                key={item._id}
                role="option"
                tabIndex={-1}
                ref={(el: HTMLLIElement | null) => {
                  optionsRef.current[index] = el
                }}
                className={clsx(formStyles['form__select__option'], {
                  [formStyles['form__select__option--selected']]: item._id === selectedId,
                })}
                data-value={item._id}
                aria-selected={item._id === selectedId}
                onPointerDown={(evt) => {
                  evt.preventDefault()
                  evt.stopPropagation()
                  if (item._id !== selectedId) selectOption(item._id)
                  else closeSelect()
                }}
                onKeyDown={(evt) => handleOptionKeyDown(evt, index, item._id)}
              >
                {item.size}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={formStyles['form__radio-group']}>
        <span>Тип золочения:</span>

        <div
          ref={radioSwitchRef}
          className={formStyles['form__radio-switch']}
          role="radiogroup"
          aria-label="Тип золочения"
        >
          <input
            id="gold-without"
            className="visually-hidden"
            type="radio"
            name="goldTypeSwitch"
            value="without_gold"
            checked={goldType === 'without_gold'}
            onChange={() => setGoldType('without_gold')}
          />
          <input
            id="gold-all"
            className="visually-hidden"
            type="radio"
            name="goldTypeSwitch"
            value="all"
            checked={goldType === 'all'}
            onChange={() => setGoldType('all')}
          />
          <input
            id="gold-halo"
            className="visually-hidden"
            type="radio"
            name="goldTypeSwitch"
            value="halo"
            checked={goldType === 'halo'}
            onChange={() => setGoldType('halo')}
          />

          <label
            ref={(el: HTMLLabelElement | null) => {
              radioLabelRefs.current[0] = el
            }}
            htmlFor="gold-without"
            className={formStyles['form__radio-option']}
          >
            Без золота
          </label>

          <label
            ref={(el: HTMLLabelElement | null) => {
              radioLabelRefs.current[1] = el
            }}
            htmlFor="gold-all"
            className={formStyles['form__radio-option']}
          >
            Золотой фон и нимб
          </label>

          <label
            ref={(el: HTMLLabelElement | null) => {
              radioLabelRefs.current[2] = el
            }}
            htmlFor="gold-halo"
            className={formStyles['form__radio-option']}
          >
            Только нимб
          </label>

          <span
            ref={radioIndicatorRef}
            className={formStyles['form__radio-indicator']}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className={clsx(formStyles['form__cell'], formStyles['form__result'])}>
        <p>Итоговая стоимость:</p>
        <p>{calculated || '—'}</p>
      </div>
    </form>
  )
}
