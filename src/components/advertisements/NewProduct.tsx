import { Button } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Category } from "../../types/Category";
import AdImagesSelect from "./AdImagesSelect";
import BottomNav from "../BottomNav";
import AdvertisementManagement from "../../libs/AdvertisementManagement";

export interface NewProductsState {
    id: string;
    name: string;
    description: string;
    pricePerKilogram: number;
    category: Category;
    averageReviewScore: number;
    sellerId: string;
    images: File[];
}

export default function NewProducts() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("userToken");
        if (!user) {
            navigate("/login");
        }
    }, []);

    //const [quantityError, setQuantityError] = useState(false);
    const [state, setState] = useState<NewProductsState>({
        id: "",
        name: "",
        description: "",
        pricePerKilogram: 0,
        category: Category.Fruta,
        averageReviewScore: 0.0,
        sellerId: localStorage.getItem("userId") || "",
        images: [],
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
            (regexDecimalWithPoint.test(value) ||
                regexDecimalWithComma.test(value))
        ) {
            //setQuantityError(false);
            setState({
                ...state,
                pricePerKilogram: parseFloat(value),
            });
            /*} else {
      setQuantityError(true);*/
        }
    };

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
            alert("<Añade un nombre válido para el producto");
        } else if (
            state.pricePerKilogram <= 0 ||
            state.pricePerKilogram.toString().length === 0
        ) {
            alert("Añade un precio válido para el produto");
        } else if (state.description === "") {
            alert("Añade una descripción válida para el producto");
        } else {
            AdvertisementManagement.CreateNewAdvertisement(
                state.id,
                state.name,
                state.description,
                state.pricePerKilogram,
                state.category,
                state.averageReviewScore,
                state.sellerId,
                state.images
            )
                .then((res) => {
                    AdvertisementManagement.UploadProductImages(
                        res.data,
                        state.images
                    )
                        .then(() => {
                            if (res.status == 201) {
                                navigate("/home");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((res) => {
                    if (res.message == "Network Error") alert("Error de red");
                });
        }
    };

    return (
        <div className="mt-8 pb-24">
            <h2 className="ml-4 mt-12 font-outfit text-xl font-semibold">
                ¡Sube un nuevo
            </h2>
            <h2 className="ml-4 mb-6 font-outfit text-xl font-semibold">
                producto!
            </h2>
            <div className="ml-7">
                <AdImagesSelect
                    readAs="DataURL"
                    accept="image/*"
                    multiple={true}
                    maxFileSize={10}
                    limitFilesConfig={{ max: 5 }}
                    stateSetter={setState}
                />
                <div className="mb-5 mt-6 grid w-11/12 place-items-center">
                    <input
                        id="fullWidth"
                        name="name"
                        placeholder="Nombre del producto"
                        type="text"
                        className="inline-block w-full rounded-md border border-solid border-fresh-morado-claro bg-white bg-clip-padding px-3 py-1.5 font-outfit text-base
            focus:border-fresh-morado-oscuro focus:outline-none"
                        onChange={handleChange}
                        defaultValue={state.name}
                    />
                </div>
                <div className="mb-28 grid w-11/12 grid-cols-7 gap-4">
                    <div className="col-start-1 col-end-4">
                        <select
                            className="w-full rounded-md border border-solid border-fresh-morado-claro bg-white px-3 py-2 text-base"
                            onChange={(selectedOption) => {
                                if (selectedOption != null) {
                                    let cat: Category;
                                    if (
                                        selectedOption.currentTarget.value ===
                                        "Fruta"
                                    ) {
                                        cat = Category.Fruta;
                                    } else if (
                                        selectedOption.currentTarget.value ===
                                        "Verdura"
                                    ) {
                                        cat = Category.Verdura;
                                    } else if (
                                        selectedOption.currentTarget.value ===
                                        "Legumbres"
                                    ) {
                                        cat = Category.Legumbres;
                                    } else {
                                        cat = Category.Otros;
                                    }
                                    setState({
                                        ...state,
                                        category: cat,
                                    });
                                }
                            }}
                        >
                            <option selected disabled hidden>
                                Categoría
                            </option>
                            <option value={Category.Fruta}>
                                {Category.Fruta}
                            </option>
                            <option value={Category.Verdura}>
                                {Category.Verdura}
                            </option>
                            <option value={Category.Legumbres}>
                                {Category.Legumbres}
                            </option>
                            <option value={Category.Otros}>
                                {Category.Otros}
                            </option>
                        </select>
                    </div>
                    <div className="col-span-3 col-end-8 flex">
                        <input
                            id="quantity-field"
                            name="quantity"
                            placeholder="-"
                            type="text"
                            className="inline-block w-2/3 rounded-l-lg border border-solid border-fresh-morado-claro bg-white bg-clip-padding px-3 py-1.5 text-center font-outfit
            text-base focus:border-fresh-morado-oscuro focus:outline-none"
                            defaultValue={state.pricePerKilogram}
                            onChange={handlePriceChange}
                        />
                        <label
                            className="inline-block w-1/2 rounded-r-lg border border-solid border-fresh-morado-claro bg-white bg-clip-padding px-3 py-1.5 text-center font-outfit
            text-fresh-morado-oscuro focus:border-fresh-morado-oscuro focus:outline-none"
                        >
                            €/kg
                        </label>
                    </div>
                </div>
                <div className="mb-5 w-11/12">
                    <textarea
                        id="fullWidth"
                        name="description"
                        placeholder="Descripción"
                        rows={4}
                        className="inline-block w-full rounded-md border border-solid border-fresh-morado-claro bg-white bg-clip-padding px-3 py-1.5 font-outfit text-base
            focus:border-fresh-morado-oscuro focus:outline-none"
                        onChange={(event) => {
                            setState({
                                ...state,
                                description: event.target.value,
                            });
                        }}
                        defaultValue={state.description}
                    />
                </div>
                <div className="mb-8 grid place-items-center">
                    <button
                        className="inline-block h-12 min-h-full w-3/6 rounded-3xl bg-fresh-morado-oscuro text-base  text-white ease-in-out hover:bg-fresh-morado-oscuro hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0"
                        onClick={handleSubmit}
                    >
                        Subir
                    </button>
                </div>
            </div>
        </div>
    );
}
