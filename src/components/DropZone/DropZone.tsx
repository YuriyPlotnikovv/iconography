'use client'

import {
  JSX,
  ChangeEvent,
  DragEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import dropZoneStyles from './DropZone.module.scss'

const DEFAULT_MAX_FILES = 5
const DEFAULT_MAX_SIZE_MB = 5

export type DropZoneRef = {
  reset: () => void
  getFiles: () => File[]
}

type FilePreview = {
  name: string
  isImage: boolean
  preview: string | null
}

type DropZoneProps = {
  name: string
  accept?: string
  maxFiles?: number
  maxSizeMB?: number
  hint?: string
  label?: string
  className?: string
  error?: string
}

const DropZone = forwardRef<DropZoneRef, DropZoneProps>(function DropZone(
  {
    name,
    accept,
    maxFiles = DEFAULT_MAX_FILES,
    maxSizeMB = DEFAULT_MAX_SIZE_MB,
    hint,
    label,
    className,
    error,
  },
  ref,
): JSX.Element {
  const [previewItems, setPreviewItems] = useState<FilePreview[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const allFilesRef = useRef<File[]>([])

  useImperativeHandle(ref, () => ({
    reset() {
      allFilesRef.current = []
      setPreviewItems([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
    getFiles() {
      return allFilesRef.current
    },
  }))

  const processFiles = (files: File[]) => {
    if (files.length === 0) return

    const combined = [...allFilesRef.current, ...files].slice(0, maxFiles)
    allFilesRef.current = combined

    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer()
      combined.forEach((file) => dataTransfer.items.add(file))
      fileInputRef.current.files = dataTransfer.files
    }

    const remainingSlots = maxFiles - previewItems.length
    const filesToPreview = files.slice(0, remainingSlots)
    const newPreviews: FilePreview[] = []
    let loaded = 0

    filesToPreview.forEach((file) => {
      const isImage = file.type.startsWith('image/')

      if (isImage) {
        const reader = new FileReader()

        reader.onload = (event) => {
          newPreviews.push({
            name: file.name,
            isImage: true,
            preview: event.target?.result as string,
          })

          loaded++

          if (loaded === filesToPreview.length) {
            setPreviewItems((prev) => [...prev, ...newPreviews].slice(0, maxFiles))
          }
        }
        reader.readAsDataURL(file)
      } else {
        newPreviews.push({ name: file.name, isImage: false, preview: null })
        loaded++

        if (loaded === filesToPreview.length) {
          setPreviewItems((prev) => [...prev, ...newPreviews].slice(0, maxFiles))
        }
      }
    })
  }

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    processFiles(Array.from(event.target.files || []))
    event.target.value = ''
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    processFiles(Array.from(event.dataTransfer.files))
  }

  const handleZoneClick = () => {
    if (allFilesRef.current.length >= maxFiles) return
    fileInputRef.current?.click()
  }

  const handleRemoveFile = (index: number) => {
    allFilesRef.current = allFilesRef.current.filter((_, i) => i !== index)

    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer()
      allFilesRef.current.forEach((file) => dataTransfer.items.add(file))
      fileInputRef.current.files = dataTransfer.files
    }

    setPreviewItems((prev) => prev.filter((_, i) => i !== index))
  }

  const hasFiles = previewItems.length > 0
  const limitReached = previewItems.length >= maxFiles
  const canAddMore = !limitReached
  const defaultHint = `до ${maxFiles} файлов · до ${maxSizeMB} МБ каждый`

  return (
    <div className={clsx(dropZoneStyles['drop-zone-wrapper'], className)}>
      <div
        className={clsx(dropZoneStyles['drop-zone'], {
          [dropZoneStyles['drop-zone--active']]: isDragging,
          [dropZoneStyles['drop-zone--has-files']]: hasFiles,
          [dropZoneStyles['drop-zone--limit']]: limitReached,
        })}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleZoneClick}
        role={limitReached ? undefined : 'button'}
        tabIndex={limitReached ? undefined : 0}
        onKeyDown={
          !limitReached
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  handleZoneClick()
                }
              }
            : undefined
        }
        aria-label={limitReached ? undefined : (label ?? 'Прикрепить файлы')}
      >
        <input
          ref={fileInputRef}
          type="file"
          name={name}
          accept={accept}
          multiple={maxFiles > 1}
          aria-hidden="true"
          tabIndex={-1}
          className="visually-hidden"
          onChange={handlePhotoChange}
        />

        {!hasFiles ? (
          <div className={dropZoneStyles['drop-zone__empty']}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <p className={dropZoneStyles['drop-zone__label']}>
              Перетащите файлы или нажмите для выбора
            </p>

            <p className={dropZoneStyles['drop-zone__hint']}>{hint ?? defaultHint}</p>
          </div>
        ) : (
          <div className={dropZoneStyles['drop-zone__files']}>
            {previewItems.map((item, index) => (
              <div
                key={index}
                className={clsx(dropZoneStyles['drop-zone__file'], {
                  [dropZoneStyles['drop-zone__file--image']]: item.isImage,
                  [dropZoneStyles['drop-zone__file--other']]: !item.isImage,
                })}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className={dropZoneStyles['drop-zone__remove']}
                  onClick={(event) => {
                    event.stopPropagation()
                    handleRemoveFile(index)
                  }}
                  aria-label={`Удалить файл ${item.name}`}
                >
                  ✕
                </button>

                {item.isImage && item.preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.preview} alt={item.name} />
                ) : (
                  <div className={dropZoneStyles['drop-zone__file-icon']}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <path
                        d="M14 2v6h6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                    <span className={dropZoneStyles['drop-zone__file-name']}>{item.name}</span>
                  </div>
                )}
              </div>
            ))}

            {canAddMore && (
              <div className={dropZoneStyles['drop-zone__add']} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>

      {error && <span className={dropZoneStyles['drop-zone__error']}>{error}</span>}
    </div>
  )
})

export default DropZone
