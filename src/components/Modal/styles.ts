import styled from 'styled-components'

export const Container = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
        background-color: ${props => props.theme.colors.background};
        width: 40%;
        height: 30%;
        color: var(--dark);
        border-radius: 8px;

        .content {
            padding: 25px;

            header {
                background: transparent;
                
                .title {
                    font-size: 20px;
                    text-align: center;
                    color: var(--first);
                }
            }
            footer {
                display: flex;
                justify-content: center;
                gap: 15px;
                height: 25px;

                button {
                    height: 35px;
                }
            }
        }
    }
`;