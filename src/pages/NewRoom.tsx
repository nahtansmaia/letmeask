import { Link } from 'react-router-dom';
import imgHome from '../assets/images/illustration.svg';
import imgLogo from '../assets/images/logo.svg';
import '../styles/auth.scss'
import { Button } from '../components/Button';
//import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
    //const { user } = useAuth();

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
                    <form >
                        <h2>Criar uma nova sala</h2>
                        <input
                            type="text"
                            placeholder="Informe o nome da sala" />
                        <Button type="submit">Criar Sala</Button>
                    </form>
                    <p>Deseja acessar uma sala já existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}