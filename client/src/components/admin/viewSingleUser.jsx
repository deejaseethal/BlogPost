import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import userImg from "../../assets/user.jpg";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewSingleUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (id) {
      getUserData(id);
    } else {
      setUserData(null);
    }
  }, []);

  const getUserData = async (id) => {
    try {
      let response = await axios.get(
        `http://localhost:3000/user/getOneUser/${id}`
      );
      console.log("response::", response);
      const data = response?.data?.Data || null;
      console.log("data", data);
      if (data) {
        setUserData(data);
      } else {
        console.log("User Data Not Found");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="mx-auto justify-content-center d-flex mt-2">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={userImg} />
        <Card.Body>
          <Card.Title className="text-center">
            {userData.firstName + userData.lastName}
          </Card.Title>
          <Card.Text>
            <Container>
              <Row>
                <Col>First Name</Col>
                <Col>{userData.firstName}</Col>
              </Row>
              <Row>
                <Col>Last Name</Col>
                <Col>{userData.lastName}</Col>
              </Row>
              <Row>
                <Col>User Name</Col>
                <Col>{userData.userName}</Col>
              </Row>
              <Row>
                <Col>Email</Col>
                <Col>{userData.email}</Col>
              </Row>
            </Container>
          </Card.Text>
          <div className="text-center">
            <Button
              onClick={() => {
                navigate("/viewAllUsers");
              }}
              variant="primary"
            >
              View All
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ViewSingleUser;
