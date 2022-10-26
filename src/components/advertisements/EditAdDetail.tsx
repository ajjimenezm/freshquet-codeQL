import ComboBox from './Combobox';
import { Button, Avatar, Divider, TextField, Rating } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Category } from '../../types/Category';
import Advertisement from '../../types/Advertisement';
import React, { SyntheticEvent, useEffect, useState } from 'react';

interface ChangeProductState{
    _id: string | undefined;
    name: string;
    description: string;
    pricePerKilogram: number;
    category: Category;
    averageReviewScore: number;
    sellerId: string;
}

function EditAdDetail(){
    const { id } = useParams<{ id: string }>();
    const [advertisement, setProduct] = useState<Advertisement>();
    // const [productChange, setState] = useState<ChangeProductState>({
    //     _id: '',
    //     name: '',
    //     description: '',
    //     pricePerKilogram: 0,
    //     category: Category.Fresh,
    //     averageReviewScore: 0.0,
    //     sellerId: '',
    // });
    
    useEffect( () =>{
        const getProduct = async () => {
            try {
                axios
                  .get(
                    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${id}`
                  )
                  .then((res) => {
                    console.log("GET RESPONSE")
                    console.log(res);
                    setProduct(res.data)
                    // setState({
                    //     ...productChange,
                    //     sellerId: advertisement?.sellerId.id,
                    // })
                });
              } catch (err) {
                alert(err);
              }
        }
        getProduct();
    }, [id]);

    function handleChange(event: any) {
        if (advertisement){
          setProduct({
            ...advertisement,
            [event.target.name]: event.target.value,
        })
        }
    }

    const handleCategory = (
        event: SyntheticEvent<Element, Event>,
        value: Category | null
      ): void => {
        if (value != null && advertisement) {
          setProduct({
            ...advertisement,
            category: value,
          });
        }
    };



    const updateData= (event: { preventDefault: () => void }) => {
        //productChange.sellerId = advertisement?.sellerId.id;
        event.preventDefault();
        axios
          .put(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${id}`, advertisement, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          })
          .then((res) => {
            console.log("PUT RESPONSE")
            console.log(res)
            alert("PRODUCTO ACTUALIZADO")
            navigate(`/home`)
          })
          .catch((res) =>{
            console.log("PUT ERROR")
            console.log(res)
          });
      }

      const navigate = useNavigate();
      const navigateToProduct = (id: string) => {
        navigate(`/products/detail/${id}`);
      };

    const deleteData = (event: {preventDefault: () => void}) => {
        event.preventDefault();
        axios
          .delete(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${id}`)
          .then((res) => {
            console.log("PUT RESPONSE")
            console.log(res)
            alert("PRODUCTO ELIMINADO")
            navigate(`/home`)
          })
          .catch((res) =>{
            console.log("PUT ERROR")
            console.log(res)
          });
    };

    return (
        <>
        {advertisement &&
            <div className="mb-14 flex min-h-screen w-full flex-col items-center bg-slate-200 p-8">
            <h1 className="mb-4 text-3xl font-bold uppercase">
                <TextField
                    name="name"
                    fullWidth
                    multiline
                    defaultValue={advertisement.name}
                    onChange={handleChange}
                >
                    <input
                        id="name"
                        name="name"
                        value={advertisement.name}
                        onChange={handleChange}
                        type="text"
                    />
                </TextField>
            </h1>
            <img
              src="https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Patata"
              className="max-w-[80%]"
            />
            
            <p className="py-4 text-2xl font-semibold">
            <TextField
                    name="pricePerKilogram"
                    multiline
                    defaultValue={advertisement.pricePerKilogram}
                    onChange={handleChange}
                >
                    <input
                        id="pricePerKilogram"
                        name="pricePerKilogram"
                        value={advertisement.pricePerKilogram}
                        onChange={handleChange}
                        type="number"
                    />
                </TextField>
                    €/kg
            </p>
            <div className="w-full rounded-lg border-2 border-[#63d4a1] p-4">
              <p className="text-xl"> Descripción del Vendedor: </p>
              <p className="text-xl">
              <TextField
                    name="description"
                    fullWidth
                    multiline
                    defaultValue={advertisement.description}
                    onChange={handleChange}
                >
                    <input
                        id="description"
                        name="description"
                        value={advertisement.description}
                        onChange={handleChange}
                        type="text"
                    />
                </TextField>
              </p>
            </div>
            <p className="py-4 text-2xl font-medium">
              Categoría:{' '}
              <span className="border-1 rounded-lg p-2 uppercase">
              <ComboBox onChangeHandler={handleCategory} />
              </span>
            </p>
            <Rating
              name="half-rating-read"
              defaultValue={advertisement.averageReviewScore}
              precision={0.5}
              readOnly
            />
        <Divider />
        <div className=" space-x-10 text-right">
        <Button
            onClick={updateData}
            variant="outlined"
            color="success"
        >
            Save
        </Button>
        <Button
            variant="outlined"
            color="error"
            onClick={navigateToProduct.bind(null, id!)}
        >
            Cancel
        </Button>
        <Button
            variant="outlined"
            color="error"
            onClick={deleteData}
        >
            Delete
        </Button>
        </div>
        </div>
    }
    </>  
);
}

export default EditAdDetail;