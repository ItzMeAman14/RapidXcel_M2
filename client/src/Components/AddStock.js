import React,{ useState,useEffect } from 'react';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

const AddStock = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [weight, setWeight] = useState('');
    const [alert, setalert] = useState({type:"success",msg:"Default",status:false});


    const addStock = async (event) => {
        event.preventDefault();
        const res = await fetch("http://127.0.0.1:5000/addStock",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                price,
                quantity,
                weight
            })
        })
        
        const data = await res.json();
        console.log(data);
        setalert({
            type:Object.keys(data)[0],
            msg:data[Object.keys(data)[0]],
            status:true
        })        
        setTimeout(() => {
            navigate("/")
        },2000)
    }

    useEffect(() => {
        setTimeout(() => {
            setalert({status:false})
        },3000)
    }, [alert.status]);

  return (
      <div className='container my-5'>
        <h2 className='my-3' align="center" style={{"textDecoration":"underline"}}>Add Stock</h2>
        {alert.status &&  <Alert type={alert.type} msg={alert.msg} />}
        <form onSubmit={addStock}>

            {/* For Stock Id */}
            {/* <div className="mb-3">
                <label htmlFor="stockID" className="form-label">Enter Stock ID</label>
                <input type="text" name='stockID' className="form-control" value={id} onChange={(event) => { setid(event.target.value) }} required id="stockID" />
            </div> */}

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

export default AddStock;
