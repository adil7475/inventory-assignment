import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import Auth from "../../Services/Auth";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import config from '../../config'

const List = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(  () => {
    async function fetchProducts () {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/products`,
          {
            headers: {
              'Authorization': `Bearer ${Auth.getToken()}`
            }
          })
        setProducts(response.data.data)
        setLoading(false)
      } catch (error) {
        const {response} = error
        if (response.data.code === 403) {
          toast.error(response.data.message)
        }
      }
    }

    fetchProducts()
  }, [])

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure to want to delete product")) {
      try {
        const response = await axios.delete(
            `${config.API_BASE_URL}/products/${id}`,
            {
              headers: {
                Authorization: `Bearer ${Auth.getToken()}`
              }
            }
        )
        const {data} = response
        if (data.code === 200 && data.status === 'success') {
          let filteredProducts = products.filter(product => product.id !== id)
          setProducts(filteredProducts)
          toast.success(data.message)
        }
      } catch (error) {
        const {response} = error
        if (response.data.code === 403) {
          toast.error(response.data.message)
        }
      }
    }
  }

  const handleLogout = () => {
    console.log("here")
    Auth.destroyToken()
    navigate('/login')
  }

  return (
    <div className="tableMain">
      <div className="container">
        {
          Auth.isAdmin()
            ?
              (
                <div className={'text-center m-5'}>
                  <button className={'btn btn-primary'} onClick={() => navigate('/products/create')}>Add Product</button>
                </div>
              )
            : ''
        }
        {
          Auth.isAuthenticated()
              ? (
                <div className={'text-center m-5'}>
                  <button className={'btn btn-danger'} onClick={ handleLogout }>Logout</button>
                </div>
            ) : ''
        }
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {
            !loading && products.length ?
              products.map( (product) => {
                return (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td>{product.name}</td>
                      <td width="60%">
                        {product.description}
                      </td>
                      <td>
                        <ul className="list-unstyled d-flex">
                          {
                            Auth.isAdmin() || Auth.isModerator()
                              ?
                                (
                                    <li>
                                      <Link to={`/products/${product.id}/edit`} className="btn btn-sm btn-primary">
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                      </Link>
                                    </li>
                                )
                              : ''
                          }

                          {
                            Auth.isAdmin() || Auth.isClient()
                              ?
                                (
                                    <li>
                                      <Link to={`/products/${product.id}/view`} className="btn btn-sm btn-success mx-2">
                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                      </Link>
                                    </li>
                                )
                              : ''
                          }

                          {
                            Auth.isAdmin()
                              ?
                                (
                                    <li>
                                      <button onClick={(e) => deleteProduct(product.id) } className="btn btn-sm btn-danger">
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                      </button>
                                    </li>
                                )
                              : ''
                          }
                        </ul>
                      </td>
                    </tr>
                )
              }) :
              <tr><td className={'text-center'}>Loading</td></tr>
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
