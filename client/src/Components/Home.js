import React,{ useState, useEffect, useRef } from 'react';
import Loader from './Loader';
import Modal from './Modal';
import Alert from './Alert';
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(false);
    const [modal, setModal] = useState({status:false});
    const [alert, setalert] = useState({status:false,type:"success",msg:"Default Alert"});
    const modalTrigger = useRef();

    async function getData(){
        try{

            setloading(true);
            const res = await fetch("http://127.0.0.1:5000/getStocks")
            
            const Data = await res.json();
            setdata(Data);
            setloading(false);
        }
        catch(e){
            console.error(e);
            setTimeout(() => {
                setModal({status:true})
                modalTrigger.current.click()
            },5000)
            
        }
    }

    async function deleteStock(id) {
        try{
            console.log(id);
            
            const res = await fetch("http://127.0.0.1:5000/deleteStock",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id
                })
            })

            const parRes = await res.json();
            console.log(parRes);
            setalert({
                status:true,
                type:Object.keys(parRes)[0],
                msg:parRes[Object.keys(parRes)[0]]
            })
            getData();
        }  
        catch(e){   
            console.error(e);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
      setTimeout(() => {
        setalert({status:false})
      },3000);
    }, [alert.status]);

  return (
    <div className='container my-3'>
        { modal.status && <Modal msg="No internet Connection"/> }
        <Alert/>
        {alert.status && <Alert type={alert.type} msg={alert.msg} />}
        <h1 align="center" style={{"textDecoration":"underline"}}>Stock Management</h1>
        <table className="table table-hover table-striped table-bordered my-3">
            <thead>
                <tr>
                <th scope="col">Stock Id</th>
                <th scope="col">Stock Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Weight</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                { data.map((stock) => {
                    return (
                        <tr key={stock.stock_id}>
                            <th scope="row">{stock.stock_id}</th>
                            <td>{stock.stock_name}</td>
                            <td>{stock.price}</td>
                            <td>{stock.quantity}</td>
                            <td>{stock.weight}</td>
                            <td>
                                <button onClick={ () => { deleteStock(stock.stock_id) } } className='btn btn-sm btn-outline-danger mx-2'>Delete</button>
                                <Link className='btn btn-sm btn-outline-primary' to={`/update/${stock.stock_id}`} >Update</Link>
                            </td>
                        </tr>
                    )
                }) }

            </tbody>
            </table>
            { loading && <Loader/> }

            <button type="button" className="btn btn-primary d-none" ref={modalTrigger} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
    </div>
  );
}

export default Home;
