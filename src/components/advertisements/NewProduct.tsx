import ComboBox from "./Combobox";
import {
  Button,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Category } from "../../types/Category";
import Heading from "../Heading";

interface NewProductsState {
  id: string;
  name: string;
  description: string;
  pricePerKilogram: number;
  category: Category;
  averageReviewScore: number;
  sellerId: string;
}

export default function NewProducts() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userToken");
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [quantityError, setQuantityError] = useState(false);
  const [state, setState] = useState<NewProductsState>({
    id: "",
    name: "",
    description: "",
    pricePerKilogram: 0,
    category: Category.Fresh,
    averageReviewScore: 0.0,
    sellerId: localStorage.getItem("userId") || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const regexDecimalWithPoint = /^\d*\.?\d*$/;
  const regexDecimalWithComma = /^\d*,?\d*$/;
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (
      value !== "" &&
      (regexDecimalWithPoint.test(value) || regexDecimalWithComma.test(value))
    ) {
      setQuantityError(false);
      setState({
        ...state,
        pricePerKilogram: parseFloat(value),
      });
    } else {
      setQuantityError(true);
    }
  };

  /*    const fileSelectedHandler = (event: any) => {
        state.selectedFile = event.target.files[0];
    }*/

  const handleCategory = (
    event: SyntheticEvent<Element, Event>,
    value: Category | null
  ): void => {
    if (value != null) {
      setState({
        ...state,
        category: value,
      });
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (state.name === "") {
      alert("Add a valid name to the product");
    } else if (
      state.pricePerKilogram <= 0 ||
      state.pricePerKilogram.toString().length === 0
    ) {
      alert("Add a valid price for the product");
    } else if (state.description === "") {
      alert("Add a valid description to the product");
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/create`,
          {
            ...state,
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            navigate("/home");
          }
        })
        .catch((res) => {
          //                console.log(res)
          if (res.message == "Network Error") alert("Network Error");
        });
    }
  };

  return (
    <div className="ml-7 mt-8">
      <Heading text="AÑADIR NUEVO PRODUCTO" />
      <div>
        <div className="mb-8">
          <TextField
            name="name"
            label="Nombre del producto"
            onChange={handleChange}
            id="fullWidth"
            defaultValue={state.name}
          />
        </div>
        <div className="mb-8">
          <FormControl
            sx={{ marginTop: 2 }}
            variant="outlined"
            error={quantityError}
          >
            <InputLabel htmlFor="quantity-field">Cantidad</InputLabel>
            <OutlinedInput
              id="quantity-field"
              value={state.pricePerKilogram}
              onChange={handlePriceChange}
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="quantity-field-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              label="Cantidad"
            />
            <FormHelperText id="quantity-field-helper-text">
              {quantityError ? "Introduzca un número válido" : ""}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="mb-8">
          <ComboBox onChangeHandler={handleCategory} />
        </div>
        <div className="mb-8 mr-8">
          <TextField
            fullWidth
            name="description"
            label="Descripción del producto"
            onChange={handleChange}
            id="fullWidth"
            defaultValue={state.description}
            multiline
          />
        </div>
        <Button className="mt-8" variant="outlined" onClick={handleSubmit}>
          ACEPTAR
        </Button>
      </div>
    </div>
  );
}
