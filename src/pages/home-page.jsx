import React from 'react'
import { connect } from 'react-redux'
import { AppHero } from '../cmp/AppHero'
// import { GigFilter } from '../cmps/gig-filter'


class _HomePage extends React.Component {
    state = {}

    changeCount = (diff) => {
        console.log('Changing count by:', diff);
        const action = { type: 'CHANGE_COUNT', diff }
        this.props.dispatch(action)
    }

    render() {
        // const { count } = this.props
        return (
            <section className='home-container'>
                <div className='home-page'>
                    <AppHero />
                    {/* <GigFilter /> */}
                </div>
                {/* <h2>
                    Count {count}
                    <button onClick={() => {
                        this.changeCount(1)
                    }}>+</button>
                    <button onClick={() => {
                        this.changeCount(10)
                    }}>+10</button>
                </h2 > */}
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        count: state.userModule.count
    }
}

export const HomePage = connect(mapStateToProps)(_HomePage)