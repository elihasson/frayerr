import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export function Carousel({ gig, isDetails, children }) {
    
    const [activeIdx, setActiveIdx] = useState(0);
    const [isArrows, setArrows] = useState(false);
    console.log('gig321:', gig)
    console.log('isDetail321:',  isDetails)
    console.log('children321:', children)

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
            onMouseEnter={() => setArrows(true)}
            onMouseLeave={() => setArrows(false)}
        >
            <div className="inner-wrapper">
                <div className={isArrows ? 'indicators show' : 'indicators'}>
                    <span
                        onClick={(ev) => {
                            updateIdx(activeIdx - 1, ev);
                        }}
                    >
                        <ArrowBackIosNewIcon />
                    </span>
                    <span
                        onClick={(ev) => {
                            updateIdx(activeIdx + 1, ev);
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </span>
                </div>
                <div
                    className="inner"
                    style={{ transform: `translateX(-${activeIdx * 100}%)` }}
                >

                    {React.Children.map(children, (child, index) => {
                        return React.cloneElement(child, { width: "100%" });
                    })}
                </div>
            </div>
            <div className="carousel-btn-container">
                {React.Children.map(children, (child, index) => {
                    return (
                        <button
                            style={{ backgroundImage: isDetails ? `url(${child.props.imgUrl})` : '' }}
                            className={`${index === activeIdx ? "active" : ""}`}
                            onClick={(ev) => {
                                updateIdx(index, ev);
                            }}
                        >

                        </button>
                    );
                })}
            </div>

        </div>
    );
};

