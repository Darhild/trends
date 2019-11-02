import React from  "react"
import './style.scss'

interface TrendProps {
    img: string,
    desc: string,
    icon: string
}

const Trend = ({img, desc, icon}: TrendProps) => {
    return (
        <div style={ {background: `url(${img})`} }>
            <span>{icon}</span>
            <p>{desc}</p>
        </div>
    )
}

export default Trend