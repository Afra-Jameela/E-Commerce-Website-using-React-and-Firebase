import React, { useEffect, useState } from 'react';
import styles from "./AddProduct.module.scss";
import Card from '../../card/Card';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../loader/Loader';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../redux/slice/productSlice';

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const [product, setProduct] = useState(initialState);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Sync Redux productEdit into local state
  useEffect(() => {
    if (id !== "ADD" && productEdit) {
      setProduct(productEdit);
    }
  }, [id, productEdit]);

  const detectForm = (id, f1, f2) => (id === "ADD" ? f1 : f2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Eshop_app");
    data.append("folder", "eShop");

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.cloudinary.com/v1_1/dzeb3b7az/image/upload");

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          setProduct((prevProduct) => ({
            ...prevProduct,
            imageURL: res.secure_url,
          }));
          toast.success("Image uploaded successfully!");
        }
      };

      xhr.send(data);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate().toISOString(),
      });

      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success("Product Uploaded Successfully.");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await setDoc(doc(db, "products", id), {
        ...product,
        price: Number(product.price),
        createdAt: product.createdAt || Timestamp.now().toDate().toISOString(),
        editedAt: Timestamp.now().toDate().toISOString(),
      });

      setIsLoading(false);
      toast.success("Product Updated Successfully.");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product name:</label>
            <input type="text" name="name" required value={product.name} onChange={handleInputChange} />

            <label>Product image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className={styles.progress}>
                  <div className={styles["progress-bar"]} style={{ width: `${uploadProgress}%` }}>
                    Uploading {uploadProgress}%
                  </div>
                </div>
              )}
              <input type="file" accept="image/*" name="image" onChange={handleImageChange} />
              <input type="text" name="imageURL" value={product.imageURL} disabled />
              {product.imageURL && <img src={product.imageURL} alt="Uploaded" width="150" />}
            </Card>
            
            

            <label>Product Price:</label>
            <input type="number" name="price" required value={product.price} onChange={handleInputChange} />

            <label>Product category:</label>
            <select name="category" required value={product.category} onChange={handleInputChange}>
              <option value="" disabled>
                -- Choose product category --
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label>Product Brand:</label>
            <input type="text" name="brand" required value={product.brand} onChange={handleInputChange} />

            <label>Product Description:</label>
            <textarea name="desc" required value={product.desc} onChange={handleInputChange} rows="10" />

            <button className="--btn --btn-primary">{detectForm(id, "Save Product", "Edit Product")}</button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
