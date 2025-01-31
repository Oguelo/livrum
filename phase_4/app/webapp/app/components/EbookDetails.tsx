"use client";

import Image from "next/image";
import { theme } from "@/app/theme";
import Ebook from "../interfaces/Ebook";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

interface EbookDetailsProps {
    ebook: Ebook;
    onAddCart: (ebook: Ebook) => void;
    shouldDisableAddCart: (ebook: Ebook) => boolean | undefined;
}

function ListItem({ title, value }: { title: string; value: string | number }) {
    return (
        <span>
            <span style={{ color: theme.palette.dark.main, fontWeight: "bold" }}>{title}: </span>
            <span style={{ color: theme.palette.textLight.main, fontWeight: "bold" }}>{value}</span>
        </span>
    );
}

export default function EbookDetails({ ebook, onAddCart, shouldDisableAddCart }: EbookDetailsProps) {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const el = document.querySelector("#ebook-cover-container");
        setWidth(el?.clientWidth ?? 0);
        setHeight(el?.clientHeight ?? 0);
    }, []);

    return (
        <Grid py={2} px={4} container xs={12} sx={{ backgroundColor: "secondary.main", borderRadius: 5, marginY: 6 }}>
            <Grid xs={12} textAlign="center" py={2}>
                <Typography variant="h4" color="dark.main">
                    {ebook.title}
                </Typography>
            </Grid>
            <Grid container xs={12} py={2}>
                <Grid xs={5} id="ebook-cover-container" p={2}>
                    {ebook.cover && (
                        <Image
                            src={ebook.cover}
                            width={width}
                            height={height}
                            alt="Ebook cover"
                            style={{ height: "100%", width: "100%", borderRadius: 30, objectFit: "contain" }}
                        />
                    )}
                </Grid>
                <Grid container xs={7} p={2}>
                    <Grid xs={12} pt={6}>
                        <Typography variant="h5" color="dark.main">
                            Descrição
                        </Typography>
                    </Grid>
                    <Grid xs={12} sx={{ color: "textLight.main", wordBreak: "break-all" }}>
                        {ebook.summary}
                    </Grid>
                    <Grid xs={12} container justifyContent="center" mt={4}>
                        <Grid container py={3} xs={8} sx={{ backgroundColor: "#c5c5c5", borderRadius: 3 }} textAlign="center" alignSelf="end">
                            <Grid xs={6} alignSelf="center">
                                <Typography variant="h4" textAlign="center" color="dark.main">
                                    {ebook.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                                </Typography>
                            </Grid>
                            <Grid xs={6} alignSelf="center">
                                <Button
                                    variant="contained"
                                    startIcon={<AddShoppingCart />}
                                    onClick={() => onAddCart(ebook)}
                                    disabled={shouldDisableAddCart(ebook)}
                                >
                                    Comprar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container xs={12} px={2}>
                <Grid xs={12}>
                    <Typography variant="h5" color="dark.main">
                        Especificações
                    </Typography>
                </Grid>
                <Grid xs={12} container>
                    <Grid xs={3}>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li style={{ paddingTop: 4, paddingBottom: 4 }}>
                                <ListItem title="Autor" value={ebook.author ? ebook.author : "-"} />
                            </li>
                            <li style={{ paddingTop: 4, paddingBottom: 4 }}>
                                <ListItem title="Número de Páginas" value={ebook.pages ? ebook.pages : "-"} />
                            </li>
                            <li style={{ paddingTop: 4, paddingBottom: 4 }}>
                                <ListItem title="Ano de lançamento" value={ebook.releaseYear ? ebook.releaseYear : "-"} />
                            </li>
                        </ul>
                    </Grid>
                    <Grid xs={3}>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li style={{ paddingTop: 4, paddingBottom: 4 }}>
                                <ListItem title="Idioma" value={ebook.languages ? ebook.languages : "-"} />
                            </li>
                            <li style={{ paddingTop: 4, paddingBottom: 4 }}>
                                <ListItem title="Tamanho" value={ebook.size ? ebook.size + " KB" : "-"} />
                            </li>
                            <li style={{ paddingTop: 4, paddingBottom: 4 }}>
                                <ListItem title="Formato" value="PDF" />
                            </li>
                        </ul>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
