import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

interface ButtonArgs {
  options: string[];
  url: string,
  filename: string,
  updateSuccess: (args: string) => void
  updateError: (args: string) => void,
  updateOnLoad: (args: boolean) => void
}

const AudioButton: React.FC<ButtonArgs> = (props): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    props.updateOnLoad(true);
    fetch(`//127.0.0.1:8000/downloadAudio?url=${props.url}&format=${props.options[selectedIndex]}`)
			.then(response => {
				response.blob().then(blob => {
					const url = window.URL.createObjectURL(blob);
					const a = document.createElement('a');
					a.href = url;
					a.download = `${props.filename}.${props.options[selectedIndex]}`;
					a.click();
          props.updateOnLoad(false);
          props.updateSuccess('Audio successfully downloaded')

				});
		}).catch(function(error) {
      props.updateOnLoad(false);
      props.updateError(`${error}`)
    });
    
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        sx={{ margin: 2 }}>
       <Button
          onClick={handleClick}
          sx={{
            backgroundColor: '#12232E',
            '&:hover': {
              backgroundColor: 'ivory',
              color: '#12232E',
            },
          }}
        >
          Audio
        </Button>
        <Button
          sx={{
            backgroundColor: 'ivory',
            color: '#12232E',
            '&:hover': {
              backgroundColor: '#12232E',
              color: 'ivory',
            },
          }}
          size='small'
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label='select strategy'
          aria-haspopup='menu'
          onClick={handleToggle}
        >
          {props.options[selectedIndex]}
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
          width: 155,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {props.options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}>
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export { AudioButton };