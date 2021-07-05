import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.colors.background};
    font-size: 14px;
    color: ${props => props.theme.colors.text};
    font-family: sans-serif;
  }

  body, input, button, textarea, span {
    font: 400 16px 'Roboto', sans-serif;
  }

  textarea {
    width: 100%;
    border: 0;
    padding: 16px;
    border-radius: 8px;
    background: ${props => props.theme.colors.backgroundTextarea};
    color: ${props => props.theme.colors.text};
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    resize: vertical;
    min-height: 130px;
  }

  textarea::placeholder {
      color: ${props => props.theme.colors.text};
      filter: brightness(85%);
  }

  p {
    color: ${props => props.theme.colors.text};
    font-size: 14px;
    margin-top: 16px;
  }
  
  .button {
    height: 58px;
    border-radius: 8px;
    font-weight: 500;
    background: var(--first);
    color: var(--light);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;
    transition: filter 0.2s;
    padding: 0 32px;

    img {
        margin-right: 8px;
    }
    
    &.outlined {
        background: transparent;
        border: 1px solid var(--first);
        color: var(--first);
    }

    &:not(:disabled):hover {
        filter: brightness(0.9);
    }
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
  }
}
`;