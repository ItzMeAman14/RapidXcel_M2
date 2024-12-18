import React,{ useState, useEffect, useRef } from 'react';
import Loader from './Loader';
import Modal from './Modal';
import Alert from './Alert';
import "../css/Home.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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


    useEffect(() => {
        const interval = setInterval(() => {
            if(data.length <= 5){
                setalert({
                    status:true,
                    type:"danger",
                    msg:"Low Stocks Level"
                })
            }
        },5000)

        return () => { 
            clearInterval(interval)
            setalert({
                status:false
            })
        };
    }, [data]);

  return (
    <div className='orders-table'>
        { modal.status && <Modal msg="No internet Connection"/> }
        {alert.status && <Alert type={alert.type} msg={alert.msg} />}
        <h2>Stock Management</h2>
        <div className='table-container'>

        <table>
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
                            <td>{stock.stock_id}</td>
                            <td>{stock.stock_name}</td>
                            <td>{stock.price}</td>
                            <td>{stock.quantity}</td>
                            <td>{stock.weight}</td>
                            <td className='actions'>
                                <button className='delete-btn' onClick={ () => { deleteStock(stock.stock_id) } }>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button className='edit-btn'>
                                <Link className='edit-btn' to={`/update/${stock.stock_id}`} >
                                <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                </button>
                            </td>
                        </tr>
                    )
                }) }

            </tbody>
            </table>
            </div>
            { loading && <Loader/> }

            <button type="button" className="btn btn-primary d-none" ref={modalTrigger} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
    </div>
  );
}

export default Home;
