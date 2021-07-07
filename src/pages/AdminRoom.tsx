import { Link, useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';

import Modal from '../components/Modal/index';

import { database } from '../services/firebase';
import { useState } from 'react';

import { useToastSuccess } from '../hooks/useToast';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import usePeristedState from '../hooks/usePersistedState'
import Switch from '../components/Switch';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import GlobalStyle from '../styles/global';
import { Container } from '../styles/room';


type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const [theme, setTheme] = usePeristedState<DefaultTheme>('theme', dark);
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  const history = useHistory();
  const params = useParams<RoomParams>();
  const [isModalDeleteQuestionVisible, setModalDeleteQuestionVisible] = useState({ visible: false, idQuestion: '' });
  const [isModalEndRoomVisible, setModalEndRoomVisible] = useState(false);
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);
  let successToast = useToastSuccess;

  function redirectUserToAuth() {
    console.log(roomId);
    history.push('/auth');
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    successToast('Pergunta excluída com sucesso!');
    setModalDeleteQuestionVisible({...isModalDeleteQuestionVisible, visible: false, idQuestion: questionId});
  };

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    successToast('Sala encerrada com sucesso!');
    history.push('/');
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
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
              <Button onClick={() => setModalEndRoomVisible(true)} isOutlined>Encerrar sala</Button>
              <Switch toggleTheme={toggleTheme} />
            </div>
          </div>
        </header>
        {isModalEndRoomVisible ? (
          <Modal title="Deseja encerrar a sala?">
            <Button onClick={handleEndRoom}>Encerrar</Button>
            <Button isOutlined onClick={() => setModalEndRoomVisible(false)}>Cancelar</Button>
          </Modal>
        ) : null}

        <main className="main-room">
          <div className="room-title">
            <h1>Sala {title}</h1>
            {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
          </div>
          {questions.length === 0 ? (
            <div className="no-questions">
              <div className="icon-no-questions">
                <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle opacity="0.1" cx="75" cy="75" r="75" fill="#835AFD" />
                  <path d="M9 29.7229V62.7836V65.145C9 67.7534 11.1145 69.868 13.7229 69.868H44.4221L57.0363 81.5118C57.883 82.2934 59.2331 81.5235 58.9917 80.3968L56.2295 67.5065H64.4946C67.103 67.5065 69.2175 65.392 69.2175 62.7836V29.7229C69.2175 27.1145 67.103 25 64.4946 25H13.7229C11.1145 25 9 27.1145 9 29.7229Z" fill="#835AFD" />
                  <path d="M149.218 57.7229V90.7836V93.145C149.218 95.7534 147.103 97.868 144.495 97.868H113.795L101.181 109.512C100.335 110.293 98.9844 109.524 99.2259 108.397L101.988 95.5065H93.7229C91.1145 95.5065 89 93.392 89 90.7836V57.7229C89 55.1145 91.1145 53 93.7229 53H144.495C147.103 53 149.218 55.1145 149.218 57.7229Z" fill="#E559F9" />
                  <path d="M42 101.41V118.281V119.486C42 120.817 43.0886 121.896 44.4314 121.896H60.2353L66.7291 127.838C67.1649 128.237 67.86 127.844 67.7357 127.269L66.3137 120.691H70.5686C71.9114 120.691 73 119.612 73 118.281V101.41C73 100.079 71.9114 99 70.5686 99H44.4314C43.0886 99 42 100.079 42 101.41Z" fill="#D67EE2" />
                  <circle cx="25.5" cy="46.5" r="3.5" fill="#FEFEFE" />
                  <circle cx="38.5" cy="46.5" r="3.5" fill="#FEFEFE" />
                  <circle cx="51.5" cy="46.5" r="3.5" fill="#FEFEFE" />
                </svg>
              </div>
              <div className="text-no-questions">
                <h2>Não há nenhuma pergunta nesta sala.</h2>
                <p>Deseja realizar uma pergunta? <Link to={`/rooms/${roomId}`}>Clique aqui.</Link></p>
              </div>
            </div>
          ) : (
            <div className="question-list">
              {questions.map(question => {
                return (
                  <Question
                    key={question.id}
                    content={question.content}
                    author={question.author}
                    isAnswered={question.isAnswered}
                    isHighlighted={question.isHighlighted}
                  >
                    {!question.isAnswered && (
                      <>
                        <button
                          type="button"
                          className="action-button"
                          onClick={() => handleCheckQuestionAsAnswered(question.id)}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </button>
                        {!question.isHighlighted && (
                          <button
                            className="action-button"
                            type="button"
                            onClick={() => handleHighlightQuestion(question.id)}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </button>
                        )}
                      </>
                    )}
                    <button
                      className="action-button"
                      type="button"
                      onClick={() => setModalDeleteQuestionVisible({...isModalDeleteQuestionVisible, visible: true, idQuestion: question.id})}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5.99988H5H21" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>
                    {isModalDeleteQuestionVisible.visible ? (
                      <Modal title="Deseja realmente excluir a pergunta?" childrenSVG="delete" id={isModalDeleteQuestionVisible.idQuestion}>
                        <Button onClick={() => handleDeleteQuestion(isModalDeleteQuestionVisible.idQuestion)}>Excluir</Button>
                        <Button isOutlined onClick={() => setModalDeleteQuestionVisible({...isModalDeleteQuestionVisible, visible: false, idQuestion: isModalDeleteQuestionVisible.idQuestion})}>Cancelar</Button>
                      </Modal>
                    ) : null}
                  </Question>
                );
              })}
            </div>
          )}
        </main>
      </Container>
    </ThemeProvider>
  );
}

