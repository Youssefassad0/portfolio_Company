import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

/* eslint-disable react/prop-types */
function Products() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8001/api/product/' + id);
        setProduct(response.data.data);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchData();
  }, [])

  return (
    <>

    </>
  )
}

export default Products