import styles from "../styles/Search.module.css";
import TextField from "@mui/material/TextField";
import React from "react";
import { IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";

function Search() {
    const [search, setSearch] = React.useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const theme = useTheme();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setSearchParams({ search: event.target.value });
    };

    return (
        <div>
            <Typography
                className={styles.headText}
                fontWeight="bold"
                color={theme.palette.primary.dark}
                fontSize="25px"
                marginTop="20px"
                marginBottom="10px"
                marginRight="20px"
                marginLeft="20px"
            >
                Buscar productos...
            </Typography>
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
                <ProductCard
                    product={{
                        id: "1",
                        name: "Manzana",
                        description: "Manzana de la variedad Golden",
                        price: 1.5,
                        image: "https://i.blogs.es/e44dc0/manzana/450_1000.webp",
                        averageScore: 4.5,
                    }}
                    onClickFunction={() => {}}
                />
                <ProductCard
                    product={{
                        id: "1",
                        name: "Manzana",
                        description: "Manzana de la variedad Golden",
                        price: 1.5,
                        image: "https://i.blogs.es/e44dc0/manzana/450_1000.webp",
                        averageScore: 4.5,
                    }}
                    onClickFunction={() => {}}
                />
                <ProductCard
                    product={{
                        id: "1",
                        name: "Manzana",
                        description: "Manzana de la variedad Golden",
                        price: 1.5,
                        image: "https://i.blogs.es/e44dc0/manzana/450_1000.webp",
                        averageScore: 4.5,
                    }}
                    onClickFunction={() => {}}
                />
            </div>
        </div>
    );
}

export default Search;
