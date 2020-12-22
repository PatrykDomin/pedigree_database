import React, { useEffect } from 'react';
import useStyles from './Navbar.style';
import { Link } from 'react-router-dom';
import { Popover, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export const Navbar: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme<Theme>();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);

  const openMenu = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (!smallScreen) {
      setAnchorEl(null);
    }
  }, [smallScreen]);

  return (
    <div className={styles.navbar}>
      <h1 className={styles.header}>Baza rodowodowa</h1>
      {smallScreen ? (
        <div>
          <MenuIcon className={styles.menuBtn} onClick={openMenu} />
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <div
              className={styles.navigation}
              onClick={() => setAnchorEl(null)}
            >
              <Link to="/psy">Psy</Link>
              <Link to="/hodowle">Hodowle</Link>
              <Link to="/informacje">Informacje</Link>
            </div>
          </Popover>
        </div>
      ) : (
        <div className={styles.navigation}>
          <Link to="/psy">Psy</Link>
          <Link to="/hodowle">Hodowle</Link>
          <Link to="/informacje">Informacje</Link>
        </div>
      )}
    </div>
  );
};
