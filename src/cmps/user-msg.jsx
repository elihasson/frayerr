import React from 'react'

import { eventBusService } from '../services/event-bus.service.js'
import { Alert } from '@mui/material'

export class UserMsg extends React.Component {

  removeEvent

  state = {
    msg: null
  }

  componentDidMount() {
    // Here we listen to the event that we emited, its important to remove the listener 
    this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
      this.setState({ msg })
      setTimeout(() => {
        this.setState({ msg: null })
      }, 2500)
    })
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  render() {
    if (!this.state.msg) return <span></span>
    const msgClass = this.state.msg.type || ''
    if (msgClass === 'thanks') return (
      <Alert variant="outlined" severity="success" className={'user-msg ' + msgClass}>
        {this.state.msg.txt}</Alert>)

    if (msgClass === 'incoming-order') return (
      <Alert variant="outlined" severity="success" className={'user-msg ' + msgClass}>
        {this.state.msg.txt}</Alert>)

    return (
      <section className={'user-msg ' + msgClass}>
        <button onClick={() => {
          this.setState({ msg: null })
        }}>x</button>
        {this.state.msg.txt}
      </section>
    )
  }
}