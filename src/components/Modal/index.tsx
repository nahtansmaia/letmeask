import { ReactNode } from "react";
import { Button } from "../Button";
import './styles.scss';

type ModalProps = {
    children?: ReactNode;
    title?: string;
}


const Modal = ({
    title = "",
    children }: ModalProps) => {

    return (
        <div className="modal">
            <div className="container">
                <div className="content">
                    <header>
                        <h2 className="title">{title}</h2>
                    </header>
                    <footer>
                        <Button></Button>
                        <Button></Button>
                        {children}
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Modal;