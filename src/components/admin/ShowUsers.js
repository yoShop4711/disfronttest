import { useEffect, useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Link } from "react-router-dom";
import _ from "lodash";


const pageSize = 5;

function ShowUsers() {
  const state = useContext(GlobalState);

  const [users, setUsers] = useState([]);
  const [paginated, setPaginated] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [isAdmin] = state.userApi.isAdmin;

  const token = state.token;

  useEffect(() => {
    const showUsers = async () => {
      if (isAdmin) {
        const res = await axios.get(
          "/auth/show_users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(res.data.users);
        setPaginated(_(res.data.users).slice(0).take(pageSize).value());
      }
    };

    showUsers();
  }, [token, isAdmin]);

  const pageCount = users ? Math.ceil(users.length / pageSize.length) : 0;

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize
    const paginate = _(users).slice(startIndex).take(pageSize).value()
    setPaginated(paginate)


  }

  

  return (
    <div>
      <h1 className="text-center text-blue-600">USERS</h1>

      {!paginated ? (
        " users are loading "
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>username</th>
              <th>fullname</th>
              <th>email</th>
              <th>location</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((user, index) => {
              return (
                <tr key={index}>
                  <td>
                    {" "}
                    <Link to={`/user/${user._id}`}>{user.username}</Link>
                  </td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.location}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page, index) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={index}
            >
            <p className="page-link" onClick={() => pagination(page)} > {page} </p>
            </li>
          ))}
        </ul>
      </nav>

      
    </div>
  );
}

export default ShowUsers;
