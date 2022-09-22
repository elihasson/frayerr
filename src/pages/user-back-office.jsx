import { useNavigate } from 'react-router-dom'

export const UserBackOffice = (props) => {
    const navigate = useNavigate()

    return (
        <section>
            <button className="btn" onClick={() => navigate(`/edit`)}>create gig</button>
            <div>hello form back office</div>
        </section>
    )
}