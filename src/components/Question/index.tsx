import { ReactNode } from 'react';
import cx from 'classnames';
import './styles';
import { Container } from './styles';

type QuestionProps = {
    content: string;
    dateSend: Date;
    author?: {
        name?: string;
        avatar?: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
    handleSendAnswer?: () => Promise<void>;
    answer?: string;
};

export function Question({
    content,
    dateSend,
    author,
    isAnswered = false,
    isHighlighted = false,
    handleSendAnswer,
    answer,
    children,
}: QuestionProps) {
    return (
        <Container
            className={cx(
                'question',
                { answered: isAnswered },
                { highlighted: isHighlighted && !isAnswered }
            )}>
            <p dangerouslySetInnerHTML={{ __html: content }}></p>
            <footer>
                <div className="user-info">
                    <img src={author?.avatar} alt={author?.name} />
                    <span>{author?.name} <text style={{ fontSize: 10, marginLeft: "5px" }}>{dateSend}</text></span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
            <div className="answer">
                <textarea placeholder="Escreva sua resposta" value={answer} autoFocus={false}></textarea>
                <button type="button" className="answer-button" onClick={handleSendAnswer}>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="25px" width="20px"
                        viewBox="0 0 495.003 495.003">
                        <g id="XMLID_51_">
                            <path className="send-svg" id="XMLID_53_" d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616 l-67.6-32.22V456.687z" />
                            <path className="send-svg" id="XMLID_52_" d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422 c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414 l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956 L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z" />
                        </g>
                    </svg>
                </button>
            </div>
        </Container >
    );
}