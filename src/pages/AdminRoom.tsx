import { useParams } from 'react-router-dom'
// import { useState, FormEvent } from 'react';

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';

import '../styles/room.scss';
import { RoomCode } from '../components/RoomCode';
// import { useAuth } from '../hooks/useAuth';
// import { database } from '../services/firebase';

import { useRoom } from '../hooks/useRoom';


type RoomParams ={
    id: string
}



export function AdminRoom() {
    // const {user} = useAuth();
    const params = useParams<RoomParams>();

    const roomId = params.id;
    const {title, questions} = useRoom(roomId);    



    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <div>
                        <RoomCode code={params.id}/>
                        <Button isOutlined children="Encerrar sala"/>
                    </div>

                </div>
            </header>
            <main className="main-content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question =>{
                        return(
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                
                            
                            />
                        )
                    })}
                </div>
            </main>
        </div>
    );
}