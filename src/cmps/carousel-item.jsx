export const CarouselItem = ({ children, width, imgUrl }) => {
    // const itemStyle = { width: width, backgroundImage: `url(https://robohash.org/1})` }
    let image =  imgUrl.imgUrl
   
    const itemStyle = { width: width, backgroundImage: 'url(' + require ('../assets/images/' + image) + ')'}

    console.log(itemStyle)
    return (
        <div className="carousel-item" style={itemStyle} >
            {children}
        </div>
    );
};

