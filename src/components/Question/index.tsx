import { ReactNode } from 'react';
import cx from 'classnames';
import './styles';
import { Container } from './styles';

type QuestionProps = {
    content: string;
    dateSend: Date;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
};

export function Question({
    content,
    dateSend,
    author,
    isAnswered = false,
    isHighlighted = false,
    children,
}: QuestionProps) {
    return (
        <Container
            className={cx(
                'question',
                { answered: isAnswered },
                { highlighted: isHighlighted && !isAnswered }
            )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name} <text style={{ fontSize: 10, marginLeft: "5px" }}>{dateSend}</text></span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </Container >
    );
}