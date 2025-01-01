import React,{ useState,useEffect } from 'react';
import Alert from './Alert';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateStock = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [stock, setStock] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [weight, setWeight] = useState('');
    const [alert, setalert] = useState({type:"success",msg:"Default",status:false});
    
    const getStockbyID = async () => {
        const res = await fetch(`http://127.0.0.1:5000/getStock/${params.id}`);
        const data = await res.json();
        setStock(data[0]);
        
    }

    const updateStock = async (event) => {
        event.preventDefault();
        const res = await fetch("http://127.0.0.1:5000/updateStock",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:params.id,
                name,
                price,
                quantity,
                weight
            })
        })
        
        const data = await res.json();
        setalert({
            type:Object.keys(data)[0],
            msg:data[Object.keys(data)[0]],
            status:true
        })
        setTimeout(() => {
            navigate("/")
        },2000);
    }

    useEffect(() => {
        setTimeout(() => {
            setalert({status:false})
        },2000)
    }, [alert.status]);

    useEffect(() => {
    // eslint-disable-next-line
      getStockbyID();
    }, []);

    useEffect(() => {
      if(stock != null){
        setName(stock.stock_name);
        setPrice(stock.price);
        setQuantity(stock.quantity);
        setWeight(stock.weight);
      }
    }, [stock]);

  return (
      <div className='container my-5'>
        <h2 className='my-3' align="center" style={{"textDecoration":"underline"}}>Update Stock</h2>
        {alert.status &&  <Alert type={alert.type} msg={alert.msg} />}
        <form onSubmit={updateStock}>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Stock Name</label>
                <input type="text" name='name' className="form-control" id="name" value={name} onChange={(event) => { setName(event.target.value) }} required />
            </div>
            
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Stock Price</label>
                <input type="text" name='price' className="form-control" id="price" value={price} onChange={(event) => { setPrice(event.target.value) }} required />
            </div>
            
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Stock Quantity</label>
                <input type="text" name="quantity" className="form-control" id="quantity" value={quantity} onChange={(event) => { setQuantity(event.target.value) }} required />
            </div>
            
            <div className="mb-3">
                <label htmlFor="weight" className="form-label">Stock Weight</label>
                <input type="text" name='weight' className="form-control" id="weight" value={weight} onChange={(event) => { setWeight(event.target.value) }} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  );
}

export default UpdateStock;
