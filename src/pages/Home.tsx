import { useHistory } from 'react-router-dom';

import imgHome from '../assets/images/illustration.svg';
import imgLogo from '../assets/images/logo.svg';
import imgLogoGoogle from '../assets/images/google-icon.svg';

import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    async function handleCreateRoom() {
        if (!user) {
           await signInWithGoogle();
        }
        history.push('/rooms/new');
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={imgHome} alt="Imagem Principal" />
                <strong>Crie sua sala Q&amp;A ao-vivo</strong>
                <p>Tire suas duvidas em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={imgLogo} alt="LetMeAsk" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={imgLogoGoogle} alt="Logo Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form >
                        <input
                            type="text"
                            placeholder="Informe o código da sala" />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}