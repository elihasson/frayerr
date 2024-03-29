// import { UserGigPreview } from './user-gig-preview'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadGigs, setFilterUserId } from '../store/gig.actions'
import { setLoadingStart, setLoadingDone } from '../store/system.actions'
import { useNavigate } from 'react-router-dom'

export const UserGigList = ({ onRemoveGig, onUpdateGig }) => {

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    // const [userId, setUserId] = useState('')
    const gigs = useSelector(state => state.gigModule.gigs)
    const filterBy = useSelector(state => state.gigModule.filterBy)
    const isLoading = useSelector(state => state.systemModule.isLoading)
    // console.log('gigs:', gigs)
    // console.log('filterBy:', filterBy)

    // if(!gigs) dispatch(setLoadingStart())
    // if(gigs) dispatch(setLoadingDone())

    useEffect(() => {
        const userIdFromParams = params.userId
        console.log(`userIdFromParams: ${userIdFromParams}`)
        dispatch(setFilterUserId(userIdFromParams))
        dispatch(loadGigs())
        // console.log('gigs:', gigs)
        // console.log('filterBy:', filterBy)
        // setUserId(userIdFromParams)
        // console.log(`userId: ${userId}`)

        return dispatch(setFilterUserId(''))
    }, [])

    // currently without plans and counts === 0
    function createData(gigImgUrl, gigTitle, gigImpressionCount, gigClickCount, gigOrderCount, gigCancellationCount, gigId, action) {
        return { gigImgUrl, gigTitle, gigImpressionCount, gigClickCount, gigOrderCount, gigCancellationCount, gigId, action }
    }

    let rows = []

    rows = gigs?.map((gig) => {
        const gigImgUrl = gig.imgUrls[0].imgUrl
        const gigTitle = gig.title
        const gigImpressionCount = 0
        const gigClickCount = 0
        const gigOrderCount = 0
        const gigCancellationCount = 0
        const gigId = gig._id
        return createData(gigImgUrl, gigTitle, gigImpressionCount, gigClickCount, gigOrderCount, gigCancellationCount, gigId)
    })

    return (
        <TableContainer component={Paper} className="user-gig-list">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Gig</TableCell>
                        <TableCell align="left">Impressions</TableCell>
                        <TableCell align="left">Clicks</TableCell>
                        <TableCell align="left">Orders</TableCell>
                        <TableCell align="left">Cancellations</TableCell>
                        <TableCell align="left">Gig Operations</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.gigTitle}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Grid container>
                                    <Grid item lg={1}><Avatar src={`${row.gigImgUrl}`} alt="No img Url" variant="rounded" /></Grid>
                                    <Grid item lg={5}><Typography>{row.gigTitle}</Typography></Grid>
                                </Grid>
                            </TableCell>
                            <TableCell align="left">{row.gigImpressionCount}</TableCell>
                            <TableCell align="left">{row.gigClickCount}</TableCell>
                            <TableCell align="left">{row.gigOrderCount}</TableCell>
                            <TableCell align="left">{row.gigCancellationCount + '%'}</TableCell>
                            <TableCell align="left">
                                <button className="btn" onClick={() => navigate(`/edit/${row.gigId}`)}>Edit Gig</button>
                                <button onClick={onRemoveGig} className="btn-red">Delete Gig</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}