import { Button } from "@mui/material";
import { ReadType, useFilePicker } from "use-file-picker";
import React from "react";
import axios from "axios";
import UserHelper from "../../libs/UserHelper";

interface ProfileUploadProps {
  readAs: ReadType;
  accept: string;
  multiple: boolean;
  limitFilesConfig: { max: number };
  maxFileSize: number;
  text: string;
}

const ProfilePictureUpload = (props: ProfileUploadProps) => {
  const [openFileSelector, { plainFiles }] = useFilePicker({
    readAs: props.readAs,
    accept: props.accept,
    multiple: props.multiple,
    limitFilesConfig: props.limitFilesConfig,
    maxFileSize: props.maxFileSize, //MB
  });

  React.useEffect(() => {
    if (plainFiles.length) {
      axios.post(
        `${process.env.REACT_APP_BACKENDFOTOS_DEFAULT_ROUTE}users/upload`,
        { file: plainFiles[0] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
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

export default ProfilePictureUpload;
