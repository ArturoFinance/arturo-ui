import React, { useState, useCallback } from 'react'
import { 
  Modal,
  Backdrop,
  Box,
  Fade,
  Button,
  Tab,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';

import {
  TabContext,
  TabList,
  TabPanel
} from '@mui/lab'

import {
  CHAINS
} from '../../constants/chains'
import { PROTOCOLS, CONTRACTS, METRICS, CONDITIONS } from '../../constants/constants'
import FormInput from '../FormInput'
import SelectModal from '../SelectModal';

import useStyles from './styles'
import FormSelect from '../FormSelect';
import LiquidityForm from '../LiquidityForm'
import { createWorkflow } from '../../utils/helpers';
import { approveMatic, approveDai } from '../../utils/helpers'


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

const Workflow = () => {
  const { ethereum } = window
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [openChild, setOpenChild] = useState(false)
  const [openProtocol, setOpenProtocol] = useState(false)
  const [selectedProtocol, setSelectedProtocol] = useState(null)

  const [openContract, setOpenContract] = useState(false)
  const [selectedContract, setSelectedContract] = useState(null)
  const [tabValue, setTabValue] = useState('1')
  const [accounts, setAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [selectedChainID, setSelectedChainID] = useState(null)
  const [metricVal, setMetricVal] = useState(null)
  const [conditionVal, setConditionVal] = useState(null)

  const [maticValue, setMaticValue] = useState('')
  const [daiValue, setDaiValue] = useState('')
  const [maticApproved, setMaticApproved] = useState(false)
  const [daiApproved, setDaiApproved] = useState(false)

  const handleApproveMatic = useCallback(
    async () => {
      if (Number(maticValue) !== 0) {
        const res = await approveMatic(Number(maticValue))
        setMaticApproved(res)
      } else {
        alert("Zero value")
      }
    }, [maticValue]
  )

  const handleApproveDai = useCallback(
    async () => {
      if (Number(daiValue) !== 0) {
        const res = await approveDai(Number(daiValue))
        setDaiApproved(res)
      } else {
        alert("Zero value")
      }
    }, [daiValue]
  )

  const handleMaticChange = useCallback(
    (e) => 
      setMaticValue(e.target.value)
      ,[]
  )
  
  const handleDaiChange = useCallback(
    (e) => 
      setDaiValue(e.target.value)
      ,[]
  )

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCloseChild = () => {
    setOpenChild(false)
  }

  const handleClickListItem = () => {
    setSelectedAccount(ethereum.selectedAddress)
    setOpenChild(false)
  }

  const handleClickListProtocol = (e) => {
    setSelectedProtocol(e.target.innerText)
    setOpenProtocol(false)    
  }

  const handleOpenProtocol = () => {
    setOpenProtocol(true)
  }

  const handleCloseProtocol = () => {
    setOpenProtocol(false)
  }

  const handleOpenContract = () => {
    setOpenContract(true)
  }

  const handleCloseContract = () => {
    setOpenContract(false)
  }

  const handleClickListContract = (e) => {
    setSelectedContract(e.target.innerText)
    setOpenContract(false)
  }

  const handleOpenChild = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
    setAccounts(accounts)
    setSelectedChainID(ethereum.networkVersion)
    setOpenChild(true)
  }

  const handleClickNext = () => {
    if (tabValue === '1') 
      setTabValue('2')
    else if (tabValue === '2')
      setTabValue('3')
    else if (tabValue === '3')
      setTabValue('1')
  }

  const handleMtricChange = (e) => {
    setMetricVal(e.target.value)
  }

  const handleConditionChange = (e) => {
    setConditionVal(e.target.value)
    console.log(e.target.value)
  }

  const handleClickSave = (e) => {
    createWorkflow()
  }

  return (
    <div>
      <Button onClick={handleOpen}>Create Workflow</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="TRIGGER" value="1" />
                  <Tab label="CONDITIONS" value="2" />
                  <Tab label="APPROVAL" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <FormInput
                  label='Name'
                />
                <SelectModal
                  label='Wallet'
                  handleOpenChild={handleOpenChild}
                  handleCloseChild={handleCloseChild}
                  handleClickListItem={handleClickListItem}
                  openChild={openChild}
                  accounts={accounts}
                  selectedChainID={selectedChainID}
                  buttonProp={
                    <>
                      <span>{selectedAccount ? `${selectedAccount.slice(2, 8)}...${selectedAccount.slice(36, 42)}` : 'Choose wallet'}</span>
                      <span>,</span>
                      <span>{selectedChainID && CHAINS[selectedChainID]}</span>
                    </>
                  }
                  listItemProp={
                    <List>
                      {accounts.map((account, idx) => (
                        <ListItem key={idx}>
                          <ListItemButton onClick={handleClickListItem}>
                            <ListItemText className={classes.listItemText}>
                              <p>{`${account.slice(2, 16)}...${account.slice(26, 42)}`}</p>
                              <span>{selectedChainID && CHAINS[selectedChainID]}</span>
                              <span>, </span>
                              <span>{`${account.slice(2, 16)}...${account.slice(26, 42)}`}</span>
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  }
                />
                <Button className='classes.setupBtn' fullWidth variant='contained' onClick={handleClickNext}>
                  Next
                </Button>
              </TabPanel>
              <TabPanel value="2">
                <SelectModal
                  label='Protocol'
                  handleOpenChild={handleOpenProtocol}
                  handleCloseChild={handleCloseProtocol}
                  openChild={openProtocol}
                  buttonProp={
                    <>
                      <span>{selectedProtocol ? selectedProtocol : 'Choose protocol'}</span>
                    </>
                  }
                  listItemProp={
                    <List>
                      {PROTOCOLS.map((protocol, idx) => (
                        <ListItem key={idx}>
                          <ListItemButton onClick={handleClickListProtocol}>
                            <ListItemText primary={protocol}>
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  }
                />
                <SelectModal
                  label='Contract'
                  handleOpenChild={handleOpenContract}
                  handleCloseChild={handleCloseContract}
                  openChild={openContract}
                  buttonProp={
                    <>
                      <span>{selectedContract ? selectedContract : 'Choose Contract'}</span>
                    </>
                  }
                  listItemProp={
                    <List>
                      {CONTRACTS.map((contract, idx) => (
                        <ListItem key={idx}>
                          <ListItemButton onClick={handleClickListContract}>
                            <ListItemText primary={contract}>
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  }
                />
                <FormSelect
                  key="metric"
                  options={METRICS}
                  onChange={handleMtricChange}
                  metricVal={metricVal}
                  label="METRIC"
                />

                <FormSelect 
                  key="condition"
                  options={CONDITIONS}
                  onChange={handleConditionChange}
                  metricVal={conditionVal}
                  label="CONDITION"
                />
                <FormInput
                  label='Value'
                />
                <Button className='classes.setupBtn' fullWidth variant='contained' onClick={handleClickNext}>
                  Next
                </Button>
              </TabPanel>
              <TabPanel value="3">
                <LiquidityForm 
                  maticValue={maticValue}
                  daiValue={daiValue}
                  maticApproved={maticApproved}
                  daiApproved={daiApproved}
                  onMaticChange={handleMaticChange}
                  onDaiChange={handleDaiChange}
                  onApproveMatic={handleApproveMatic}
                  onApproveDai={handleApproveDai}
                />
                <Button variant='contained' fullWidth onClick={handleClickSave}>
                  Save
                </Button>
              </TabPanel>
            </TabContext>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default Workflow
