import ComboBox from './Combobox';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../types/Category';
import Heading from '../Heading';
import AdImagesSelect from './AdImagesSelect';
import { Button } from '@mui/material';

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

  const [quantityError, setQuantityError] = useState(false);
  const [state, setState] = useState<NewProductsState>({
    id: "",
    name: "",
    description: "",
    pricePerKilogram: 0,
    category: Category.Fresh,
    averageReviewScore: 0.0,
    sellerId: localStorage.getItem('userId') || '',
    images: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const fileSelectedHandler = (event: any) => {
    console.log(event.target.files);
    // setState({
    //   ...state,
    //   selectedFiles: event.target.files,
    // });
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

          axios
            .post(
              `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${res.data}/uploadimages`,
              { files: state.images },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                  'Content-Type': 'multipart/form-data',
                },
              }
            )
            .then((res) => console.log(res))
            .catch((err) => console.log('image upload error: ' + err));

          console.log(1);

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
    <div>
      <Heading text="ADD NEW PRODUCT" />

      <form onSubmit={handleSubmit}>
        <label>Product name:</label>
        <br />
        <input
          id="prod_name"
          name="name"
          type="text"
          value={state.name}
          onChange={handleChange}
          className="mr-4 mb-4 w-full rounded-md p-2"
        />
        <br />
        <label>Price per kilogram (€):</label>
        <br />
        <input
          name="pricePerKilogram"
          type="number"
          value={state.pricePerKilogram}
          onChange={handleChange}
          className="mr-4 mb-4 w-full rounded-md p-2"
        />
        <br />
        <label>Product description:</label>
        <br />
        <input
          name="description"
          type="text"
          value={state.description}
          onChange={handleChange}
          className="mr-4 mb-4 w-full rounded-md p-2"
        />
        <br />
        <label>Category:</label>
        <br />
        <ComboBox onChangeHandler={handleCategory} />
        <br />

        <AdImagesSelect
          readAs="DataURL"
          accept="image/*"
          multiple={true}
          maxFileSize={10}
          text="Añade hasta 5 imagenes de tu producto"
          limitFilesConfig={{ max: 5 }}
          stateSetter={setState}
        />
        <br />

        <button type="submit">ACEPTAR</button>
      </form>
      <Button onClick={() => console.log(state)}>clickme</Button>
    </div>
  );
}
