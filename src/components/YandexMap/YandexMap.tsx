'use client'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Image from 'next/image'
import yandexMapStyles from './YandexMap.module.scss'

type YandexMapProps = {
  logo: string
  coordinates: string
}

type LngLat = [number, number]

type YMapLocationRequest = {
  center: LngLat
  zoom: number
}

type ReactifiedModule = {
  YMap: React.ComponentType<{
    location: YMapLocationRequest
    className?: string
    children?: React.ReactNode
  }>
  YMapDefaultSchemeLayer: React.ComponentType
  YMapDefaultFeaturesLayer: React.ComponentType
  YMapMarker: React.ComponentType<{
    coordinates: LngLat
    children?: React.ReactNode
  }>
  YMapControls: React.ComponentType<{
    position: string
    children?: React.ReactNode
  }>
}

type UIControls = {
  YMapZoomControl: React.ComponentType
  YMapGeolocationControl: React.ComponentType
  YMapRouteControl: React.ComponentType<{
    waypoints?: [LngLat | null, LngLat | null]
    availableTypes?: ('auto' | 'masstransit' | 'pedestrian')[]
    onRouteResult?: (result: unknown, type: string) => void
    onUpdateWaypoints?: (waypoints: unknown) => void
    onBuildRouteError?: () => void
  }>
}

type ReactifyModule = {
  reactify: {
    bindTo: (
      react: typeof React,
      reactDOM: typeof ReactDOM,
    ) => {
      module: <T>(mod: unknown) => T
    }
  }
}

export default function YandexMap({ logo, coordinates }: YandexMapProps): React.JSX.Element | null {
  const [reactifiedModule, setReactifiedModule] = React.useState<ReactifiedModule | null>(null)
  const [uiControls, setUiControls] = React.useState<UIControls | null>(null)

  React.useEffect(() => {
    if (typeof ymaps3 === 'undefined') {
      return
    }

    Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready])
      .then(async ([reactifyModule]) => {
        const reactify = (reactifyModule as ReactifyModule).reactify.bindTo(React, ReactDOM)
        const ymapsApi = reactify.module<ReactifiedModule>(ymaps3)
        const uiTheme = await import('@yandex/ymaps3-default-ui-theme')
        const uiThemeReactified = reactify.module<UIControls>(uiTheme)

        setReactifiedModule(ymapsApi)
        setUiControls(uiThemeReactified)
      })
      .catch((error) => {
        console.error('Ошибка загрузки Яндекс.Карт:', error)
      })
  }, [])

  if (!reactifiedModule || !uiControls) {
    return null
  }

  const coords = coordinates.split(',').map((coord) => parseFloat(coord.trim()))

  if (coords.length !== 2 || coords.some(isNaN)) {
    console.error('Неверный формат координат:', coordinates)
    return null
  }

  const [lng, lat] = coords
  const destinationCoords: LngLat = [lng, lat]

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls } =
    reactifiedModule
  const { YMapZoomControl, YMapGeolocationControl} = uiControls

  return (
    <YMap
      className={yandexMapStyles['map']}
      location={{
        center: destinationCoords,
        zoom: 15,
      }}
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />

      <YMapControls position="right">
        <YMapZoomControl />
        <YMapGeolocationControl />
      </YMapControls>

      {destinationCoords && (
        <YMapMarker coordinates={destinationCoords}>
          <div className={yandexMapStyles['map__marker']}>
            <div className={yandexMapStyles['map__marker-icon']}>
              <Image src={logo} alt="Иконописная Артель" width={30} height={30} unoptimized />
            </div>
            <div className={yandexMapStyles['map__marker-arrow']} />
          </div>
        </YMapMarker>
      )}
    </YMap>
  )
}
