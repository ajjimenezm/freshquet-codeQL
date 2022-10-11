import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Advertisement from "../../types/Advertisement";

function AdDetail() {
    const { id } = useParams<{ id: string }>();
    const [advertisement, setProduct] = useState<Advertisement>();
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log(id);
        // const getProduct = async () => {
        //     try {
        //         const { data } = await axios.get(`/api/products/${id}`);
        //         setProduct(data);
        //     } catch (err) {
        //         setError(true);
        //         alert(err);
        //     }
        // };
        // getProduct();
    }, [id]);

    if (error) return <h1>Product not found</h1>;

    return (
        <>
            {advertisement && (
                <div>
                    <h1>{advertisement.name}</h1>
                    <h2>{advertisement.price}</h2>
                    <h3>{advertisement.description}</h3>
                </div>
            )}
        </>
    );
}