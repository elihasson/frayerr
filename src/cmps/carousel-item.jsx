export const CarouselItem = ({ children, width, imgUrl }) => {
    return (
        <div className="carousel-item" style={{ width: width, backgroundImage: `url(${imgUrl})` }}>
            {children}
        </div>
    );
};