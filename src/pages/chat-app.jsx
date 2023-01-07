import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { socketService,  SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC} from '../services/socket.service'

function _ChatApp({ loggedInUser }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState('Love')
    const [isBotMode, setIsBotMode] = useState(false)
    let botTimeout

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg);
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            botTimeout && clearTimeout(botTimeout)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    const addMsg = (newMsg) => {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    const sendBotResponse = () => {
        // Handle case: send single bot response (debounce).
        botTimeout && clearTimeout(botTimeout)
        botTimeout = setTimeout(() => {
            setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }]))
        }, 1500)
    }

    const sendMsg = ev => {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        socketService.emit(SOCKET_EMIT_SEND_MSG, { from, txt: msg.txt })
        if (isBotMode) sendBotResponse();
        setMsg({ txt: '' })
    }


    const handleFormChange = ev => {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    
    return (
        <section className="chat-app">
            <h2>Lets Chat about {topic}</h2>

            <label>
                <input type="checkbox" name="isBotMode" checked={isBotMode}
                    onChange={({target})=>setIsBotMode(target.checked)} />
                Bot Mode
            </label>

            <div>
                <label>
                    <input type="radio" name="topic" value="Love"
                        checked={topic === 'Love'} onChange={({target})=>setTopic(target.value)} />
                    Love
                </label>

                <label>
                    <input
                        type="radio" name="topic" value="Politics"
                        checked={topic === 'Politics'} onChange={({target})=>setTopic(target.value)} />
                    Politics
                </label>

            </div>

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>

            <ul>
                {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
            </ul>

        </section>
    )
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.user
    }
}
const mapDispatchToProps = {
}

export const ChatApp = connect(mapStateToProps, mapDispatchToProps)(_ChatApp)
