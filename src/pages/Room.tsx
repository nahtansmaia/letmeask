import { FormEvent, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import { useToastWarning, useToastError } from '../hooks/useToast';

import phoneIcon from '../assets/images/phone.png'
import { ThemeProvider, DefaultTheme } from 'styled-components';
import usePeristedState from '../hooks/usePersistedState'
import Switch from '../components/Switch/index';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import GlobalStyle from '../styles/global';
import { Container } from '../styles/room';

type RoomParams = {
  id: string;
};

export function Room() {
  const [theme, setTheme] = usePeristedState<DefaultTheme>('theme', dark);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('')
  const { title, questions } = useRoom(roomId);
  let warningToast = useToastWarning;
  let errorToast = useToastError;
  const recognitionStart = createRecognition();
  let listener = false;


  function redirectUserToAuth() {
    history.push('/auth');
  }
  
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      warningToast('Digite sua pergunta')
      return;
    }

    if (!user) {
      errorToast('Realize o login para continuar.');
      throw new Error('You must be logged in');
    }

    let d2 = new Date();

    const question = {
      content: newQuestion,
      dateSend: new Date(d2.valueOf() - d2.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16)
        .replace('T', ' ')
        .replace('Z', ''),
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  };

  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  };

  function createRecognition() {
    let win: any = window as any;
    const SpeechRecognition = window.SpeechRecognition || win.webkitSpeechRecognition;
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null;
    const text = document.getElementById("textarea");

    if (!recognition) {
      errorToast("Navegador ou permissão não suportada.");
      return null;
    }

    recognition.lang = "pt_BR";
    recognition.continuous = true;
    recognition.onstart = () => {
      console.log("start");
    };

    recognition.onend = () => {
      console.log("end");
    };
    recognition.onerror = (e) => {
      errorToast("Houve um erro ao iniciar o Speech.");
      console.error(e);
    };
    recognition.onresult = e => {
      if (text) {
        text.innerHTML = e.results[0][0].transcript;
      }
    }
    return recognition;
  }

  function listenerRecognition() {
    if (!recognitionStart) return;

    const text = document.getElementById("textarea")!;
    text.innerHTML = "";
    listener ? recognitionStart.stop() : recognitionStart.start();
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container id="page-room">
        <header>
          <div className="content">
            <div className="logo">
              <img src={logoImg} alt="LetMeAsk" onClick={redirectUserToAuth} />
            </div>
            <div className="body">
              <RoomCode code={roomId} />
              <Switch toggleTheme={toggleTheme} />
            </div>
          </div>
        </header>

        <main className="main-room">
          <div className="room-title">
            <h1>Sala {title}</h1>
            {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
          </div>
          <form onSubmit={handleSendQuestion}>
            <div className="buttonInside">
              <textarea id="textarea" className="textarea" placeholder="O que você quer perguntar?"
                onChange={event => setNewQuestion(event.target.value)}
                value={newQuestion} >
              </textarea>
              <button type="button" onClick={listenerRecognition}>
                <img src={phoneIcon} alt="phoneIcon" height="20" width="20" />
              </button>
            </div>
            <div className="form-footer">
              {user ? (
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>Para enviar uma pergunta,
                  <Link to="/">
                    faça seu login.
                  </Link>
                </span>
              )}
              <Button className="button buttonPrincipal" type="submit" disabled={!user}>Enviar pergunta</Button>
            </div>
          </form>
          <div className="question-list">
            {questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  dateSend={question.dateSend}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <button
                      className={`action-button like-button ${question.likeId ? 'liked' : ''}`}
                      type="button"
                      aria-label="Marcar como gostei"
                      onClick={() => handleLikeQuestion(question.id, question.likeId)}
                    >
                      {question.likeCount > 0 && <span>{question.likeCount}</span>}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </Question>
              );
            })}
          </div>
        </main>
      </Container>
    </ThemeProvider>
  );
}