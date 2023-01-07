import React from 'react'
import { connect } from 'react-redux'

import {loadUsers, removeUser} from '../store/user.actions'


class _AdminApp extends React.Component {
    state = {}

    componentDidMount() {
        this.props.loadUsers()
    }

    

    render() {
        const { isLoading, users, removeUser, loadUsers } = this.props
        return <section className="admin">
                <button onClick={loadUsers}>Refresh Users</button>
                {isLoading && 'Loading...'}
                {users && <ul>

                    {users.map(user => (
                        <li key={user._id}>
                            <pre>{JSON.stringify(user, null, 2)}</pre>
                            <button
                                onClick={() => {
                                    removeUser(user._id)
                                }}
                            >
                                Remove {user.username}
                            </button>
                        </li>
                    ))}
                </ul>}
        </section>

    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.systemModule.isLoading,
        users: state.userModule.users
    }
}

const mapDispatchToProps = {
    loadUsers,
    removeUser
}


export const AdminApp = connect(mapStateToProps, mapDispatchToProps)(_AdminApp)