export const CarouselItem = ({ children, width, imgUrl }) => {
    const itemStyle = { width: width, backgroundImage: `url(https://robohash.org/1})` }
    // const itemStyle = { width: width, backgroundImage: `url(${imgUrl})`` }
    return (
        <div className="carousel-item" style={itemStyle} >
            {children}
        </div>
    );
};

