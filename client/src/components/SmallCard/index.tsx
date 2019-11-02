import React from  "react"
import './style.scss'

interface SmallCardProps {
    img: string,
    desc: string,
    icon: string
}

const SmallCard = ({img, desc, icon}: SmallCardProps) => {
    return (
        <div className='SmallCard' style={ {backgroundImage: `url(${img})`} }>
            <span className='SmallCard-Icon'>{icon}</span>
            <p className='SmallCard-Footer'>{desc}</p>
        </div>
    )
}

export default SmallCard