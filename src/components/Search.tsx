import styles from "../styles/Search.module.css";
import TextField from "@mui/material/TextField";
import React from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import AdvertisementCard from "./AdvertisementCard";
import Heading from "./Heading";

function Search() {
    const [search, setSearch] = React.useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setSearchParams({ search: event.target.value });
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
            <div className={styles.productList}></div>
        </div>
    );
}

export default Search;
