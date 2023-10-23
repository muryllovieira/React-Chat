import React, {useRef} from 'react'
import io from 'socket.io-client'

export default function Join({setChatVisibility, setSocket}) {

    const usernameRef = useRef()

    const handlerSubmit = async () => {
        const username = usernameRef.current.value
        if (!username.trim()) return
        const socket = await io.connect('http://localhost:8080')
        socket.emit('set_username', username)
        setSocket(socket)
        setChatVisibility(true)
    }

  return (
    <div>
        <h1>Join</h1>
        <input type="text" ref={usernameRef} placeholder='Nome de Usuario'/>
        <button onClick={()=> handlerSubmit()}>Entrar</button>
    </div>
  )
}
