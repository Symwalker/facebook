import React, { useEffect, useState } from 'react';
import myImg from "../src/assets/img.jpg"
import world from "../src/assets/world.png"
import FbImageLibrary from 'react-fb-image-grid';
import { FaThumbsUp } from 'react-icons/fa';
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { FaEllipsisH } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const App = () => {
  const date = new Date();
  const [data, setData] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [liked, setLiked] = useState({});

  const handleLike = (productId) => {
    setLiked((prevLiked) => ({
    
      ...prevLiked,
      [productId]: !prevLiked[productId],
    }));
  };

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((json) => setData(json.products));
  }, []);

  const toggleCategory = (productId) => {
    setExpandedCategories((prevExpanded) => ({
      ...prevExpanded,
      [productId]: !prevExpanded[productId],
    }));
  };

  return (
    <div style={{backgroundColor:"#E9EBEE"}}>
            {data.map((product) => {
        const isExpanded = expandedCategories[product.id] || false;
        const isProductLiked = liked[product.id] || false;
        return (
          <div className='card p-3 mx-auto mb-5' style={{ backgroundColor: 'white', width: '50rem', boxShadow:"" }} key={product.id}>
            <div style={{ display: 'flex' }}>
              <img
                src={myImg}
                alt=""
                height={60}
                width={60}
                className='rounded-full'
              />
              <div style={{ margin: '5px 8px' }}>
                <span style={{ fontSize: '15px', color: '#050505' }}>
                  <strong>Shayan Hanif</strong>
                </span>
                <div style={{ marginTop: -1, marginLeft: 3 }}>
                  <span style={{ fontSize: '13px' }}>05 Jan . </span>
                  {/* <img height={30} width={30} src={world} alt="" /> */}
                </div>
              </div>

              <div style={{marginTop:"14px", marginLeft:"auto", marginRight:"4px"}}>
              <FaEllipsisH style={{fontSize:"18px", marginRight:"14px"}}/>
              <AiOutlineClose style={{fontSize:"23px"}}/>  
              </div>
            </div>

            <div style={{ marginLeft: '5px', marginTop: '3px', display: 'flex', flexDirection: 'column' }}>
              <span>
                <strong>Brand: </strong>
                {product.brand}
              </span>
              <span>
                <strong>Product: </strong>
                {product.title}
              </span>
              <span>
                <strong>Category: </strong>
                {isExpanded ? product.category :product.category.substring(0, 30)}
              </span>

              {isExpanded && (
                <>
                  <span>
                    <strong>Features: </strong>
                    {product.description}
                  </span>
                  <span>
                    <strong>Rating: </strong>
                    {product.rating}
                  </span>
                  <span>
                    <strong>Price: </strong>
                    {product.price}
                  </span>
                  <span>
                    <strong>Stock: </strong>
                    {product.stock}
                  </span>
                </>
              )}
              <a onClick={() => toggleCategory(product.id)} style={{ marginTop: '5px', cursor: 'pointer', color: 'blue' }}>
                {isExpanded ? 'See Less' : 'See More'}
              </a>
            </div>
            <div style={{ width: '100%' }}>
              <FbImageLibrary images={product.images} />
            </div>
                
            <div style={{display:"flex", justifyContent:"space-around", borderTop:"1px solid gray", marginTop:"5px"}}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  border: 'none',
                  borderRadius: '4px',
                  background: 'none',
                  color: isProductLiked ? '#1877f2' : 'gray',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  // fontSize:"18px"
                }}
                onClick={() => handleLike(product.id)}
              >
                <FaThumbsUp style={{ marginRight: '6px', fontSize:"18px" }} />
                Like
              </button>

              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  border: 'none',
                  borderRadius: '4px',
                  background: 'none',
                  color:'gray',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                <FaRegComment style={{ marginRight: '6px', fontSize:"20px" }} />
                Comment
              </button>

              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  border: 'none',
                  borderRadius: '4px',
                  background: 'none',
                  color:'gray',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                <PiShareFat style={{ marginRight: '6px' , fontSize:"25px"}} />
                Share
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;