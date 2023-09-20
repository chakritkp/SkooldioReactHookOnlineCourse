// import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import useAPI from '../hook/useAPI';

// import { products } from '../data';

export const Home = () => {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false)
  const {data, loading} = useAPI('/products')

  // useEffect(() => {
  //   setLoading(true)
  //   fetch('https://us-central1-skooldio-react-hooks.cloudfunctions.net/products')
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setProducts(data);
  //       setLoading(false);
  //     })
  // }, [])
  return (
    
    <div>

      <Hero />
      { loading && <div>Loading</div> }
      { !loading && data && <ProductList data={data} /> }

    </div>
  );
}

  

export default Home;
