import { useHistory } from 'react-router-dom';
import { FormEvent } from 'react';

import imgHome from '../assets/images/illustration.svg';
import imgLogo from '../assets/images/logo.svg';
import imgLogoGoogle from '../assets/images/google-icon.svg';

import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { database } from '../services/firebase';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [RoomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (RoomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${RoomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${RoomCode}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={imgHome} alt="Imagem Principal" />
                <strong>Crie sua sala Q&amp;A ao-vivo</strong>
                <p>Tire suas duvidas em tempo real</p>
            </aside>
            <main className="main-auth">
                <div className="main-content">
                    <img src={imgLogo} alt="LetMeAsk" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={imgLogoGoogle} alt="Logo Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Informe o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={RoomCode} />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}