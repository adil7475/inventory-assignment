import React, {useState, useEffect} from "react";
import axios from "axios";
import Auth from "../../Services/Auth";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import config from '../../config'


const View = () => {
    const [product, setProduct] = useState({})
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

                setProduct(response.data.data)
            } catch (error) {
                const {response} = error
                if (response.data.code === 403) {
                    toast.error(response.data.message)
                }
            }
        }

        Product()
    }, []);

    return (
        <div className="login login-dark">
            <div className={'w-'}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
            </div>
        </div>
    )
}

export default View