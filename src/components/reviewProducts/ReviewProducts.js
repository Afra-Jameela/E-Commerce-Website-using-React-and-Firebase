import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './ReviewProducts.module.scss';
import { selectUserID, selectUserName } from '../../redux/slice/authSlice';
import { useParams } from 'react-router-dom';
import Card from '../card/Card';
import StarsRating from 'react-star-rate';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { toast } from 'react-toastify';
import useFetchCollection from '../../customHooks/useFetchCollection';
import spinnerImg from '../../assests/spinner.jpg';

const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');
  const [product, setProduct] = useState(null);

  const { id } = useParams();
  const { data } = useFetchCollection('products'); // Assuming `data` is an array of products
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const foundProduct = data.find((item) => item.id === id);
      setProduct(foundProduct || null);
    }
  }, [data, id]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!product) return;

    const today = new Date();
    const date = today.toDateString();

    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      await addDoc(collection(db, 'reviews'), reviewConfig);
      toast.success('Review Submitted Successfully');
      setRate(0);
      setReview('');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Product</h2>

        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: '50px' }} />
        ) : (
          <>
            <p>
              <b>Product Name:</b> {product.name}
            </p>
            <img src={product.imageURL} alt={product.name} style={{ width: '100px' }} />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={submitReview}>
            <label>Rating</label>
            <StarsRating value={rate} onChange={(rate) => setRate(rate)} />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;
