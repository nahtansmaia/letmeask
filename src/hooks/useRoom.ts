import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type QuestionType = {
    id: string,
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    dateSend: Date;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
};

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    dateSend: Date;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string,
    }>;
}>;

export function useRoom(roomId: String) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    dateSend: value.dateSend,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            }).sort((x, y) => Number(y.isHighlighted) - Number(x.isHighlighted));
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });
        return () => {
            roomRef.off('value');
        };
    }, [roomId, user?.id]);

    return { questions, title };
}