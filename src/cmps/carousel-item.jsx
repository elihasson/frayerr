export const CarouselItem = ({ children, width, imgUrl }) => {
    // debugger
    // const itemStyle = { width: width, backgroundImage: `url(https://robohash.org/1})` }
    // const itemStyle = { width: width, backgroundImage: `url(${imgUrl})` }
    const image =  imgUrl.imgUrl
    const itemStyle = { width: width, backgroundImage: `url(${image})` }

    //  const itemStyle = { width: width, backgroundImage: `url(` + require (`../assets/image/Pst_Brian.jpg`) + ')'}
    // <img src={require('../images/' + fileNameExt)} />

    console.log('Hello123 ',image)
    // debugger this
    // const itemStyle = { width: width, backgroundImage: 'url(' + require ('../assets/' + image) + ')'}

    // const itemStyle = { width: width, backgroundImage:  `url('' + image})`}
    // `url(${templateStringForImage})`
    console.log(itemStyle)
    // debugger
    return (
        <div className="carousel-item" style={itemStyle} >
            {children}
        </div>
    );
};

