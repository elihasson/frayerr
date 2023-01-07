

export const UserGigPreview = ({ gig, onRemoveGig, onUpdateGig }) => {
    return (
        <div>
            {/* {gig && <pre>
                {JSON.stringify(gig, null, 2)}
            </pre>} */}
                {gig && 
                <div>
                    <div>{gig.title}</div>
                    <div>
                        <img src={`${gig.imgUrls[0].imgUrl}`} alt="No img Url"/>
                    </div>
                </div>
                }
        </div>
    )
}

