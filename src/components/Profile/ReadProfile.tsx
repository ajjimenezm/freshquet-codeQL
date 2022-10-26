import { Button, Avatar, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import DataUser from "./dataUser";

interface ProfileProps {
  dataUser: DataUser;
  userRole: string;
  editHandler: () => void;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: "#63d4a1",
      width: 100,
      height: 100,
      fontSize: 45,
      fontWeight: "bold",
    },
    children: `${name.split(" ")[0][0]}`,
  };
}
function ReadProfile(props: ProfileProps) {
  return (
    <div className="m-4 space-y-4">
      <div className="flex space-x-4 py-4">
        <Avatar {...stringAvatar(props.dataUser.name)} />
        <div className=" flex-col space-y-4">
          <h1 className="text-4xl">{props.dataUser.name}</h1>
          <p className=" text-lg opacity-50">{props.dataUser.username}</p>
          <Button variant="outlined" onClick={() => props.editHandler()}>
            Edit Profile
          </Button>
        </div>
      </div>
      <Divider />
      <p className=" text-lg">{props.dataUser.biography}</p>
      <p className=" text-lg text-emerald-700">
        {props.userRole.toUpperCase()}
      </p>
      <div className="flex space-x-2 text-sm">
        <LocationOnIcon fontSize="small" />
        <p>{props.dataUser.direction}</p>
      </div>
      <div className="flex space-x-2 text-sm">
        <CallIcon fontSize="small" />
        <p>{props.dataUser.phone_number}</p>
      </div>
      <div className="flex space-x-2 text-sm">
        <EmailIcon fontSize="small" />
        <p>{props.dataUser.email}</p>
      </div>

      <Divider />
      {props.userRole == "seller" ? (
        <div className="space-y-4 text-center">
          <Button variant="contained" disabled>
            Historial de Anuncios
          </Button>
          <Button variant="contained" disabled>
            Promocionar Anuncios
          </Button>
          <Button variant="contained" disabled>
            Tus estadisticas
          </Button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default ReadProfile;