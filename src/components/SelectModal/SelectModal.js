import React from 'react'
import { 
  Modal,
  Box,
  Button,
  FormLabel,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '360px',
  height: '568px',
  bgcolor: '#3a4243',
  color: '#fff',
  border: '2px solid #3a4243',
  boxShadow: 24,
  p: 4,
  textOverflow: "ellipsis"
};


const SelectModal = ({label, buttonProp, listItemProp, handleOpenChild, handleCloseChild, openChild}) => {
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <Button fullWidth variant='outlined' onClick={handleOpenChild}>
        {buttonProp}
      </Button>
      <Modal
        hideBackdrop
        open={openChild}
        onClose={handleCloseChild}
        closeAfterTransition
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          {listItemProp}
        </Box>
      </Modal>
    </div>
  )
}

export default SelectModal
