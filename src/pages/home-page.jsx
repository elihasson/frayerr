import React from 'react'
import { connect } from 'react-redux'
import { AppHero } from '../cmps/app-hero'

class _HomePage extends React.Component {
    state = {}

    render() {
        return (
            <section className='home-container full'>
                <div className='home-page'>
                    <AppHero />
                </div>
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        
    }
}

export const HomePage = connect(mapStateToProps)(_HomePage)