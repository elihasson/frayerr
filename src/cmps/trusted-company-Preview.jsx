export const TrustedCompanyPreview = ({ trustedCompany }) => {

    return (
        <div className='trusted-company-preview'>
            <img src={`${require(`../assets/img/company-logo-${trustedCompany.imgSrc}`)}`}/>
        </div>
    )
}