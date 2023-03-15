import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import axios from "axios";
const initialState = {
  id: "",
  name: "",
  dept_name: "",
  total_cred: "",
};

function AddEdit() {
  const [state, setState] = useState(initialState);
  const { name, dept_name, total_cred } = state;
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !name || !dept_name || !total_cred) {
      toast.error("Please Provide Values in Each Input Field");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            id,
            name,
            dept_name,
            total_cred,
          })
          .then(() => {
            setState({ id: "", name: "", dept_name: "", total_cred: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Student Added Successfully");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            id,
            name,
            dept_name,
            total_cred,
          })
          .then(() => {
            setState({ id: "", name: "", dept_name: "", total_cred: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Student updated Successfully");
      }
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  /*const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };*/
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };
  
  return (
    <div>
      <div style={{ marginTop: "100px " }}>
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="id">ID</label>
          <input
            type="number"
            id="id"
            name="id"
            placeholder="id"
            value={id || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={name || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="dept_name">Department Name</label>
          <input
            type="text"
            id="dept_name"
            name="dept_name"
            placeholder="Department Name"
            value={dept_name || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="total_cred">Total Credits</label>
          <input
            type="number"
            id="total_cred"
            name="total_cred"
            placeholder="Total credits"
            value={total_cred || ""}
            onChange={handleInputChange}
          />
          <div className="button-container">
            <input type="submit" value={id ? "Update" : "save"} />
            <Link to="/">
              <input type="button" value="Go Back" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEdit;
