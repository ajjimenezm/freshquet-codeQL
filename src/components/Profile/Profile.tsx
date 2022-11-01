import ReadProfile from './ReadProfile';
import EditProfile from './EditProfile';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import DataUser from './dataUser';
import { Buffer } from 'buffer';

interface IProps {
  user?: string;
}

interface IState {
  editProfile?: boolean;
  dataUser: DataUser;
  userRole: string;
  avatar: string;
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
      avatar: '',
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
            profile_picture: res.data[0].profile_picture,
          },
        });
        this.getProfilePic(res.data[0].profile_picture);
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/type`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => {
        this.setState({
          userRole: res.data.userRole,
        });
      });
  }

  getProfilePic = (pic: string) => {
    if (!pic) return;
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/profile-picture/${pic}`,
        {
          responseType: 'arraybuffer',
        }
      )
      .then((res) => {
        this.setState({
          avatar: `data:;base64,${Buffer.from(res.data, 'binary').toString(
            'base64'
          )}`,
        });
      });
  };

  render() {
    return (
      <div>
        <Observer update={this.fetchData} />
        {this.state.editProfile ? (
          <EditProfile
            dataUser={this.state.dataUser}
            editHandler={this.handler}
            userRole={this.state.userRole}
            avatar={this.state.avatar}
          />
        ) : (
          <ReadProfile
            dataUser={this.state.dataUser}
            editHandler={this.handler}
            userRole={this.state.userRole}
            avatar={this.state.avatar}
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
