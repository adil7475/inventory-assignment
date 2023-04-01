import React, {useEffect, useState} from "react";
import axios from "axios";
import Auth from "../../Services/Auth";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import config from '../../config'

const Create = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const params = useParams()

    useEffect(() => {
        async function Product() {
            try {
                const response = await axios.get(
                    `${config.API_BASE_URL}/products/${params.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Auth.getToken()}`
                        }
                    })
                setName(response.data.data.name)
                setDescription(response.data.data.description)
            } catch (error) {
                const {response} = error
                if (response.data.code === 403) {
                    toast.error(response.data.message)
                }
            }
        }

        Product()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${config.API_BASE_URL}/products/${params.id}`,
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
            if (response.data.code === 200 && response.data.status === 'success') {
                toast.success(response.data.message)
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
                <h2>Edit Product</h2>
                <div className="form-group mb-3">
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
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
                     ></textarea>
                </div>
                {
                    Auth.getUserRole() === 'admin' || Auth.getUserRole() === 'moderator'
                    ? (
                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Edit Product</button>
                        </div>
                    )
                    : ''
                }
            </form>
        </div>
    );
}

export default Create;
