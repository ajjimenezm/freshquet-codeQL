import { Button, Avatar, Divider} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
  
function stringAvatar(name: string) {
    return {
        sx: {
        bgcolor: "#63d4a1",
        width: 100, height: 100
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

function Profile() {
    const username = "Manolo Garcia Moreno";
    const biography = "Esta es la biografia de Manolo";
    const direction = "Camí de Vera, S/N Edificio 1H, 46022 València";
    return (
        <div className="m-4 space-y-4">
            <div className="flex py-4 space-x-4"> 
                <Avatar {...stringAvatar(username)} />
                <div className=" flex-col space-y-4">
                    <h1 className="text-4xl">{username}</h1>
                    <Button variant="outlined">Edit Profile</Button>
                </div>     
            </div>
            <Divider />
            <p className=" text-lg">{biography}</p>
            <div className="flex text-sm">
                <LocationOnIcon/>
                <p>{direction}</p>
            </div>
            <Divider />
            <div className="space-y-4 text-center">
                <Button variant="contained" disabled>Historial de Anuncios</Button>
                <Button variant="contained" disabled>Promocionar Anuncios</Button>
                <Button variant="contained" disabled>Tus estadisticas</Button>
            </div>

        </div>
    );
}

export default Profile;
