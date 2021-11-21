import { useEffect, useRef, useState } from 'react';
import { useThemeContext } from 'contexts/theme/ThemeContext';
import { toElement as scrollToElement } from 'utils/scroll';
import { Dice } from '@styled-icons/ionicons-solid/Dice';
import {
  StyledNav,
  NavMenu,
  NavMenuItem,
  ThemeWand,
  ThemeWandContent,
} from './styledNavComponents';

const Nav = () => {
  const theme = useThemeContext();
  const {
    currentTheme: { colorPrimary, bgPrimary, navAlpha },
    switchTheme,
  } = theme;

  const [isSticky, setIsSticky] = useState(false);
  const [goingUp, setGoingUp] = useState(false);

  const prevScrollY = useRef(0);
  const nav = useRef<HTMLInputElement>();

  const stickyStyles = isSticky
    ? { backgroundColor: navAlpha, color: colorPrimary }
    : { backgroundColor: bgPrimary, color: colorPrimary };

  const scrollToPage = (pageSelector: string) => {
    const nextPage = document.querySelector(pageSelector);
    scrollToElement(nextPage);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }
      const domRect = nav.current && nav.current.getBoundingClientRect();

      if (domRect && currentScrollY > domRect.height) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [goingUp, nav]);

  return (
    <StyledNav ref={nav} style={stickyStyles}>
      <ThemeWand onClick={switchTheme}>
        <Dice size="25" />
        <ThemeWandContent>Recolor</ThemeWandContent>
      </ThemeWand>

      <NavMenu>
        <NavMenuItem
          styledBorder={colorPrimary}
          onClick={(e) => scrollToPage('.intro-wrapper')}
        >
          Home
        </NavMenuItem>

        {/* <NavMenuItem
                    styledBorder={colorPrimary}
                    onClick={(e) => scrollToPage('.about-wrapper')}
                >About</NavMenuItem> */}

        <NavMenuItem
          styledBorder={colorPrimary}
          onClick={(e) => scrollToPage('.portfolio-page')}
        >
          Portfolio
        </NavMenuItem>
      </NavMenu>
    </StyledNav>
  );
};

export default Nav;
