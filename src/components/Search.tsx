import styles from "../styles/Search.module.css";
import TextField from "@mui/material/TextField";
import React from "react";
import { Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import AdvertisementCard from "./AdvertisementCard";
import AdvertisementCardSkeleton from "./AdvertisementCardSkeleton";
import Heading from "./Heading";
import axios from "axios";

function Search() {
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const [advertisements, setAdvertisements] = React.useState([]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setSearchParams({ search: event.target.value });
    };

    const getProducts = () => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/getAll`
            )
            .then((res) => {
                //console.log(res);
                if (res.status === 201) {
                    console.log(res.data);
                }
            })
            .catch(() => {
                alert("Usuario o pass incorrectos");
            });
    };

    return (
        <div>
            <Heading text="Buscar productos" />
            <div className={styles.searchFieldArea}>
                <TextField
                    InputProps={{
                        startAdornment: (
                            <IconButton
                                type="button"
                                sx={{ p: "10px" }}
                                aria-label="search"
                            >
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                    fullWidth
                    id="searchField"
                    value={search}
                    onChange={handleSearch}
                ></TextField>
            </div>
            <div className={styles.productList}>
                {dataLoaded ? (
                    <AdvertisementCardSkeleton />
                ) : (
                    <>
                        <AdvertisementCardSkeleton />
                        <AdvertisementCard
                            advertisement={{
                                id: "1",
                                name: "Manzanas",
                                description: "Manzanas de la huerta",
                                price: 1.5,
                                image: "https://picsum.photos/200",
                                averageScore: 4,
                            }}
                            onClickFunction={() => {}}
                        />
                        <AdvertisementCardSkeleton />
                        <AdvertisementCardSkeleton />
                        <AdvertisementCardSkeleton />
                        <AdvertisementCardSkeleton />
                        <AdvertisementCardSkeleton />
                    </>
                )}
            </div>
        </div>
    );
}

export default Search;
