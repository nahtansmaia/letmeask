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

import { useToastWarning, useToastSuccess } from '../hooks/useToast';

import { ThemeProvider, DefaultTheme } from 'styled-components';
import usePeristedState from '../hooks/usePersistedState'
import Switch from '../components/Switch';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import GlobalStyle from '../styles/global';



export function Home() {
    const [theme, setTheme] = usePeristedState<DefaultTheme>('theme', light);
    const toggleTheme = () => {
        setTheme(theme.title === 'light' ? dark : light);
    };


    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [RoomCode, setRoomCode] = useState('');
    let warningToast = useToastWarning;
    let successToast = useToastSuccess;

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (RoomCode.trim() === '') {
            warningToast('Nome da sala inválido, verifique');
            return;
        }

        const roomRef = await database.ref(`rooms/${RoomCode}`).get();

        if (!roomRef.exists()) {
            warningToast('Sala não encontrada.')
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room already closed.');
            warningToast('Esta sala já foi encerrada.')
            return;
        }

        successToast(`Bem-vindo a sala ${RoomCode}`);
        history.push(`/rooms/${RoomCode}`);
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <div id="page-auth">
                <aside>
                    <img src={imgHome} alt="Imagem Principal" />
                    <strong>Crie sua sala Q&amp;A ao-vivo</strong>
                    <p>Tire suas duvidas em tempo real</p>
                </aside>
                <main className="main-auth">
                    <div className="switch">
                        <Switch toggleTheme={toggleTheme} />
                    </div>
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
        </ThemeProvider>
    )
}