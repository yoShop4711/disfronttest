import { useEffect, useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

import { Link } from "react-router-dom";

function ShowUsers() {
  const [users, setUsers] = useState([]);
  const state = useContext(GlobalState);

  const [isAdmin] = state.userApi.isAdmin;

  const toke = state.token[0];

  useEffect(() => {
    const showUsers = async () => {
      if (isAdmin) {
        const res = await axios.get("/auth/show_users", {
          headers: {
            Authorization: `Bearer ${toke}`,
          },
        });

        setUsers(res.data.users);
      }
    };

    showUsers();
  }, [toke, isAdmin]);

  //     const cols = [
  //         { field: 'id', headerName: 'ID', width: 300, renderCell: (id) => {
  //             return <Link to={`/user/${id.value}`}>`${id.value}`</Link>
  //         }},

  //         {
  //             field: 'fullname',
  //             headerName: 'Fullname',
  //             width: 150,

  //           },
  //           {
  //             field: 'username',
  //             headerName: 'Username',
  //             width: 150,

  //           },
  //           {
  //             field: 'email',
  //             headerName: 'Email',

  //             width: 300,

  //           },
  //           {
  //             field: 'location',
  //             headerName: 'Location',

  //             width: 150,

  //           }

  //     ]

  //     const rowData = users?.map(user => {
  // return{
  //     fullname: user?.fullname,
  //     username: user?.username,
  //     email: user?.email,
  //     location: user?.location,
  //     id : user?._id
  // }

  //     })

  // const rows = []

  return (

    <div>
        <h1 className="text-center text-blue-600">SELLERS</h1>
      <table className="table-auto md:table-auto">
        <thead>
          <tr>
            <th>username</th>
            <th>fullname</th>
            <th>email</th>
            <th>location</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid black",
                    color: "blue",
                  }}
                >
                  {" "}
                  <Link to={`/user/${user._id}`}>{user.username}</Link>
                </td>
                <td style={{ padding: "10px", border: "1px solid black" }}>
                  {user.fullname}
                </td>
                <td style={{ padding: "10px", border: "1px solid black" }}>
                  {user.email}
                </td>
                <td style={{ padding: "10px", border: "1px solid black" }}>
                  {user.location}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ShowUsers;
