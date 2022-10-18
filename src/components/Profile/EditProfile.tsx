import { Button, Avatar, Divider, TextField} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment'
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

function EditProfile(props: ProfileProps) {
    return (
        <div className="m-4 space-y-4">
            <div className="flex py-4 space-x-4"> 
                <Avatar {...stringAvatar(props.name)} />
                <div className=" flex-col space-y-4 text-4xl">
                    <TextField 
                    fullWidth 
                    label="Name" 
                    id="fullWidth" 
                    defaultValue={props.name}
                    multiline
                    />
                    <p className=" text-lg opacity-50">{props.username}</p>
                    <Button variant="outlined">Change photo</Button>
                </div>     
            </div>
            <Divider />
            <TextField 
                fullWidth 
                label="Biography" 
                id="fullWidth" 
                defaultValue={props.biography}
                multiline/>
            <TextField 
                fullWidth 
                multiline
                label="Direction" 
                id="fullWidth" 
                defaultValue={props.direction}
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <LocationOnIcon/>
                        </InputAdornment>
                    ),
            }}/>
            <TextField 
                fullWidth 
                multiline
                label="Phone number" 
                id="fullWidth" 
                defaultValue={props.phone_number}
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <CallIcon/>
                        </InputAdornment>
                    ),
            }}/>
            <TextField 
                fullWidth 
                multiline
                label="Email" 
                id="fullWidth" 
                defaultValue={props.email}
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <EmailIcon/>
                        </InputAdornment>
                    ),
            }}/>
            <Divider />
            <div className=" space-x-10 text-right">
                <Button variant="outlined" color="success">Save</Button>
                <Button variant="outlined" color="error" onClick={() => props.editHandler()}>Cancel</Button>
            </div>
        </div>
    );
}

export default EditProfile;