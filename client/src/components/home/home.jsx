import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import NavBar from "../navBar/navBar";

function Home() {
  const navigate = useNavigate();

  const gotToNewPage = (newPage) => {
    navigate(newPage);
  };

  return (
    <div>
      <NavBar />
      <h1>Home Page</h1>
      <div className="text-center">
        <Button
          variant="primary"
          onClick={() => {
            gotToNewPage("/blogView");
          }}
        >
          View All Blogs
        </Button>
      </div>
      <div className="text-center mt-4">
        <Button
          variant="primary"
          onClick={() => {
            gotToNewPage("/blogAdd");
          }}
        >
          Add Blog
        </Button>
      </div>
    </div>
  );
}

export default Home;
