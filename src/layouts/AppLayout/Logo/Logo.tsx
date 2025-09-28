import React from 'react'
import Image from 'next/image'
import logoImage from './images/logo.svg'


type LogoProps = {
  className?: string
}

const Logo: React.FC<LogoProps> = (props) => {
  const { className } = props

  return (
    <Image
      className={className}
      src={logoImage.src}
      width={233}
      height={24}
      alt="logo"
    />
  )
}


export default React.memo(Logo)
