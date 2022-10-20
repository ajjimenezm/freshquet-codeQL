import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Advertisement from "../../types/Advertisement";
import { Rating } from "@mui/material";

function AdDetail() {
  const { id } = useParams<{ id: string }>();
  const [advertisement, setProduct] = useState<Advertisement>();
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        axios.get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${id}`)
          .then(res => {
            setProduct(res.data)
          })
      } catch (err) {
        setError(true);
        alert(err);
      }
    };
    getProduct();
  }, [id]);

  if (error) return <h1>Product not found</h1>;

  return (
    <>
      {advertisement && (
        <div className="w-full bg-slate-200 min-h-screen flex flex-col items-center p-8">
          <h1 className="text-3xl font-bold uppercase mb-4">{advertisement.name}</h1>
          <img
            src="https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Patata"
            className="max-w-[80%]"
          />
          <p className="text-2xl font-semibold py-4">{advertisement.pricePerKilogram} €/kg</p>
          <div className="w-full border-2 border-[#63d4a1] rounded-lg p-4">
            <p className="text-xl"> Descripción del Vendedor: </p>
            <p className="text-xl">{advertisement.description}</p>
          </div>
          <p className="text-2xl font-medium py-4">Categoría: <span className="uppercase border-1 rounded-lg p-2">{advertisement.category}</span></p>
          <Rating name="half-rating-read" defaultValue={advertisement.averageReviewScore} precision={0.5} readOnly />
        </div>
      )}
    </>
  );
}

export default AdDetail;