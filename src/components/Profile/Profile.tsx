import ReadProfile from "./ReadProfile";
import EditProfile from "./EditProfile";
import { useEffect } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import DataUser from "./dataUser";

interface IProps {
    user?: string;
}

interface IState {
    editProfile?: boolean;
    dataUser?: any;
}

class ProfileNav extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            editProfile: false,
            dataUser: {
                name:"Cargando Nombre",
                username:"cargando",
                phone_number:"123456789",
                email:"cargando@emial.com",
                biography: "Cargando...",
                direction: "Cargando..."
            }
        }
        this.handler = this.handler.bind(this)
        this.fetchData = this.fetchData.bind(this)
    }
    
    handler() {
        this.setState({
            editProfile: !this.state.editProfile
        })
        this.fetchData()
    }

    fetchData() {
        axios.get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/username/${localStorage.getItem('username')}`, {})
        .then((res) => {
            this.setState({ 
                dataUser: {
                    name: res.data[0].name,
                    username:res.data[0].username,
                    phone_number:res.data[0].phone_number,
                    email:res.data[0].email,
                    direction: res.data[0].direction,
                    biography: res.data[0].biography
                }
            })
        })
    }
    
    render() {   

        return (
            <div>
                <Observer update={this.fetchData} />
                { this.state.editProfile
                    ? <EditProfile 
                        dataUser={this.state.dataUser}
                        editHandler={this.handler}/>
                    : <ReadProfile 
                        dataUser={this.state.dataUser}
                        editHandler={this.handler}/>
                 }
            </div>
        );
    }
    
}

function Observer (props: {update: any})
{
    useEffect(() => {
      props.update()
    }, [])
    return null
}

function Profile() {
    const navigate = useNavigate();

    useEffect(() => {
        let user = localStorage.getItem('userToken');
        if (!user) {
            navigate('/login')
        }
    }, [])

    return <ProfileNav />
}

export default Profile;
