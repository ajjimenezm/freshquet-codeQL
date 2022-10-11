import styles from "../styles/Search.module.css";
import TextField from "@mui/material/TextField";
import React from "react";
import { IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";

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
        </div>
    );
}

export default Search;
