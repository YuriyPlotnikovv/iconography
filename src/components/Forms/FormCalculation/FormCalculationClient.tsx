'use client'

import { JSX, PointerEvent, KeyboardEvent, useEffect, useRef, useState, useMemo } from 'react'
import formStyles from '../../../styles/modules/form.module.scss'
import clsx from 'clsx'
import type { PriceItem, GoldTypeValue } from '@/types/types'
import { GOLD_TYPE_OPTIONS } from '@/const/const'
import { formatPrice } from '@/functions/functions'

type Props = {
  prices: PriceItem[]
}

export default function FormCalculationClient({ prices: initialPrices }: Props): JSX.Element {
  const prices: PriceItem[] = useMemo(() => initialPrices || [], [initialPrices])
  const [selectedId, setSelectedId] = useState<string>('')
  const [goldType, setGoldType] = useState<GoldTypeValue>('without_gold')
  const [calculated, setCalculated] = useState<string>('')
  const isLoading = false
  const error: string | null =
    prices && prices.length ? null : 'Не удалось загрузить параметры расчёта'
  const [selectOpen, setSelectOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement | null>(null)
  const optionsRef = useRef<Array<HTMLLIElement | null>>([])

  const radioSwitchRef = useRef<HTMLDivElement | null>(null)
  const radioLabelRefs = useRef<Array<HTMLLabelElement | null>>([])
  const radioIndicatorRef = useRef<HTMLSpanElement | null>(null)

  const toggleSelect = () => setSelectOpen((prev) => !prev)
  const openSelect = () => setSelectOpen(true)
  const closeSelect = () => setSelectOpen(false)

  const selectOption = (id: string) => {
    setSelectedId(id)
    closeSelect()
  }

  const handleToggleClick = (evt: PointerEvent<HTMLButtonElement>) => {
    evt.stopPropagation()
    toggleSelect()
  }

  const handleCurrentKeyDown = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(evt.key)) {
      evt.preventDefault()
      openSelect()
      const idx = prices.findIndex((price) => price._id === selectedId)
      const useIdx = idx >= 0 ? idx : 0
      ;(optionsRef.current[useIdx] as HTMLElement)?.focus()
    }
    if (evt.key === 'Escape') closeSelect()
  }

  const handleOptionKeyDown = (evt: KeyboardEvent<HTMLLIElement>, index: number, id: string) => {
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
    const item = prices.find((price) => price._id === selectedId)
    if (!item) {
      setCalculated('')
      return
    }
    let value = 0
    if (goldType === 'without_gold') value = item.without_gold
    if (goldType === 'all') value = item.all
    if (goldType === 'halo') value = item.halo
    if (item.price_for_inch) {
      setCalculated(`от ${formatPrice(value)}/дм²`)
    } else {
      setCalculated(formatPrice(value))
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
            className={clsx(formStyles['form__select-current'], formStyles['form__input'])}
            aria-haspopup="listbox"
            aria-expanded={selectOpen}
            id="calculationSortingButton"
            onClick={handleToggleClick}
            onKeyDown={(evt) => {
              evt.stopPropagation()
              handleCurrentKeyDown(evt)
            }}
          >
            {selectedId
              ? prices.find((price) => price._id === selectedId)?.size || '—'
              : 'Размер/категория'}

            <svg
              className={formStyles['form__select-icon']}
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
            className={formStyles['form__select-list']}
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
                className={clsx(formStyles['form__select-option'], {
                  [formStyles['form__select-option--selected']]: item._id === selectedId,
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
          {GOLD_TYPE_OPTIONS.map((opt, idx) => (
            <label
              key={opt.value}
              ref={(el: HTMLLabelElement | null) => {
                radioLabelRefs.current[idx] = el
              }}
              className={formStyles['form__radio-option']}
            >
              <input
                className="visually-hidden"
                type="radio"
                name="goldTypeSwitch"
                value={opt.value}
                checked={goldType === opt.value}
                onChange={() => setGoldType(opt.value)}
              />
              {opt.label}
            </label>
          ))}

          <span
            ref={radioIndicatorRef}
            className={formStyles['form__radio-indicator']}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className={clsx(formStyles['form__cell'], formStyles['form__result'])}>
        <p>Итоговая стоимость:</p>
        <p className={formStyles['form__result-price']}>{calculated || '—'}</p>
      </div>
    </form>
  )
}
