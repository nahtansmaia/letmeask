import styled from 'styled-components'

export const Container = styled.div`
&:before {
    content: '';
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: url('/illustration.svg') no-repeat;
    background-size: 100% 100%;
    z-index: -1;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem 1.6rem;

    svg {
        width: 7.8rem;
        z-index: -1;
    }

    button {
        margin-top: auto;
        margin-bottom: auto;
    }
}

main {

    .title-description {
        width: 100%;
        max-width: 871px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;

        h1, p {
            text-align: center;
        }

        h1 {
            line-height: 9rem;
            font-size: 9rem;
            font-weight: 800;
            background: transparent;
            color: linear;
            background: -webkit-linear-gradient(${props => props.theme.colors.primary}, var(--second));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        p {
            margin-top: 1.2rem;
            font-size: 1.3rem;
            color: ${props => props.theme.colors.text};
        }

        button {
            width: 100%;
            max-width: 20rem;
            height: 4rem;
            margin: 3.25rem auto;
            border-radius: 6rem;
            font-size: 1.3rem;
            font-weight: 400;
            background: -webkit-linear-gradient(${props => props.theme.colors.primary}, var(--second));
            color: white;
        }
    }
}`