import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';

import Modal from '../components/Modal/index';

import '../styles/room.scss';
import { database } from '../services/firebase';
import { useState } from 'react';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const [isModalDeleteQuestionVisible, setModalDeleteQuestionVisible] = useState(false);
  const [isModalEndRoomVisible, setModalEndRoomVisible] = useState(false);
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  function redirectUserToHome() {
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  };

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

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
    <div id="page-room">
      <header>
        <div className="content">
            <img src={logoImg} alt="LetMeAsk" onClick={redirectUserToHome}/>
          <div>
            <RoomCode code={roomId} />
            <Button onClick={() => setModalEndRoomVisible(true)} isOutlined>Encerrar sala</Button>
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
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      className="action-button"
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  className="action-button"
                  type="button"
                  onClick={() => setModalDeleteQuestionVisible(true)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
                {isModalDeleteQuestionVisible ? (
                  <Modal title="Deseja realmente excluir a pergunta?">
                    <Button onClick={() => handleDeleteQuestion(question.id)}>Excluir</Button>
                    <Button isOutlined onClick={() => setModalDeleteQuestionVisible(false)}>Cancelar</Button>
                  </Modal>
                ) : null}
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}

