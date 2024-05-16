import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import axios from "axios";

function SingleBlog() {
  const { id } = useParams();

  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    if (id) {
      getBlogData(id);
    } else {
      setBlogData(null);
    }
  }, []);

  const getBlogData = async (id) => {
    try {
      let response = await axios.get(`http://localhost:3000/api/blogs/${id}`);
      console.log("response", response);
      const data = response?.data?.Data || null;
      console.log("data", data);
      if (data) {
        setBlogData(data);
      } else {
        console.log("Blog Data Not Found");
      }
    } catch (error) {
      console.log({ message: "Error on getting data", error });
    }
  };

  console.log("idd", id);
  return (
    <div
      style={{ height: "500px" }}
      className="w-100 mx-auto d-flex justify-content-center align-items-center  bg-primary"
    >
      <Card className="w-75 h-75 ">
        <Card.Body>
          <Card.Title className="text-center">{blogData?.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">
            {blogData?.author}
          </Card.Subtitle>
          <Card.Text>{blogData?.content}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SingleBlog;
