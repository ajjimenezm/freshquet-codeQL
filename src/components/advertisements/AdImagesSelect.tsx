import { Button } from "@mui/material";
import React, { useState } from "react";
import { ReadType, useFilePicker } from "use-file-picker";
import { NewProductsState } from "./NewProduct";

interface AdImagesSelectProps {
  readAs: ReadType;
  accept: string;
  multiple: boolean;
  limitFilesConfig: { max: number };
  maxFileSize: number;
  //  text: string;
  stateSetter: React.Dispatch<React.SetStateAction<NewProductsState>>;
}

const AdImagesSelect = (props: AdImagesSelectProps) => {
  const [openFileSelector, { plainFiles }] = useFilePicker({
    readAs: props.readAs,
    accept: props.accept,
    multiple: props.multiple,
    limitFilesConfig: props.limitFilesConfig,

    maxFileSize: props.maxFileSize, //MB
  });
  const [lastPictureURL, setLastPictureURL] = React.useState("");

  React.useEffect(() => {
    if (plainFiles.length) {
      props.stateSetter((prevState) => ({
        ...prevState,
        images: plainFiles,
      }));
      setLastPictureURL(URL.createObjectURL(plainFiles[plainFiles.length - 1]));
    }
  }, [plainFiles]);

  const selectFile = () => {
    openFileSelector();
  };

  return (
    <>
      {plainFiles.length === 0 && (
        <button
          className="inline-block h-96 min-h-full w-11/12 rounded-2xl bg-fresh-morado-claro text-9xl  text-white ease-in-out hover:bg-fresh-morado-oscuro hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0"
          onClick={selectFile}
        >
          +
        </button>
      )}
      {plainFiles.length > 0 && (
        <>
          <button
            className="inline-block h-96 min-h-full w-11/12 rounded-2xl text-9xl text-white ease-in-out hover:bg-fresh-morado-oscuro hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0"
            onClick={selectFile}
            style={{
              backgroundImage: `url(${lastPictureURL})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            +
          </button>
        </>
      )}
    </>
  );
};

export default AdImagesSelect;
