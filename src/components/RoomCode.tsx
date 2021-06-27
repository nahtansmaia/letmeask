/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    function copyRoomCode() {
        navigator.clipboard.writeText(props.code);
    }

    return (
        <button className="room-code" onClick={copyRoomCode}>
            <a
                href="javascript:void(0)"
                role="tooltip"
                aria-label="Copiado!" >

                <img src={copyImg} alt="Copy room code" />
            </a>
            <span>Sala {props.code}</span>
        </button>
    );
}