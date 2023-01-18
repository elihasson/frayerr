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
        <div className="full trusted-by-container">
            <div className="trusted-by-content flex">
                <span>Trusted by:</span>
                <TrustedCompanies trustedCompanies={trustedCompanies}/>
            </div>
        </div>
    )
}