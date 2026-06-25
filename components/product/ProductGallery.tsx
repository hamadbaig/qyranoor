'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2, ZoomIn } from 'lucide-react'
import { ProductColor } from '@/types/product'

interface Props {
  selectedColor: ProductColor
  productName: string
  activeImageIndex?: number
  onImageChange?: (i: number) => void
}

export default function ProductGallery({ selectedColor, productName, activeImageIndex = 0, onImageChange }: Props) {
  const [activeIndex, setActiveIndex] = useState(activeImageIndex)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [fsIndex, setFsIndex] = useState(0)
  const mainRef = useRef<HTMLDivElement>(null)

  const images = selectedColor.images

  useEffect(() => {
    setActiveIndex(0)
  }, [selectedColor.name])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainRef.current) return
    const rect = mainRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }, [])

  const selectImage = (i: number) => {
    setActiveIndex(i)
    onImageChange?.(i)
  }

  const openFullscreen = (i: number) => {
    setFsIndex(i)
    setIsFullscreen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
    document.body.style.overflow = ''
  }

  const fsNext = () => setFsIndex(p => Math.min(images.length - 1, p + 1))
  const fsPrev = () => setFsIndex(p => Math.max(0, p - 1))

  useEffect(() => {
    if (!isFullscreen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullscreen()
      if (e.key === 'ArrowRight') fsNext()
      if (e.key === 'ArrowLeft') fsPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isFullscreen])

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-4">
        {/* Thumbnails */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 lg:w-[72px]">
          {images.map((img, i) => (
            <motion.button
              key={`${selectedColor.name}-${i}`}
              onClick={() => selectImage(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex-shrink-0 w-16 h-20 lg:w-full overflow-hidden bg-warm-100 transition-all duration-200 ${
                i === activeIndex
                  ? 'ring-2 ring-gold ring-offset-1'
                  : 'ring-1 ring-warm-200 hover:ring-warm-400'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="72px"
              />
              {i === activeIndex && (
                <motion.div
                  layoutId="thumb-indicator"
                  className="absolute inset-0 bg-gold/10 pointer-events-none"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 relative">
          <div
            ref={mainRef}
            className="relative aspect-[3/4] overflow-hidden bg-warm-100 cursor-zoom-in group"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedColor.name}-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="absolute inset-0"
                style={isZooming ? {
                  transform: 'scale(2.2)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transition: 'transform-origin 0ms',
                } : { transition: 'transform 0.3s ease' }}
              >
                <Image
                  src={images[activeIndex]}
                  alt={`${productName} — ${selectedColor.name}`}
                  fill
                  className="object-cover"
                  priority={activeIndex === 0}
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Overlay actions */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-3 right-3 flex flex-col gap-2 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openFullscreen(activeIndex)}
                  className="p-2 bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
                  title="View full screen"
                >
                  <Maximize2 size={15} className="text-warm-700" />
                </button>
              </div>
              <div className="absolute bottom-3 right-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-1 text-xs text-white bg-black/40 backdrop-blur-sm px-2 py-1">
                  <ZoomIn size={11} /> Hover to zoom
                </span>
              </div>
            </div>

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => selectImage(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm hover:bg-white disabled:opacity-0 transition-all shadow-md"
                >
                  <ChevronLeft size={16} className="text-warm-800" />
                </button>
                <button
                  onClick={() => selectImage(Math.min(images.length - 1, activeIndex + 1))}
                  disabled={activeIndex === images.length - 1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm hover:bg-white disabled:opacity-0 transition-all shadow-md"
                >
                  <ChevronRight size={16} className="text-warm-800" />
                </button>
              </>
            )}

            {/* Dot indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => selectImage(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === activeIndex ? 'bg-gold w-4' : 'bg-white/70 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Image count */}
          <p className="mt-2 text-xs text-warm-500 font-sans text-center">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/97 flex items-center justify-center"
            onClick={closeFullscreen}
          >
            {/* Close */}
            <button
              onClick={closeFullscreen}
              className="absolute top-5 right-5 p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors z-10"
            >
              <X size={22} />
            </button>

            {/* Image */}
            <div
              className="relative max-w-3xl max-h-[90vh] w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={fsIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="relative aspect-[3/4] max-h-[85vh] w-full"
                >
                  <Image
                    src={images[fsIndex]}
                    alt={`${productName} fullscreen ${fsIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* FS Nav */}
              {fsIndex > 0 && (
                <button
                  onClick={fsPrev}
                  className="absolute -left-14 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft size={28} />
                </button>
              )}
              {fsIndex < images.length - 1 && (
                <button
                  onClick={fsNext}
                  className="absolute -right-14 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronRight size={28} />
                </button>
              )}
            </div>

            {/* FS Thumbnails */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" onClick={e => e.stopPropagation()}>
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setFsIndex(i)}
                  className={`relative w-12 h-14 overflow-hidden transition-all ${
                    i === fsIndex ? 'ring-2 ring-gold' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image src={img} alt={`thumb ${i}`} fill className="object-cover" sizes="48px" />
                </button>
              ))}
            </div>

            {/* Counter */}
            <p className="absolute top-5 left-5 text-white/50 text-sm font-sans">
              {fsIndex + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
