export const CarouselItem = ({ children, width, imgUrl }) => {
    const image = imgUrl.imgUrl
    const itemStyle = { width: width, backgroundImage: `url(${image})` }

    return (
        <div className="carousel-item" style={itemStyle} >
            {children}
        </div>
    );
};

