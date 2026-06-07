'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Props = {
  lat: number
  lng: number
  zoom: number
  label?: string
}

const PIN_SVG = `<svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 0C6.268 0 0 6.268 0 14C0 24.5 14 40 14 40C14 40 28 24.5 28 14C28 6.268 21.732 0 14 0Z" fill="#131315"/>
  <circle cx="14" cy="14" r="5" fill="white"/>
</svg>`

export function Map({ lat, lng, zoom, label }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Usuń stary _leaflet_id który zostaje na węźle DOM po HMR
    delete (el as any)._leaflet_id

    const map = L.map(el, {
      center: [lat, lng],
      zoom,
      scrollWheelZoom: false,
      zoomControl: false,
    })

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
    ).addTo(map)

    const icon = L.divIcon({
      className: '',
      html: PIN_SVG,
      iconSize: [28, 40],
      iconAnchor: [14, 40],
      popupAnchor: [0, -42],
    })

    const marker = L.marker([lat, lng], { icon }).addTo(map)
    if (label) marker.bindPopup(label)

    return () => {
      map.remove()
    }
  }, [lat, lng, zoom, label])

  return (
    <div
      ref={containerRef}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg"
    />
  )
}
