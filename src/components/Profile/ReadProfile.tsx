import { Button, Avatar, Divider} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
  
interface ProfileProps {
    username: string;
    name: string;
    phone_number: string;
    email: string;
    biography: string;
    direction: string;
    editHandler: () => void;
}

function stringAvatar(name: string) {
    return {
        sx: {
        bgcolor: "#63d4a1",
        width: 100, height: 100
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
function ReadProfile(props: ProfileProps) {  
    return (
        <div className="m-4 space-y-4">
            <div className="flex py-4 space-x-4"> 
            <Avatar {...stringAvatar(props.name)} />
                <div className=" flex-col space-y-4">
                    <h1 className="text-4xl">{props.name}</h1>
                    <p className=" text-lg opacity-50">{props.username}</p>
                    <Button 
                        variant="outlined" 
                        onClick={() => props.editHandler()}>
                            Edit Profile
                    </Button>
                </div>     
            </div>
            <Divider />
            <p className=" text-lg">{props.biography}</p>
            <div className="flex text-sm space-x-2">
                <LocationOnIcon fontSize="small"/>
                <p>{props.direction}</p>
            </div>
            <div className="flex text-sm space-x-2">
                <CallIcon fontSize="small"/>
                <p>{props.phone_number}</p>
            </div>
            <div className="flex text-sm space-x-2">
                <EmailIcon fontSize="small"/>
                <p>{props.email}</p>
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

export default ReadProfile;
