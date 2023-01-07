import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

export const HomePageInfo = () => {

    return (
        <section className='home-page-info'>
            {/* must use main layout instead of layout padding and design different */}
            <div className="container max-width-container equal-padding">
                <div className="left-side-container">
                    <h2>
                        A whole world of freelance talent at your fingertips
                    </h2>

                    <div className="paragraph">
                        <div className="title">
                            <span><CheckCircleOutlineIcon /></span>
                            <h3>
                                The best for every budget
                            </h3>
                        </div>
                        <span className='desc'>
                            Find high-quality services at every price point. No hourly rates, just project-based pricing.
                        </span>
                    </div>
                    <div className="paragraph">
                        <div className="title">
                            <span><CheckCircleOutlineIcon /></span>
                            <h3> Quality work done quickly </h3>
                        </div>
                        <span className='desc'>
                            Find the right freelancer to begin working on your project within minutes.
                        </span>
                    </div>
                    <div className="paragraph">
                        <div className="title">
                            <span><CheckCircleOutlineIcon /></span>
                            <h3>
                                Protected payments, every time
                            </h3>
                        </div>
                        <span className='desc'>
                            Always know what you'll pay upfront. Your payment isn't released until you approve the work.
                        </span>
                    </div>
                    <div className="paragraph">
                        <div className="title">
                            <span><CheckCircleOutlineIcon /></span>
                            <h3>
                                24/7 support
                            </h3>
                        </div>
                        <span className='desc'>
                            Questions? Our round-the-clock support team is available to help anytime, anywhere.
                        </span>
                    </div>
                </div>
                <div className="right-side-container">
                    <div className="img-container">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png" alt="image" />
                    </div>
                </div>
            </div>
        </section>
    )
}