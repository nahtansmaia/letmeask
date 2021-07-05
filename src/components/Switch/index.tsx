import React, { useContext } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import { shade } from 'polished';


interface Props {
  toggleTheme(): void;
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
  const { colors, title } = useContext(ThemeContext);

  return (
    <div>
      <Switch
        onChange={toggleTheme}
        checked={title === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={20}
        width={50}
        handleDiameter={25}
        onHandleColor={shade(0.05, colors.primary)}
        offHandleColor={shade(0.35, colors.secundary)}
        offColor={colors.primary}
        onColor={shade(0.35, colors.secundary)}
      />
    </div>
  );
};

export default Header;