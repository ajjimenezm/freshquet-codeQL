import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Category } from "../../types/Category";
import Advertisement from "../../types/Advertisement";
import { useEffect, useRef, useState } from "react";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import { useFilePicker } from "use-file-picker";
import { IconButton } from "@mui/material";
import { ReactComponent as BackIcon } from "../../assets/icons/BackArrow.svg";

function EditAdDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [advertisement, setProduct] = useState<Advertisement>();
  const [images, setImages] = useState<string[]>([]);
  const [fileImages, setFileImages] = useState<File[]>([]);
  const [openFileSelector, { plainFiles }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    limitFilesConfig: { max: 5 },

    maxFileSize: 10, //MB
  });

  const handleBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (plainFiles.length) {
      console.log(plainFiles);
      setFileImages(plainFiles);
      const img: string[] = [];
      plainFiles.forEach((file) => {
        img.push(URL.createObjectURL(file));
      });
      setImages(img);
    }
  }, [plainFiles]);

  useEffect(() => {
    if (id) {
      AdvertisementManagement.GetAdvertisementById(id).then((res) => {
        setProduct(res);
      });
      AdvertisementManagement.GetProductPictures(id).then((res) => {
        setImages(res);
      });
    }
  }, [id]);

  function handleChange(event: any) {
    if (advertisement) {
      setProduct({
        ...advertisement,
        [event.target.name]: event.target.value,
      });
    }
  }

  const updateData = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (advertisement) {
      await AdvertisementManagement.UpdateAdvertisment(advertisement).then(
        () => {
          alert("PRODUCTO ACTUALIZADO");
          navigate(`/sellerSelfProfile`);
        }
      );

      if (plainFiles.length) {
        console.log(fileImages);
        await AdvertisementManagement.UploadProductImages(
          advertisement?._id,
          fileImages
        ).then((res) => {
          console.log(res);
        });
      }
    }
  };

  const deleteData = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${id}`
      )
      .then((res) => {
        alert("PRODUCTO ELIMINADO");
        navigate(`/sellerSelfProfile`);
      })
      .catch((res) => {
        console.log("PUT ERROR");
        console.log(res);
      });
  };
  const selectFile = () => {
    openFileSelector();
  };

  return (
    <div className="mt-8 pb-24">
      <div>
        <IconButton
          onClick={handleBackButton}
          sx={{
            position: "fixed",
            top: 20,
            left: 20,
            backgroundColor: "white",
            border: "0",
            boxShadow: "none",
          }}
        >
          <BackIcon />
        </IconButton>
      </div>
      <h2 className="ml-4  mt-12 p-4 font-outfit text-xl font-semibold">
        Editar producto
      </h2>
      <div className="ml-7">
        <button
          className="inline-block h-96 min-h-full w-11/12 rounded-2xl border border-solid border-fresh-morado-claro text-9xl text-fresh-morado-claro ease-in-out hover:bg-fresh-morado-oscuro hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0"
          onClick={selectFile}
          style={{
            backgroundImage: `url(${images[0]})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <div className="mb-5 mt-6 grid w-11/12 place-items-center">
          <input
            id="name"
            name="name"
            placeholder="Nombre del producto"
            type="text"
            className="inline-block w-full rounded-md border border-solid border-fresh-morado-claro bg-white bg-clip-padding px-3 py-1.5 font-outfit text-base
            focus:border-fresh-morado-oscuro focus:outline-none"
            onChange={handleChange}
            defaultValue={advertisement?.name}
          />
        </div>
        <div className="mb-5 grid w-11/12 grid-cols-7 gap-4">
          <div className="col-start-1 col-end-4">
            <select
              className="w-full rounded-md border border-solid border-fresh-morado-claro bg-white px-3 py-2 text-base"
              onChange={(selectedOption) => {
                if (selectedOption != null) {
                  let cat: Category;
                  if (selectedOption.currentTarget.value === "Fruta") {
                    cat = Category.Fruta;
                  } else if (selectedOption.currentTarget.value === "Verdura") {
                    cat = Category.Verdura;
                  } else if (
                    selectedOption.currentTarget.value === "Legumbres"
                  ) {
                    cat = Category.Legumbres;
                  } else {
                    cat = Category.Otros;
                  }
                  if (advertisement)
                    setProduct({
                      ...advertisement,
                      category: cat,
                    });
                }
              }}
            >
              <option selected disabled hidden>
                {advertisement?.category}
              </option>
              <option value={Category.Fruta}>{Category.Fruta}</option>
              <option value={Category.Verdura}>{Category.Verdura}</option>
              <option value={Category.Legumbres}>{Category.Legumbres}</option>
              <option value={Category.Otros}>{Category.Otros}</option>
            </select>
          </div>
          <div className="col-span-3 col-end-8 flex">
            <input
              id="quantity-field"
              name="pricePerKilogram"
              placeholder="-"
              type="text"
              className="inline-block w-2/3 rounded-l-lg border border-solid border-fresh-morado-claro bg-white bg-clip-padding px-3 py-1.5 text-center font-outfit
            text-base focus:border-fresh-morado-oscuro focus:outline-none"
              defaultValue={advertisement?.pricePerKilogram}
              onChange={handleChange}
            />
            <label
              className="inline-block w-1/2 rounded-r-lg border border-solid border-fresh-morado-claro bg-white bg-clip-padding px-3 py-1.5 text-center font-outfit
            text-fresh-morado-oscuro focus:border-fresh-morado-oscuro focus:outline-none"
            >
              €/kg
            </label>
          </div>
        </div>
        <div className="mb-8 grid grid-cols-2 ">
          <button
            className="inline-block h-12 min-h-full w-5/6 rounded-3xl bg-fresh-naranja text-base  text-white ease-in-out hover:bg-fresh-morado-oscuro hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0"
            onClick={deleteData}
            id="delete"
          >
            Eliminar
          </button>
          <button
            className="inline-block h-12 min-h-full w-5/6 rounded-3xl bg-fresh-morado-oscuro text-base  text-white ease-in-out hover:bg-fresh-morado-oscuro hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0"
            onClick={updateData}
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditAdDetail;
