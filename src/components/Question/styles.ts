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
`