import React, { useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import styles from "./ViewProducts.module.scss";
import { toast } from 'react-toastify';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { Link } from 'react-router-dom';
import Loader from '../../loader/Loader';
import Notiflix from 'notiflix';
import {useDispatch, useSelector} from 'react-redux';
import { selectProducts, STORE_PRODUCTS } from '../../../redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { FILTER_BY_SEARCH, selectFilteredProducts } from '../../../redux/slice/filterSlice';
import Search from '../../search/Search';
import Pagination from '../../pagination/Pagination';

const ViewProducts = () => {
  const [search , setSearch] = useState("");
  const {data, isLoading}= useFetchCollection("products")
  const products= useSelector(selectProducts)
  const filteredProducts = useSelector(selectFilteredProducts)
  const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(10) // Number of products to display per page
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(()=>{
      dispatch(FILTER_BY_SEARCH({products,search}))
    },[search, dispatch, products])

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product. Are you sure?",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL)
      },
      function cancelCb() {
        console.log("Delete Cancelled");
        
      },
      {
        width: "320px",
        borderRadius: "8px",
       titleColor:"#2176b7",
       okButtonBackground:"#2176b7",
       cssAnimation:"zoom"
      }
    );
  };
  const deleteProduct=async(id, imageURL) =>{
    try{
      await deleteDoc(doc(db, "products", id));
      
      toast.success("Product deleted successfully");
    }

    catch(error){
      toast.error(error.message);
    }
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> Products found..
          </p>
          <Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        {filteredProducts.length === 0 ? (
          <p>No Products Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, imageURL, category, price } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      ></img>
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>₹{price.toFixed(2)}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaRegEdit size={20} color="green" />
                      </Link>

                      <Link to="/admin/all-products">
                        &nbsp;
                        <MdDelete
                          size={20}
                          color="red"
                          onClick={() => confirmDelete(id, imageURL)}
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} 
          productsPerPage={productsPerPage} 
          totalProducts={Math.ceil(filteredProducts.length)}  />
      </div>
    </>
  );
}

export default ViewProducts
