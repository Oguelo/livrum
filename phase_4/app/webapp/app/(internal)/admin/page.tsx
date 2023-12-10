"use client"

import { DateTime } from "luxon";
import { theme } from "@/app/theme";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DashboardCard from "@/app/components/DashboardCard";
import { Book, MonetizationOn, Sell } from '@mui/icons-material';
import { Box, Card, FormControl, InputLabel, LinearProgress, LinearProgressProps, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";


export default function Page() {
    const username = "Admin";

    const [chartWidth, setChartWidth] = useState(0);
    const [data, setData] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        setChartWidth(document.getElementById('chart-parent')?.clientWidth ?? 500);
        setData(getData())
    }, []);

    function getMaxX() {
        const today = DateTime.now();
        const days = today.daysInMonth;
        return days;
    }

    function getX(min: number, max: number, increment: number = 1) {
        const data = [];
        for (let i = min; i <= max; i = i + increment) {
            data.push(i);
        }
        return data;
    }

    function getData(): any[] {
        const data: any[] = []

        const max = getMaxX();
        const x = getX(1, max);

        for (let i = 1; i <= max; i++) {
            data.push({
                x: x[i - 1],
                y: Math.random() * 50
            })

        }

        return data;
    }

    const cards = [
        {
            header: 'Faturamento',
            Icon: <MonetizationOn color="darker" fontSize="large" />,
            title: 'R$ 450,00',
            month: 'Julho',
            subtitle: ''
        },
        {
            header: 'Vendidos',
            Icon: <Sell color="darker" fontSize="large" />,
            title: '431',
            subtitle: 'unidades',
            month: 'Julho'
        },
        {
            header: 'Obras',
            Icon: <Book color="darker" fontSize="large" />,
            title: '31',
            subtitle: 'títulos',
            month: 'Julho'
        }
    ]

    const authors = [
        {
            id: 5,
            name: 'Fernando Pessoa',
            popularity: 40,
        }, {
            id: 10,
            name: 'Almir Neto',
            popularity: 20,
        }
    ];

    return (
        <Grid container spacing={2} my={2}>
            <Grid xs={12}>
                <Typography variant="h5" sx={{ color: theme.palette.dark.main }}>
                    Bem-vindo, {username}
                </Typography>
            </Grid>
            <Grid xs={12} container>
                {cards.map(e => {
                    return <DashboardCard {...e} key={e.header} />
                })}
            </Grid>
            <Grid xs={12} id="chart-parent">
                <Typography sx={{ color: theme.palette.darker.main }}>
                    Visualizações
                </Typography>
                <Card elevation={0} sx={{ borderRadius: 2 }}>
                    {data && <LineChart
                        dataset={data}
                        xAxis={[{
                            id: 'days-month',
                            dataKey: 'x',
                            tickMinStep: 4,
                            tickNumber: 6,
                            tickLabelStyle: {
                                fill: theme.palette.textLight.main,
                            },
                        }]}
                        yAxis={[{
                            id: 'data-axis',
                            tickLabelStyle: {
                                fill: theme.palette.textLight.main,
                            },
                        }
                        ]}

                        leftAxis={{
                            axisId: 'data-axis',
                            disableLine: true,
                            disableTicks: true
                        }}

                        bottomAxis={{
                            axisId: 'days-month',
                            disableLine: true,
                            disableTicks: true,
                            stroke: 'red'
                        }}

                        series={[
                            {
                                curve: 'catmullRom',
                                dataKey: 'y',
                                showMark: false,
                                color: theme.palette.primary.main,

                            },
                        ]}
                        width={chartWidth}
                        height={300}
                    />}
                </Card>
            </Grid>
            <Grid xs={12}>
                <Card elevation={0} sx={{ borderRadius: 2 }}>
                    <Grid container padding={2}>
                        <Grid xs={9}>
                            <Typography variant="h5" color="darker.main">
                                Ranking Autores
                            </Typography>
                        </Grid>
                        <Grid xs={3}>
                            <FormControl fullWidth>
                                <InputLabel size="small" id="demo-simple-select-label">Autor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={author}
                                    label="Autor"
                                    onChange={(e) => { setAuthor(e.target.value) }}
                                    size="small"
                                >
                                    <MenuItem value={10}>X</MenuItem>
                                    <MenuItem value={20}>Y</MenuItem>
                                    <MenuItem value={30}>Z</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="left">Nome</TableCell>
                                <TableCell align="left">Popularidade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {authors.map(e => {
                                return <TableRow>
                                    <TableCell align="center">
                                        {e.id}
                                    </TableCell>
                                    <TableCell>
                                        {e.name}
                                    </TableCell>
                                    <TableCell>
                                        <LinearProgressWithLabel value={e.popularity} />
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </Card>
            </Grid>
        </Grid>
    );
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress sx={{ height: 8, borderRadius: 5 }} variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="primary.main">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}