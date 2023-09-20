import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState , useEffect , useCallback } from "react";

import useAPI from "../hook/useAPI";
import useCart from '../hook/useCart'

import BaseContainer from "./Container";
import Button from "./Button";
import Input from "./Input";

import { numberWithCommas } from "../utils";
// import { products } from "../data";


const Container = styled(BaseContainer)`
    padding-top: 78px;
    padding-button: 78px;
    display: grid;
    grid-template-columns: 1fr;

    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        gap: 96px;
    }
`

const ProductImage = styled.img`
    width: 100%;
`

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px
    
    
`

const Title = styled.div`
    font-size: 40px;
    line-height: 60px;
    font-weight: 600;
    margin-botton: 50px;
`

const Subtitle = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 32px;
    line-height: 48px;
    font-weight: 400;
    color: #000000;
`

const Description = styled.p`
    color: #000000;
    margin-top: 0;
    margin-botton: 72px;
`

export const ProductDetail = () => {
    const {productId} = useParams();
    const {data, loading } = useAPI(`/products/${productId}` )
    const [quantity, setQuantity] = useState('1')
    const { addCartItem } = useCart(data.id)

    const handleQuantityChange = useCallback((e) => setQuantity(e.target.value), [setQuantity])
    const handleQuantityClick = useCallback(() => {
                addCartItem(data, parseInt(quantity))
                alert('เพิ่มสินค้าลงตะกร้าสำเร็จ')
            })

    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     setLoading(true);
    //     fetch(`https://us-central1-skooldio-react-hooks.cloudfunctions.net/products/${productId}`)
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             setData(data);
    //             setLoading(false);
    //         })
    // },[])


    // const data = products[0];

    return (
        <>

            { loading && <div>Loading</div> }
            { !loading && data &&
            <Container key={data.id}>
                <ProductImage src={data.imageUrl} alt={`${data.name}`} />
                <ProductInfo>
                    <Subtitle>
                        <span>{data.category}</span>
                        <span>฿{data.price}</span>
                    </Subtitle>
                    <Title>{data.name}</Title>
                    <Description>{data.description}</Description>
                    <Input 
                    value= {quantity}
                    label= 'Quantity'
                    onChange= {handleQuantityChange}
                    style={{ marginBotton: '40px'}} 
                    type={'number'}
                    />
                    <Button 
                    disabled={!quantity % 1 === 0 && !quantity > 0} 
                    onClick = {handleQuantityClick}
                    >Add to Cart</Button>
                </ProductInfo>
            </Container>
            }
            
        </>
       
    )
}

export default ProductDetail;
