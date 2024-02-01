"use client";

import React, { useState } from "react";
import { DateTime } from "luxon";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import Divider from "@/app/components/Divider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FormProvider, useForm } from "react-hook-form";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";

export default function Page() {
    const [open, setOpen] = useState(false);
    const [cvv, setCVV] = useState("");
    const [numberCard, setNumberCard] = useState("");
    const [cardHolder, setCardHolder] = useState("");

    const [cardExpiration, setCardExpiration] = React.useState<DateTime | null>(null);

    const [creditCards, setCreditCards] = useState([
        {
            id: 0,
            num: "**** **** **** 1234",
            expiryDate: "11/2030",
            cvc: 110,
            name: "Alguem da Silva",
        },
        {
            id: 1,
            num: "**** **** **** 4321",
            expiryDate: "11/2040",
            cvc: 852,
            name: "Alguem dos Santos",
        },
        {
            id: 2,
            num: "**** **** **** 4567",
            expiryDate: "11/2035",
            cvc: 951,
            name: "Alguem de Jesus",
        },
    ]);

    const methods = useForm();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const handleSave = handleSubmit((data) => {});

    const tokenizeCard = () => {
        try {
            EfiJs.CreditCard.setAccount("49c8fb5b596a53f8a7da4f02b1a18bc5")
                .setEnvironment("sandbox") // 'production' or 'sandbox'
                .setCreditCardData({
                    brand: "visa",
                    number: "4485785674290087",
                    cvv: "123",
                    expirationMonth: "05",
                    expirationYear: "2029",
                    reuse: false,
                })
                .getPaymentToken()
                .then((data) => {
                    const payment_token = data.payment_token;
                    const card_mask = data.card_mask;

                    console.log("payment_token", payment_token);
                    console.log("card_mask", card_mask);
                })
                .catch((err) => {
                    console.log("Código: ", err.code);
                    console.log("Nome: ", err.error);
                    console.log("Mensagem: ", err.error_description);
                });
        } catch (error) {
            console.log("Código: ", error.code);
            console.log("Nome: ", error.error);
            console.log("Mensagem: ", error.error_description);
        }
    };

    const handleInputCardNumberChange: any = (event: { target: { value: string } }) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, "");
        setNumberCard(inputValue);
    };
    const handleInputCVVChange: any = (event: { target: { value: string } }) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, "");
        setCVV(inputValue);
    };

    const handleInputCardHolderChange: any = (event: { target: { value: string } }) => {
        setCardHolder(inputValue);
    };

    function handleClose() {
        setOpen(false);
    }

    return (
        <Box sx={{ backgroundColor: "secondary.main", borderRadius: 5 }}>
            <Grid container>
                <Grid xs={12} p={2}>
                    <Typography variant="h4" fontWeight="bold" color="dark.main">
                        Meus Cartões
                    </Typography>
                    <Divider width="15%" />
                </Grid>
                <Grid xs={12} p={2}>
                    <Box sx={{ backgroundColor: "#FFF", borderRadius: 5 }}>
                        <Grid container p={2}>
                            <Grid xs={12} textAlign="right">
                                <Button
                                    startIcon={<Add />}
                                    variant="contained"
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                >
                                    Adicionar
                                </Button>
                            </Grid>

                            <Grid xs={12} container mt={2}>
                                <Stack direction="column" width="100%" divider={<Divider width="85%" height={2} style={{ margin: "auto" }} />}>
                                    {creditCards.map((creditcard) => (
                                        <Grid key={creditcard.id} xs={12} sx={{ backgroundColor: "white" }} py={2}>
                                            <Grid container>
                                                <Grid xs={4} textAlign="center">
                                                    <CreditCardIcon color="dark" sx={{ fontSize: 80 }} />
                                                </Grid>
                                                <Grid xs={4}>
                                                    <Typography variant="body1">{creditcard.name}</Typography>
                                                    <Typography variant="body2">Válido até {creditcard.expiryDate}</Typography>
                                                    <Typography>{creditcard.num}</Typography>
                                                </Grid>
                                                <Grid xs={4} textAlign="right">
                                                    <Button variant="contained" color="error">
                                                        Excluir
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle textAlign="center" sx={{ backgroundColor: "secondary.main", p: 1 }}>
                    Cadastro novo cartão
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid xs={12}>
                            <TextField value={cardHolder} onChange={handleInputCardHolderChange} label={"Nome no Cartão *"} fullWidth size="small" />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                label={"Número do Cartão *"}
                                fullWidth
                                size="small"
                                value={numberCard}
                                inputProps={{
                                    inputMode: "numeric",
                                    maxLength: 16,
                                }}
                                onChange={handleInputCardNumberChange}
                            />
                        </Grid>
                        <Grid xs={12} container>
                            <Grid xs={6}>
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <DatePicker
                                        label={"Vencimento"}
                                        views={["month", "year"]}
                                        slotProps={{ textField: { size: "small" } }}
                                        value={cardExpiration}
                                        onChange={(value) => {
                                            setCardExpiration(value);
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid xs={6} pl={2}>
                                <TextField
                                    label={"CVV *"}
                                    fullWidth
                                    size="small"
                                    value={cvv}
                                    inputProps={{
                                        inputMode: "numeric",
                                        maxLength: 3,
                                    }}
                                    onChange={handleInputCVVChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="contained" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button color="success" variant="contained" onClick={handleSave}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
            <script src="https://cdn.jsdelivr.net/gh/efipay/js-payment-token-efi/dist/payment-token-efi.min.js"></script>
        </Box>
    );
}
