import { useEffect, useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

import { Link } from "react-router-dom";

function ShowUsers() {
  const [users, setUsers] = useState([]);
  const state = useContext(GlobalState);

  const [isAdmin] = state.userApi.isAdmin;

  const token = state.token

  

  useEffect(() => {
    const showUsers = async () => {
      if (isAdmin) {
        const res = await axios.get("https://newyoshopapi.onrender.com/auth/show_users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data.users);
      }
    };

    showUsers();
  }, [token, isAdmin]);

  
  return (

    <div>
        <h1 className="text-center text-blue-600">USERS</h1>
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
