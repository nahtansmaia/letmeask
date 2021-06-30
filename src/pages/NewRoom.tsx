import { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import imgHome from '../assets/images/illustration.svg';
import imgLogo from '../assets/images/logo.svg';
import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { useToastWarning, useToastSuccess } from '../hooks/useToast';

import { ThemeProvider, DefaultTheme } from 'styled-components';
import usePeristedState from '../hooks/usePersistedState'
import Switch from '../components/Switch';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import GlobalStyle from '../styles/global';


export function NewRoom() {
    const [theme, setTheme] = usePeristedState<DefaultTheme>('theme', light);
    const toggleTheme = () => {
        setTheme(theme.title === 'light' ? dark : light);
    };

    const { user } = useAuth();
    const [newRoow, setNewRoom] = useState('');
    const history = useHistory();
    let warningToast = useToastWarning;
    let successToast = useToastSuccess;

    async function handleCreateNewRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoow.trim() === '') {
            warningToast('Nome da sala inválido, verifique.');
            return;
        }

        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoow,
            authorId: user?.id
        })
        successToast('Sala criada com sucesso!');
        history.push(`/admin/rooms/${firebaseRoom.key}`);
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
                        <div className="account">
                            <div className="account-avatar">
                                <img src={user?.avatar} alt={user?.name} />
                            </div>
                            <div className="account-name">
                                <p>Seja bem-vindo!</p>
                                <strong>{user?.name}</strong>
                            </div>
                        </div>
                        <form onSubmit={handleCreateNewRoom}>
                            <h2>Criar uma nova sala</h2>
                            <input
                                type="text"
                                placeholder="Informe o nome da sala"
                                onChange={event => setNewRoom(event.target.value)}
                                value={newRoow} />
                            <Button type="submit">Criar Sala</Button>
                        </form>
                        <p>Deseja acessar uma sala já existente? <Link to="/">Clique aqui</Link></p>
                    </div>
                </main>
            </div>
        </ThemeProvider>
    )
}