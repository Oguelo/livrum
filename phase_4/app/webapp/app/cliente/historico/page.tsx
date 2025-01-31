"use client";
import { useState } from "react";
import Divider from "@/app/components/Divider";
import { Container, Grid, List, Stack } from "@mui/material";
import PurchaseItemCard from "@/app/components/PurchaseItemCard";
import PurchaseDetailsModal from "@/app/components/PurchaseDetailsModal";

const books = [
    {
        id: 0,
        author: "Fiodor Dostoievski",
        title: "Os irmãos Karamazov",
        releaseYear: "1880",
        price: 110,
        genre: "Romance",
        isAvailable: false,
        summary: "",
        cover: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSpz_PGgi7jqYjc-QQ554j02VSA6G_TOT6w3FBlk2Zd9YFV64FvyVGkSatjDrBJWlOnRnK-jfRE0ws0BRoq2jLFF83dVRIdo9SlpHQzCUZOEpGTPeIXLFWTkA",
    },
    {
        id: 1,
        author: "Plato",
        price: 220,
        title: "The Republic",
        releaseYear: "1990",
        isAvailable: false,
        summary: "",
        genre: "Filosofia",
        cover: "https://m.media-amazon.com/images/I/612q-zfRD9L._AC_UF1000,1000_QL80_.jpg",
    },
    {
        id: 1,
        author: "Andrew Hodges",
        price: 20,
        title: "Turing: Um filósofo da natureza",
        releaseYear: "2023",
        isAvailable: true,
        summary: "Biografia",
        cover: "https://m.media-amazon.com/images/I/819ACs3AuzL._AC_AA360_.jpg",
    },
    {
        id: 0,
        author: "Austin Wright",
        title: "Tony & Susan",
        releaseYear: "1990",
        isAvailable: true,
        summary: "Romance",
        price: 50,
        cover: "https://m.media-amazon.com/images/I/71R8HmaGC5L._AC_AA440_.jpg",
    },
    {
        id: 1,
        author: "Plato",
        price: 220,
        title: "The Republic",
        releaseYear: "2023",
        isAvailable: true,
        summary: "Filosofia",
        cover: "https://m.media-amazon.com/images/I/612q-zfRD9L._AC_UF1000,1000_QL80_.jpg",
    },
] as const;

function PurcheaseHistoryHeader() {
    return (
        <Grid item xs={12}>
            <Stack>
                <Grid item xs={12} sx={{ fontSize: 28 }}>
                    <h1>Meu Histórico de Compras</h1>
                </Grid>
                <Divider height={4} width={"10%"} style={{}} />
            </Stack>
        </Grid>
    );
}

function PurchaseHistoryContainer() {
    const [items, setItems] = useState([
        {
            id: "293-02933001-002",
            date: "17 de Agosto de 2023",
            status: "PENDENTE",
            books: [books[0], books[1]],
            paymentMethod: "Cartão de Crédito",
            price: 76.59,
        },
        {
            id: "293-02931001-002",
            date: "17 de Agosto de 2023",
            status: "EFETUADA",
            books: [books[1], books[2]], //Ebook[]
            paymentMethod: "Cartão de Crédito",
            price: 76.59,
        },
        {
            id: "293-02930011-002",
            date: "17 de Agosto de 2023",
            status: "EFETUADA",
            books: [books[2], books[3], books[1], books[4]],
            paymentMethod: "Cartão de Crédito",
            price: 76.59,
        },
        {
            id: "293-02938001-002",
            date: "17 de Agosto de 2023",
            status: "RECUSADA",
            books: [books[2], books[3], books[1], books[4]],
            paymentMethod: "Cartão de Crédito",
            price: 76.59,
        },
    ]);

    const [selected, setSelected] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    return (
        <Grid container py={2}>
            <PurchaseDetailsModal
                show={openModal}
                purchaseItem={selected}
                onClose={() => {
                    setOpenModal(false);
                }}
            ></PurchaseDetailsModal>
            <Grid item xs={12}>
                <List sx={{ width: "100%" }}>
                    {items.map((purchaseItem) => (
                        <PurchaseItemCard
                            onSelect={(item) => {
                                setSelected(item);
                                setOpenModal(true);
                            }}
                            props={{ sx: { py: 1 } }}
                            purchaseItem={purchaseItem}
                            key={purchaseItem.id}
                        ></PurchaseItemCard>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
}

export default function Page() {
    return (
        <Container maxWidth={false} sx={{ backgroundColor: "#F4F2F2", borderRadius: "16px" }}>
            <PurcheaseHistoryHeader></PurcheaseHistoryHeader>
            <PurchaseHistoryContainer></PurchaseHistoryContainer>
        </Container>
    );
}
