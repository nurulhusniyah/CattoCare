import React, { useContext, useState, useEffect } from "react";
import Add from "../img/addimg.png"
import { auth,db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc} from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'

const AddProducts = () => {

  const {currentUser} = useContext(AuthContext)

  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const productName = e.target[0].value;
    const description = e.target[1].value;
    const price = e.target[2].value;
    const prodpic = e.target[3].files[0];

    try {

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${currentUser + date}`);

      await uploadBytesResumable(storageRef, prodpic).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
              //create product on firestore
              await setDoc(doc(db, "products", currentUser.uid), {
              uid: currentUser.uid,
              productName,
              description,
              price,
              photoURL: downloadURL,
              });

          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Bizsay</span>
        <span className="title">Add Product</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Product name" />
          <input required type="text" placeholder="Product description" />
          <input required type="number" placeholder="Product price" />
          <input required style={{ display: "none" }} type="file" id="prodpic" />
          <label htmlFor="prodpic">
            <img src={Add} alt="" />
            <span>Add product picture</span>
          </label>
          <button disabled={loading}>Add Product</button>
          {loading && "Product added!"}
          {err && <span>Something went wrong</span>}
          <p><Link to="/">Back</Link></p>
        </form>
      </div>
    </div>
  );
};

export default AddProducts