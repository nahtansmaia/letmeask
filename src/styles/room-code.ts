import styled from 'styled-components'

export const Container = styled.button`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;

  background: ${props => props.theme.colors.background};
  border: 1px solid var(--first);
  display: flex;

  span {
      display: block;
      color: ${props => props.theme.colors.text};
      align-self: center;
      flex: 1;
      padding: 0 16px 0 12px;
      width: 240px;
      font-size: 14px;
      font-weight: 500;
  }

  a {
      height: 100%;

      img {
          height: 100%;
          width: 100%;
          background: var(--first);
          padding: 0 12px;
          display: flex;
          justify-content: center;
          align-content: center;    
          cursor: pointer;
      }

      &:active::after {
          opacity: 1;
          transition: all 0.8s ease;
          -webkit-transition: all 0.8s ease;
      }

      &::after {
          min-width: 100px;
          font-size: 8px;
          opacity: 0;
          pointer-events: none;
          content: attr(aria-label);
          background: var(--dark);
          border-radius: 8px;
          padding: 3px 4px;
          position: absolute;
          margin-top: 5px;
          text-decoration: none;
          color: var(--light);
          transition: all 0.2s ease;
          -webkit-transition: all 0.2s ease;
        }
    }
}
  `;