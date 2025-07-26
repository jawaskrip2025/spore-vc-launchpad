'use client'
import { minidenticon } from 'minidenticons'
import Image, { ImageProps } from 'next/image'
import { useMemo } from 'react'

interface PixelIconProps extends Omit<ImageProps, 'src' | 'alt'> {
  username: string
  saturation?: number
  lightness?: number
}

const PixelIcon = ({
  username,
  saturation,
  lightness,
  ...props
}: PixelIconProps) => {
  const svgURI = useMemo(
    () =>
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  )

  return <Image src={svgURI} alt={username} {...props} />
}

export default PixelIcon
