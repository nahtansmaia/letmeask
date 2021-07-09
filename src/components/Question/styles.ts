import styled from 'styled-components'

export const Container = styled.div`
    background: ${props => props.theme.colors.background};
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
    padding: 24px;

    & + .question {
        margin-top: 8px;
    }

    &.highlighted {
        background: ${props => props.theme.colors.backgroundTextarea};
        border: 1px solid ${props => props.theme.colors.primary};

        footer .user-info span {
            color: ${props => props.theme.colors.text};
        }
    }

    &.answered {
        background: ${props => props.theme.colors.background};
    }
 
    p {
        color: ${props => props.theme.colors.text};
        filter: brightness(0.8); 
    }

    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;

        .user-info {
            display: flex;
            align-items: center;

            img {
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }

            span {
                margin-left: 0px;
                color: ${props => props.theme.colors.text};
                filter: brightness(0.8); 
                font-size: 14px;
            }
        }

        > div {
            display: flex;
            gap: 10px;
        }

        .action-button {
            border: 0;
            background: transparent;
            cursor: pointer;
            transition: filter 0.2s;
            filter: brightness(0.7);
            
            svg path {
                stroke: ${props => props.theme.colors.text};
                filter: brightness(0.7);
            }
            svg circle {
                stroke: ${props => props.theme.colors.text};
                filter: brightness(0.7);
            }

            &.like-button {
                display: flex;
                align-items: flex-end;
                gap: 8px;
            }
            
            &.liked {
                filter: brightness(0.7);
                color: ${props => props.theme.colors.primary};
                svg path {
                    stroke: ${props => props.theme.colors.primary};
                }
                svg circle {
                    stroke: ${props => props.theme.colors.primary};
                }
            }

            &:hover {
                filter: brightness(0.2);
            }
        }
    }
    .answer {
        position: relative;
        min-height: 50px;
        resize: both;
        margin-top: 10px;

        > textarea {
            background: ${props => props.theme.colors.backgroundTextarea};
            filter: brightness(0.9);
            border-color:  ${props => props.theme.colors.primary};
            color: ${props => props.theme.colors.text};
            font-size: 12px;
            outline: none;
            width: 100%; 
            min-height: 50px; 
            resize: none;
            border-radius: 12px;
            padding: 5px;
            padding-right: 35px;
        }

        > textarea::placeholder {
            color: ${props => props.theme.colors.text};
            filter: brightness(0.8);
            font-size: 12px;
        }

        > button {
            position:absolute;
            border: none;
            height: 50px;
            width: 50px;
            background: transparent;
            text-align: center;
            padding: 2px;
            top: -25px;
            right: 5px;

            svg {
                path.send-svg {
                    fill: ${props => props.theme.colors.primary};
                }
            }
        }

        > button:hover {
            cursor: pointer;
        }
    }
`