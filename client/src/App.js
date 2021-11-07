import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'
import './App.css';

const socket = io('http://localhost:5000')

function App() {
  const [message, setMessage] = useState('')
  const [receivedMessage, setReceivedMessage] = useState([])

  const sendMessage = (e) => {
    console.log(message)
    e.preventDefault()
    socket.emit('message', {message})
    setMessage('')
  }

  useEffect(() => {
    socket.on('message', payload => {
      setReceivedMessage([...receivedMessage, payload])
    })
  })

  return (
    <div className="App">
      <h1>Chat App</h1>
      <form onSubmit={sendMessage}>
        <input type="text" name="message" 
        placeholder='Type Message...'
        value={message}
        onChange={e => setMessage(e.target.value)}
        ></input>
        <button type="submit">Send</button>
      </form>
      {receivedMessage.map((payload, index) => {
        return (
          <h2>{payload.message}</h2>
        )
      })}
    </div>
  );
}

export default App;
