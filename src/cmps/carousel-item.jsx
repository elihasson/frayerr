export const CarouselItem = ({ children, width, imgUrl }) => {
    // const itemStyle = { width: width, backgroundImage: `url(https://robohash.org/1})` }
    // const itemStyle = { width: width, backgroundImage: `url(${imgUrl})` }
    const image = imgUrl.imgUrl
    const itemStyle = { width: width, backgroundImage: `url(${image})` }

    //  const itemStyle = { width: width, backgroundImage: `url(` + require (`../assets/image/Pst_Brian.jpg`) + ')'}
    // const itemStyle = { width: width, backgroundImage: 'url(' + require ('../assets/images/' + image) + ')'}

    return (
        <div className="carousel-item" style={itemStyle} >
            {children}
        </div>
    );
};

