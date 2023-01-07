import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadUser } from '../store/user.actions'

export function _UserDetails({ user, loadUser }) {

  const params = useParams()

  useEffect(() => {
    loadUser(params.id)
  }, [])


  return (
    <section className="user-details">
      <h1>User Details</h1>
      {user && <div>
        <h3>
          {user.fullname}
        </h3>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>}
    </section>
  )
}



const mapStateToProps = state => {
  return {
    user: state.userModule.watchedUser
  }
}
const mapDispatchToProps = {
  loadUser
}

export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)