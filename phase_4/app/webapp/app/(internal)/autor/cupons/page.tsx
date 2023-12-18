"use client";

import React, { Component, useState } from "react";
import {
    Tab,
    Tabs,
    Button,
    styled,
    Dialog,
    Checkbox,
    TextField,
    Typography,
    DialogTitle,
    FormControl,
    DialogContent,
    DialogActions,
    FormControlLabel,
    Box,
    Stack,
    Switch,
    Select,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@/app/components/Divider";
import { theme } from "@/app/theme";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


const autorCupons = () => {
    const [openModal, setOpenModal] = useState(false);

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        "& .MuiDialogContent-root": {
            padding: theme.spacing(2),
        },
        "& .MuiDialogActions-root": {
            padding: theme.spacing(1),
        },
    }));

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };
    const StyledDialogTitle = styled(DialogTitle)({
        m: 0,
        p: 2,
        textAlign: "center",
        backgroundColor: "#E5E2E2",
        fontFamily: "Roboto",
        fontSize: "20px",
    });

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };

    return (
        <main>
        <Grid>
            <Grid container   direction="row" justifyContent="space-between" alignItems="center" sx={{backgroundColor:''}}>
                
                <Grid sx={{height:100}}>
                    <Grid xs={4}>
                        <Typography sx={{ color: theme.palette.dark.main}} variant="h6" paddingTop={2}>
                        Meus cupons 
                        </Typography>
                        <Divider width={"50%"} />
                    </Grid>
                </Grid>

                <Grid xs={3} paddingTop={2}>
                    <Button  variant="contained" onClick={(e) => {e.preventDefault();setOpenModal(true);}}>Criar novo cupom</Button>
                </Grid>
            </Grid>

            <Grid display='flex' justifyContent="center" alignItems="center">
                <Grid sx={{backgroundColor:'#FFFFFF', borderRadius:10, height:400, width:700}}>
                    <Grid container direction="row" justifyContent="space-around" alignItems="center" paddingTop={1}>

                        <Typography color={'black'} sx={{ width:78,textAlign:'center'}}>Percentual</Typography>
                        <Typography color={'black'} sx={{ width:85,textAlign:'center'}}>Nome</Typography>
                        <Typography color={'black'} sx={{ width:58,textAlign:'center'}}>Status</Typography>
                        <Typography color={'black'} sx={{ width:73,textAlign:'center'}}>Excluir</Typography>

                    </Grid>

                    <Grid paddingTop={1}>
                        <Divider width={"100%"}/>
                    </Grid>
            
                    <Grid container direction="row" justifyContent="space-around" alignItems="center" paddingTop={1}>
                        <Grid width={78}  display="flex" direction="row" justifyContent="space-around">
                        <Grid display="flex" justifyContent="center" alignItems="center" sx={{ boxShadow:'rgba(0, 0, 0, 0.24) 2px 2px 5px', backgroundColor:'#D9D9D9',borderRadius:'50%', width:40, height:40}} >
                            <Typography fontSize={18} color={'black'} >50%</Typography></Grid></Grid>
                        <Typography fontSize={12} >"NOMECUPOM"</Typography>
                        <Switch></Switch>
                        <Button variant="contained" color="error" sx={{fontSize:10}}>Excluir</Button>
                    </Grid>

                    <Grid display='flex' justifyContent="center" alignItems="center" paddingTop={1}>
                        <Divider height={1} width={"90%"}/>
                    </Grid>

                    <Grid container direction="row" justifyContent="space-around" alignItems="center" paddingTop={1}>
                        <Grid width={78}  display="flex" direction="row" justifyContent="space-around">
                        <Grid display="flex" justifyContent="center" alignItems="center" sx={{ boxShadow:'rgba(0, 0, 0, 0.24) 2px 2px 5px', backgroundColor:'lightgrey',borderRadius:'50%', width:40, height:40}} >
                            <Typography fontSize={18} color={'black'} >50%</Typography></Grid></Grid>
                        <Typography fontSize={12} >"NOMECUPOM"</Typography>
                        <Switch></Switch>
                        <Grid width={73} display="flex" direction="row" justifyContent="space-around">
                            <Button variant="contained" color="error"><DeleteOutlinedIcon sx={{fontSize:16}} width={73}/></Button></Grid>
                    </Grid>

                </Grid>
            </Grid>

            <BootstrapDialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
                    <StyledDialogTitle id="customized-dialog-title">
                        <strong>Criar novo cupom</strong>
                    </StyledDialogTitle>
                    <DialogContent dividers>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Typography>Nome do cupom: </Typography>
                            <TextField size="small"></TextField>
                        </Grid>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Typography>Percentual: </Typography>
                            <Select onChange={handleChange}>
                                <MenuItem value={10}>10%</MenuItem>
                                <MenuItem value={20}>20%</MenuItem>
                                <MenuItem value={30}>30%</MenuItem>
                                <MenuItem value={40}>40%</MenuItem>
                                <MenuItem value={50}>50%</MenuItem>
                            </Select>
                        </Grid>

                    </DialogContent>

                    <DialogActions>
                        <Stack justifyContent="center" gap={2} flexDirection="row" width={1.0} flexWrap="wrap">
                            <Button
                                color="success"
                                variant="contained"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenModal(false);
                                }}
                            >
                                Criar
                            </Button>
                            <Button
                                color="error"
                                variant="contained"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenModal(false);
                                }}
                            >
                                Cancelar
                            </Button>
                        </Stack>
                    </DialogActions>
                </BootstrapDialog>
  
        </Grid>
        </main>
    );
};

export default autorCupons;

            

