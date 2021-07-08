import styled from 'styled-components'

export const Container = styled.div`
{
    padding-bottom: 32px;

    header {
        background: ${props => props.theme.colors.background};
        filter: brightness(0.91); 
        padding: 24px;
        border-bottom: 1px solid var(--lighter);
        
        .content {
            max-width: 1120px;
            display: flex;
            align-items: stretch;
            
            .logo {
                flex: 2;
                display: flex;
                flex-direction: column;
                justify-content: center;
                
                svg {
                    width: 7.8rem;
                    cursor: pointer;
                }
            }
            .body {
                flex: 8;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 15px;

                button {
                    margin-top: 0px;
                    height: 35px;
                    background: ${props => props.theme.colors.background}
                }

                .switch {
                    position: absolute;
                    top: 50px;
                    right: 15px;
                }
            }
        }
    }
    button {
        margin-top: 25px;
    }
    .main-room {
        max-width: 800px;
        margin: 0 auto;

        .room-title {
            margin: 32px 0 24px;
            display: flex;
            align-items: center;
            
            h1 {
                font-family: "Poppins", sans-serif;
                font-size: 24px;
                color: ${props => props.theme.colors.text};
            }            
            span {
                margin-left: 16px;
                background: var(--second);
                border-radius: 9999px;
                padding: 8px 16px;
                color: var(--light);
                font-weight: 500;
                font-size: 14px;
            }
        }

        .no-questions {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 15px;

            .text-no-questions {
                margin-top: 20px;

                p {
                    text-align: center;
                    a {
                        color: ${props => props.theme.colors.text};
                        text-decoration: none;
                        font-weight:bold;
                    }
                }
            }
        }
        form {
            .form-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;

                button {
                    margin-top: 0px;
                    height: 35px;
                }

                .user-info {
                    display: flex;
                    align-items: center;

                    img {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                    }

                    span {
                        margin-left: 8px;
                        color: ${props => props.theme.colors.text};
                        font-weight: 500;
                        font-size: 16px;
                    }
                }

                > span {
                    font-size: 14px;
                    color: ${props => props.theme.colors.text};
                    font-weight: 500;

                    button {
                        background: transparent;
                        border: 0;
                        color: var(--first);
                        text-decoration: underline;
                        font-size: 14px;
                        font-weight: 500;
                        cursor: pointer;
                        padding-left: 3px;
                    }
                }
            }

            .buttonInside {
                position:relative;
                margin-bottom:10px;

                > button {
                    position:absolute;
                    right: 10px;
                    bottom: 10px;
                    border: none;
                    height: 30px;
                    width: 30px;
                    border-radius: 100%;
                    background: transparent;
                    text-align: center;
                    padding: 2px;
                  }
                > button:hover {
                    cursor: pointer;
                }
              }
        }
        .question-list {
            margin-top: 32px;
        }
    }
}
`;