import { TrustedCompanies } from './trusted-companies'

export const HomeTrustedBy = () => {
    const trustedCompanies = [
        {
            imgSrc: '1.png'
        },
        {
            imgSrc: '2.png'
        },
        {
            imgSrc: '3.png'
        },
        {
            imgSrc: '4.png'
        },
        {
            imgSrc: '5.png'
        }
    ]
    return (
        <div className='main-layout trusted-by-container'>
            <div className='trusted-by-txt-container'>
                <span>Trusted By:</span>
            </div>
            <TrustedCompanies trustedCompanies={trustedCompanies}/>
        </div>
    )
}