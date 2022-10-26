import ReadProfile from './ReadProfile';
import EditProfile from './EditProfile';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

interface IProps {
  user?: string;
}

interface IState {
  editProfile?: boolean;
  dataUser?: any;
  userRole: string;
}

class ProfileNav extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      editProfile: false,
      dataUser: {
        name: 'Cargando Nombre',
        username: 'cargando',
        phone_number: '123456789',
        email: 'cargando@emial.com',
        biography: 'Cargando...',
        direction: 'Cargando...',
      },
      userRole: 'Cargando',
    };
    this.handler = this.handler.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  handler() {
    this.setState({
      editProfile: !this.state.editProfile,
    });
    this.fetchData();
  }

  fetchData() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => {
        this.setState({
          dataUser: {
            name: res.data[0].name,
            username: res.data[0].username,
            phone_number: res.data[0].phone_number,
            email: res.data[0].email,
            direction: res.data[0].direction,
            biography: res.data[0].biography,
          },
        });
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/type`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          userRole: res.data.userRole,
        });
      });
  }

  render() {
    return (
      <div>
        <Observer update={this.fetchData} />
        {this.state.editProfile ? (
          <EditProfile
            dataUser={this.state.dataUser}
            editHandler={this.handler}
            userRole={this.state.userRole}
          />
        ) : (
          <ReadProfile
            dataUser={this.state.dataUser}
            editHandler={this.handler}
            userRole={this.state.userRole}
          />
        )}
      </div>
    );
  }
}

function Observer(props: { update: any }) {
  useEffect(() => {
    props.update();
  }, []);
  return null;
}

function Profile() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userToken');
    if (!user) {
      navigate('/login');
    }
  }, []);

  return <ProfileNav />;
}

export default Profile;
