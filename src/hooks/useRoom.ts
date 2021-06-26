import { useEffect, useState } from "react";
import {database} from '../services/firebase'
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
    author:{
        name:string,
        avatar:string
    },
    content: string,
    isHighLighted: boolean,
    isAswered: boolean,
    likes: Record<string, {
        authorId: string
    }>
}> 

type QuestionType = {
    id: string,
    author:{
        name:string,
        avatar:string
    },
    content: string,
    isHighLighted: boolean,
    isAswered: boolean,
    likeCount: number,
    likeId: string | undefined
}

export function useRoom(roomId: string){
    const {user} = useAuth();
    const [questions, setQuestons] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('');



    useEffect(()=>{
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {

            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions  ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value]) => {
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAswered: value.isAswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
                }
            });
            setTitle(databaseRoom.title);
            setQuestons(parsedQuestions);
        });

        return () => roomRef.off('value');
    }, [roomId, user?.id]);

    return {questions, title}
}
