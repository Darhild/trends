import React from 'react';
import './Card.scss';
import data from './../../feed.json'

const Card: React.FC = () => {
    const item: any = data.items[0].includes[0];
    const style:any = {
        backgroundImage: `url(${item.onto_poster})`
    }

    return (
        <a className="Card-Link" href={`https://yandex.ru/efir?from=efir&stream_id=${item.content_id}`}>
            <div className="Card">
                <div className="Card-Thumb" style={style}></div>
                <div className="Card-Content">
                    <div className="Card-Title" >
                      {item.includes[0].series.title}
                    </div>
                    <div className="Card-Subtitle">
                        {item.genres.toString()}
                    </div>
                </div>
    
            </div>
        </a>
    )
}

export default Card;

