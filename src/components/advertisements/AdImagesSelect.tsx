import { Button } from '@mui/material';
import React from 'react';
import { ReadType, useFilePicker } from 'use-file-picker';
import { NewProductsState } from './NewProduct';

interface AdImagesSelectProps {
  readAs: ReadType;
  accept: string;
  multiple: boolean;
  limitFilesConfig: { max: number };
  maxFileSize: number;
  text: string;
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

  React.useEffect(() => {
    if (plainFiles.length) {
      props.stateSetter((prevState) => ({
        ...prevState,
        images: plainFiles,
      }));
    }
  }, [plainFiles]);

  const selectFile = () => {
    openFileSelector();
  };

  return (
    <Button variant="outlined" onClick={selectFile}>
      {props.text}
    </Button>
  );
};

export default AdImagesSelect;
