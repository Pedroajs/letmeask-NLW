import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

// import { useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';


export function NewRoom(){
    const history = useHistory()
    const { user } = useAuth();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() === '') return;

        const roomRef = database.ref('rooms');
        const firebaseRooms = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        history.push(`/rooms/${firebaseRooms.key}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>

                
                <div className="main-content">
                    <img src={logo} alt="Logo da letmeask" />
                    <h2>Criar uma nova sala</h2>
                    
                    <form onSubmit={handleCreateRoom}>
                        <input 
                        type="text" 
                        placeholder="digite o código da sala"

                        onChange={event=> setNewRoom(event.target.value)}
                        value={newRoom}

                        />
                        <Button type="submit">
                             Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique qui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}