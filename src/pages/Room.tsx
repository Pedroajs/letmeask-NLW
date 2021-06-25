import { useParams } from 'react-router-dom'
import { useState, FormEvent } from 'react';

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';

import '../styles/room.scss';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

type RoomParams ={
    id: string
}


export function Room() {
    const {user} = useAuth();
    const [newQuestion, setNewQuestion] = useState('')
    const params = useParams<RoomParams>();
    const roomId = params.id;

    async function handleSendQuestion(event: FormEvent){
        event.preventDefault();

        if(newQuestion.trim() === '') return;
        if(!user) throw new Error('Yoou must be logged in');


        const question = {
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar,
                id: user?.id
            },
            isHighLighted: false,
            isAswered: false
        }
        await database.ref(`/rooms/${roomId}/questions`).push(question)


        setNewQuestion('');
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <RoomCode code={params.id}/>
                </div>
            </header>
            <main className="main-content">
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>5 perguntas</span>
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="O que você quer perguntar?"
                        onChange={event=> setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        {
                            user ? (
                                <div className="user-info">
                                    <img src={user.avatar} alt={user.name} />
                                    <span>{user.name}</span>
                                </div>
                            ) : (
                                <span>Para enviar uma pergunta <button>faça seu login</button></span>
                            ) 
                        }
                        <Button type="submit" disabled={!user} children="Enviar pergunta" />
                    </div>
                </form>
            </main>
        </div>
    );
}