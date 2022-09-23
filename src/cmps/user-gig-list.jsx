// import { UserGigPreview } from './user-gig-preview'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadGigs, setFilterUserId } from '../store/gig.actions'

export const UserGigList = ({ onRemoveGig, onUpdateGig }) => {

    const params = useParams()
    const dispatch = useDispatch()
    const [userId, setUserId] = useState('')
    const gigs = useSelector(state => state.gigModule.gigs)
    console.log('gigs:', gigs)

    useEffect(() => {
        const userIdFromParams = params.userId
        dispatch(setFilterUserId(userIdFromParams))
        dispatch(loadGigs())
        setUserId(userIdFromParams)
    }, [])

    // currently without plans and counts === 0
    function createData(gigImgUrl, gigTitle, gigImpressionCount, gigClickCount, gigOrderCount, gigCancellationCount, action) {
        return { gigImgUrl, gigTitle, gigImpressionCount, gigClickCount, gigOrderCount, gigCancellationCount, action }
    }

    let rows = []

    rows = gigs?.map((gig) => {
        const gigImgUrl = gig.imgUrls[0].imgUrl
        const gigTitle = gig.title
        const gigImpressionCount = 0
        const gigClickCount = 0
        const gigOrderCount = 0
        const gigCancellationCount = 0
        return createData(gigImgUrl, gigTitle, gigImpressionCount, gigClickCount, gigOrderCount, gigCancellationCount)
    })

    return (
        // <div className='gig-list main-layout'>
        //     <div>Here Are Some User gigs:</div>
        //     {console.log('gigs:', gigs)}
        //     {gigs.map(gig => <UserGigPreview key={gig._id} gig={gig}
        //         onRemoveGig={onRemoveGig}
        //         onUpdateGig={onUpdateGig}
        //     />)}
        // </div>
        <TableContainer component={Paper} className="user-gig-list">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Gig</TableCell>
                        {/* <TableCell align="left"></TableCell> */}
                        <TableCell align="left">Impressions</TableCell>
                        <TableCell align="left">Clicks</TableCell>
                        <TableCell align="left">Orders</TableCell>
                        <TableCell align="left">Cancellations</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.gigTitle}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <div>
                                    <img src={`${row.gigImgUrl}`} alt="No img Url" />
                                    <span>&nbsp;{row.gigTitle}</span>
                                </div>
                            </TableCell>
                            {/* <TableCell align="left"><img src={`${row.gigImgUrl}`} alt="No img Url" /></TableCell>
                            <TableCell align="left">{row.gigTitle}</TableCell> */}
                            <TableCell align="left">{row.gigImpressionCount}</TableCell>
                            <TableCell align="left">{row.gigClickCount}</TableCell>
                            <TableCell align="left">{row.gigOrderCount}</TableCell>
                            <TableCell align="left">{row.gigCancellationCount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}