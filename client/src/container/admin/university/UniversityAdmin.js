
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../../components/Header';
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigation/Routes";
function UniversityAdmin() {

  const [form, setForm] = useState({ name: "", image: null });

  const [formError, setFormError] = useState({ name: "", image: "" });

  const [universities, setUniversities] = useState([]);

  const [universityId, setUniversityId] = useState(null);

  const navigate = useNavigate();

  // Handle input changes
  const changeHandler = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Get all universities
  async function getAllUniversities() {
    try {
      const d = await axios.get("http://localhost:8081/university");
      setUniversities(d.data.univData);
    } catch (error) {
      alert(error?.message);
    }
  }

  // Load universities when component mounts
  useEffect(() => {
    getAllUniversities();
  }, []);

  // Save university
  async function saveUniversity() {
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("image", form.image);

      const d = await axios.post(
        "http://localhost:8081/university",
        formData
      );

      alert(d.data.message);
      getAllUniversities();
      resetForm();

    } catch (error) {
      alert(error?.message);
    }
  }

  // Reset form
  function resetForm() {
    setForm({ name: "", image: null });
    setUniversityId(null);
    setFormError({ name: "", image: "" });
  }

  // Update university
  async function updateUniversity() {
    try {
      const formData = new FormData();

      formData.append("id", universityId);
      formData.append("name", form.name);

      if (form.image) {
        formData.append("image", form.image);
      }

    const d = await axios.put(
    `http://localhost:8081/university/${universityId}`,
    formData
);

      alert(d.data.message);
      await getAllUniversities();
      resetForm();

    } catch (error) {
      alert(error?.message);
    }
  }

  // Delete university
  async function deleteUniversity(id) {
    try {
      let ans = window.confirm("Want to delete data?");

      if (!ans) return;

      const d = await axios.delete(
        "http://localhost:8081/university",
        { data: { id: id } }
      );

      alert(d.data.message);
      getAllUniversities();
      resetForm();

    } catch (error) {
      alert(error?.message);
    }
  }

  // Submit university form
  function onUniversitySubmit() {

    let errors = false;

    let error = { name: "", image: "" };

    if (form.name.trim().length === 0) {
      errors = true;
      error.name = "University Name Empty !!!";
    }

    if (!universityId && form.image === null) {
      errors = true;
      error.image = "Please select university image !!!";
    }

    if (errors) {
      setFormError(error);
    } else {
      universityId ? updateUniversity() : saveUniversity();
    }
  }


 
function renderUniversities() {
    return universities?.map((item) => {
        return (
            <tr>
                <td>
                    <img
                        src={"http://localhost:8081/" + item.image}
                        style={{
                            width: "350px",
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: "8px"
                        }}
                    ></img>
                </td>
                <td style={{ verticalAlign: "middle", fontWeight: "500" }}>
                    {item.name}
                </td>
                <td style={{ verticalAlign: "middle", width: "180px" }}>
               <button
    className="btn btn-success form-control"
    onClick={() => {
        navigate(
            ROUTES.departmentAdmin.name +
            "?id=" + item._id +
            "&name=" + encodeURIComponent(item.name)
        );
    }}
>
    Add Department
</button>
                </td>
                <td style={{ verticalAlign: "middle", width: "180px" }}>
                    <button className="btn btn-primary form-control"
                    onClick={()=>{
                      setUniversityId(item._id);
                      setForm({...form,name:item.name});
                    }}>Edit Department</button>
                </td>
                <td style={{ verticalAlign: "middle", width: "180px" }}>
                    <button className="btn btn-danger form-control"
                    onClick={()=>{
                      deleteUniversity(item._id);
                    }}
                    >Delete Department</button>
                </td>
            </tr>
        )
    });
}



return (
  <div>
    <Header />
    <div className="row m-2 p-2">
      <div class="card text-center">
        <div class="card-header">
          {universityId ? "Edit University" : "New University"}
        </div>
        <div class="card-body">
          <div className="form-group row">
            <label className="col-4">University Name</label>
            <div className="col-8">
              <input type="text" name="name" className="form-control" onChange={changeHandler}
                value={form.name}></input>
              <p className="text-danger">{formError.name}</p>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-4">University Image</label>
            <div className="col-8">
              <input type="file" name="image" className="form-control" onChange={(e) => {
                let file = e.target.files[0];
                setForm({ ...form, image: file });
              }}
              ></input>
              <p className="text-danger">{formError.image}</p>
            </div>
          </div>
        </div>
        <div class="card-footer text-muted">
          <button className="btn btn-info" onClick={() => {
            onUniversitySubmit();
          }}
          >{universityId ? "Update" : "Save"}</button>
        </div>
      </div>
    </div>

    <div className="row border p-2 m-2">
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>University Image</th>
            <th>University Name</th>
            <th>Add Department</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {renderUniversities()}
        </tbody>
      </table>
    </div>

  </div>
);
}

export default UniversityAdmin;
