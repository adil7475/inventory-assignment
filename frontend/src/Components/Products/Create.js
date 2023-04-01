import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../../Services/Auth";
import {toast} from "react-toastify";
import config from '../../config'

const Create = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.post(
        `${config.API_BASE_URL}/products`,
        {
          name: name,
          description: description
        },
        {
          headers: {
            'Authorization': `Bearer ${Auth.getToken()}`
          }
        }
      )

      if (response.data.data.code === 201 && response.data.data.type === 'success') {
        setName('')
        setDescription('')
        toast.success(response.data.data.message)
      }
    } catch (error) {
      const {response} = error
      if (response.data.code === 403) {
        toast.error(response.data.message)
      }
    }
  };

  return (
    <div className="login login-dark">
      <form onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        <div className="form-group mb-3">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <textarea
            className="form-control"
            name=""
            id=""
            cols="5"
            rows="5"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block">Create Product</button>
        </div>
      </form>
    </div>
  );
}

export default Create;
