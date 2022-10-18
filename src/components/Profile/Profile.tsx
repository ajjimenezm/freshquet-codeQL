import ReadProfile from "./ReadProfile";
import EditProfile from "./EditProfile";
import axios from "axios";
import React from "react";

interface IProps {
}

interface IState {
    editProfile?: boolean;
}

class Profile extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            editProfile: false
        }
        this.handler = this.handler.bind(this)
    }
    
    handler() {
        console.log(process.env.REACT_APP_BACKEND_DEFAULT_ROUTE)
        this.setState({
            editProfile: !this.state.editProfile
        })
    }
    
    render() {

        const username = "ManoloGarcia";
        const name = "Manolo Garcia Moreno";
        const phone_number = "652227577";
        const email = "mgamo@inf.upv.es"
        const biography = "Esta es la biografia de Manolo";
        const direction = "Camí de Vera, S/N Edificio 1H, 46022 València";

        return (
            <div>
                {this.state.editProfile
                    ? <EditProfile 
                        name={name}
                        username={username} 
                        phone_number={phone_number}
                        biography={biography} 
                        direction={direction} 
                        email={email}
                        editHandler={this.handler}/>
                    : <ReadProfile 
                        name={name}
                        username={username} 
                        phone_number={phone_number}
                        biography={biography} 
                        direction={direction} 
                        email={email}
                        editHandler={this.handler}/>
                }
            </div>
        );
    }
    
}

export default Profile;
