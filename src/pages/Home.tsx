import { useHistory } from 'react-router-dom';

import { Container } from '../styles/home'
import GlobalStyle from '../styles/global';
import dark from '../styles/themes/dark';
import usePeristedState from '../hooks/usePersistedState';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import logo from '../assets/images/logo.svg';
import { Button } from '../components/Button';

export function Home() {
    const [theme, setTheme] = usePeristedState<DefaultTheme>('theme', dark);
    const history = useHistory();

    async function handleAuth() {
        history.push('/auth');
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Container>
                <div>
                    <header>
                        <img src={logo} alt="Logo" />
                        <Button onClick={handleAuth} isOutlined>Login</Button>
                    </header>
                    <main>
                        <div className="title-description">
                            <h1>
                                Crie salas <br /> de Q&A
                            </h1>
                            <p>Tire suas duvidas em tempo real!</p>
                            <Button onClick={handleAuth}>Criar agora</Button>
                        </div>
                    </main>
                </div>
            </Container>
        </ThemeProvider>

    )
}