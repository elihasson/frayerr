import { useSelector, useDispatch } from 'react-redux'
import { toggleJoinModal } from '../store/system.actions'

export const HomeSignup = () => {
    const user = useSelector(state => state.userModule.user)
    const dispatch = useDispatch()

    return (
        !user &&
        <section className="home-signup-container main-layout">
            <div className="home-signup-content">
                <h2>Find the <i>talent</i> needed to get your business <i>growing.</i></h2>
                <button className="btn" onClick={() => { dispatch(toggleJoinModal()) }}>Get Started</button>
            </div>
        </section>
    )
}