import Image from 'next/image'
import React from 'react'

const Avatar = ({name, imageSrc}) => {
  return (
      <ul>
        <li><Image src={imageSrc} 
        width={32} height={32} 
        alt={`Avatar do(a) ${name}`} 
        />
        </li>
        <li>
          {name}
        </li>
      </ul>
  )
}

export default Avatar