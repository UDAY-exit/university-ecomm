import React, { useEffect, useState } from 'react'
import Header from "../../../components/Header";
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import axios from 'axios';

function useQuery(){
  const{search} = useLocation();
  return React.useMemo(()=>new URLSearchParams(search),[search]);
}


function DepartmentAdmin() {
  const query = useQuery();
  const [departmentId,setDepartmentId]= useState(null);
  const [departments,setDepartments] = useState(null);
  const [form,setForm]=useState({
    name:"",
    image:null,
    university:query.get("id"),
  });
   const [formError,setFormError]=useState({
    name:"",
    image:"",
    });
const navigate = useNavigate();
function getDepartmentByUniversity(){
  try{
    axios.get("http://localhost:8081/department?universityId="+query.get("id"))
    .then((d)=>{
      setDepartments(d.data.depData);
    });
  }catch(error){
    alert(error?.message);
  }
}

useEffect(()=>{
  try{
    let formData = new FormData();
    formData.append("name",form.name);
    formData.append("image",form.image,form.image.name);
    formData.append("universityId",query.get("id"));
axios.post("http://localhost:8081/department",formData,{
  "content-type":"multipart/form-data",
}).then((d)=>{
  alert(d.data.message);
  getDepartmentByUniversity();
  resetForm();
})
  }catch(error){
    alert(error?.message);
  }
})
function resetForm(){
  setForm({name:"",image:null,university:query.get("id")});
}

function updateDepartment(){
  try{
   let formData = new FormData();
    formData.append("name",form.name);
    formData.append("image",form.image,form.image.name);
    formData.append("universityId",query.get("id")); 
    formData.append("id",departmentId);
    axios.put("http://localhost:8081/department",formData,{
      "content-type":"multipart/form-data",
    })
    .then((d)=>{
      alert(d.data.message);
      getDepartmentByUniversity();
      resetForm();
    })
  }catch(error){
    alert(error?.message);
  }
}

function deleteDepartment(){
  try{
  
    axios.put("http://localhost:8081/department",{
    data:{id:id}
    })
    .then((d)=>{
      alert(d.data.message);
      getDepartmentByUniversity();
      resetForm();
    })
  }catch(error){
    alert(error?.message);
  }
}

function onDepartmentSubmit(){
  let errors=false;
  let error = {name:"",image:""};
  if(form.name.trim().length == 0){
    errors = true;
    error = {...error,name:"Department Name Empty !!!"};
  }if(form.image == null){
    errors = true;
    error = {...error,image:"Please Select Department Image !!!"};
  }if(errors)setFormError(error);
  else{
    setFormError(error);
    departmentId ?  updateDepartment() : saveDepartmetn();
  }
}

  return (
<>
<Header/>
 <div className="row m-2 p-2">
<div class="card text-center">
  <div class="card-header">
     {universityId ? "Edit Depaetment" : "New Department"}
  </div>
  <div class="card-body">
    <div className="form-group row">
            <label className="col-4">University Name</label>
            <div className="col-8">
              <input type="text" disabled  className="form-control" value={query.get("name")}></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-4">Department Name</label>
            <div className="col-8">
              <input type="text" name="name"  className="form-control" value={form.name}onChange={changHandler}></input>
              <p className="text-danger">{formError.name}</p>
            </div>
          </div>
            <div className="form-group row">
            <label className="col-4">Department Name</label>
            <div className="col-8">
              <input type="file" name="image"  className="form-control" onChange={(e)=>{
                let file = e.target.files[0];
                setForm({...form,image:file});
              }}></input>
              <p className="text-danger">{formError.image}</p>
            </div>
          </div>
  </div>
  <div class="card-footer text-body-secondary">
    2 days ago
  </div>
</div>
</div>
</>
  )
}

export default DepartmentAdmin