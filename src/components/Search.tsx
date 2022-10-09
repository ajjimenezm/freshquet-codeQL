import TextField from "@mui/material/TextField";
import styles from "../styles/Search.module.css";
import React from "react";
import { IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

function Search() {
    const [search, setSearch] = React.useState("");
    const theme = useTheme();

    return (
        <div>
            <Typography
                className={styles.headText}
                color={theme.palette.primary.dark}
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
                    onChange={(e) => setSearch(e.target.value)}
                ></TextField>
            </div>
        </div>
    );
}

export default Search;
