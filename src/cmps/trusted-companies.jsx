import { TrustedCompanyPreview } from './trusted-company-Preview.jsx'

export const TrustedCompanies = ({ trustedCompanies }) => {
    return (
        <div className='trusted-companies'>
            {trustedCompanies.map(trustedCompany => <TrustedCompanyPreview key={trustedCompany.imgSrc} trustedCompany={trustedCompany}
            />)}
        </div>
    )
}