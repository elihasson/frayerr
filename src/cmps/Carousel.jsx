import React, { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'


export const Carousel = ({ gig, isDetails, children }) => {

    const [activeIdx, setActiveIdx] = useState(0)
    const [isArrows, setArrows] = useState(false)

    const updateIdx = (newIdx, ev) => {
        ev.stopPropagation()
        if (newIdx < 0) {
            newIdx = React.Children.count(children) - 1
        } else if (newIdx >= React.Children.count(children)) {
            newIdx = 0
        }
        setActiveIdx(newIdx)
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => updateIdx(activeIdx + 1),
        onSwipedRight: () => updateIdx(activeIdx - 1)
    })

    return (

        <div
            {...handlers}
            className="carousel"
            onMouseEnter={() => isDetails? setArrows(false): setArrows(true)}
            onMouseLeave={() => setArrows(false)}>

            <div className="inner-wrapper">
                <div className={isArrows ? 'indicators show' : 'indicators'}>
                    <span className="prev-button-slick" onClick={(ev) => { updateIdx(activeIdx - 1, ev) }} float="left" >
                        <ArrowBackIosNewIcon />
                    </span>
                    <span className="next-button-slick" onClick={(ev) => { updateIdx(activeIdx + 1, ev) }} float="right">
                        <ArrowForwardIosIcon />
                    </span>
                </div>
                <div
                    className="inner"
                    style={{ transform: `translateX(-${activeIdx * 100}%)` }}
                >

                    {React.Children.map(children, (child, index) => {
                        return React.cloneElement(child, { width: "100%" })
                    })}
                </div>
            </div>
            <div className="carousel-btn-container">
                {React.Children.map(children, (child, index) => {
                    return (
                        <button
                            className={`${index === activeIdx ? "active" : ""}`}
                            style={{ backgroundImage: `url(${child.props.imgUrl.imgUrl})` }}
                            onClick={(ev) => {
                                updateIdx(index, ev)
                            }}
                        >
                        </button>
                    )
                })}
            </div>
        </div>
    )
}