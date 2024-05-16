import NavBar from "../navBar/navBar";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";

function ViewAllUsers() {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      let response = await axios.get("http://localhost:3000/user/getAllUsers");
      let data = response.data?.data || [];
      setAllUsers(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const redirectToUserPage = async (id) => {
    navigate(`/viewSingleUser/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="row">
        <h4 className="text-center">User List</h4>
        <div className="d-flex justify-content-center mx-auto">
          <Table
            striped="columns"
            bordered
            hover
            responsive="sm"
            size="sm"
            variant="dark"
            className="w-auto"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Visit Profile</th>
              </tr>
            </thead>
            {allUsers.map((user, index) => {
              console.log("user", user);
              return (
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.userName}</td>
                    <td>
                      <button
                        onClick={() => {
                          redirectToUserPage(user._id);
                        }}
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div>
      </div>
    </>
  );
}
export default ViewAllUsers;
