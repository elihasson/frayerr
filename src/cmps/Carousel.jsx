import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export function Carousel({ gig, onGoToDetails, isDetails, children }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isArrows, setArrows] = useState(false);

    const updateIndex = (newIndex, ev) => {
        ev.stopPropagation()
        if (newIndex < 0) {
            newIndex = React.Children.count(children) - 1;
        } else if (newIndex >= React.Children.count(children)) {
            newIndex = 0;
        }

        setActiveIndex(newIndex);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => updateIndex(activeIndex + 1),
        onSwipedRight: () => updateIndex(activeIndex - 1)
    });
    return (
        <div
            {...handlers}
            className="carousel"
            onMouseEnter={() => setArrows(true)}
            onMouseLeave={() => setArrows(false)}
            onClick={() => {
                if (onGoToDetails) onGoToDetails(gig._id)
            }}
        >
            <div className="inner-wrapper">
                <div className={isArrows ? 'indicators show' : 'indicators'}>
                    <span
                        onClick={(ev) => {
                            updateIndex(activeIndex - 1, ev);
                        }}
                    >
                        <ArrowBackIosNewIcon />
                    </span>
                    <span
                        onClick={(ev) => {
                            updateIndex(activeIndex + 1, ev);
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </span>
                </div>
                <div
                    className="inner"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
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
                            className={`${index === activeIndex ? "active" : ""}`}
                            onClick={(ev) => {
                                updateIndex(index, ev);
                            }}
                        >

                        </button>
                    );
                })}
            </div>

        </div>
    );
};

