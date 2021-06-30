import { ReactNode } from "react";
import { Container } from "./styles";

type ModalProps = {
    children?: ReactNode;
    title?: string;
}


const Modal = ({
    title = "",
    children, }: ModalProps) => {

    return (
        <Container className="modal">
            <div className="container">
                <div className="content">
                    <header>
                        <h2 className="title">{title}</h2>
                    </header>
                    <footer>
                        {children}
                    </footer>
                </div>
            </div>
        </Container>
    )
}

export default Modal;