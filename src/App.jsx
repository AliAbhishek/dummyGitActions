import React, { useEffect, useState } from 'react'
import axios from "axios"
import Add from './Add'


const App = () => {

  const [data,setData]  = useState([])
  const [flag,setFlag] = useState(true)

  useEffect(()=>{
    axios.get("http://dev-softwiz-002/Company").then(res=>setData(res.data))

  },[flag])

 
  const handledelete=(id)=>{
    axios.delete("http://dev-softwiz-002/Company/"+id).then(res=>setFlag(!flag))

  }

  return (
    // <div>
    //   <div><Add name="add" flag={flag} setFlag={setFlag}/></div>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Name</th>
    //         <th>Address</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {data.map((x)=>{return <tr>
    //         <td>{x.CompanyName}</td>
    //         <td>{x.CompanyAddress}</td>
    //         <td><button><Add name="edit" id={x.CompanyID} cname={x.CompanyName} caddress={x.CompanyAddress}  
                              
    //                           cemail={x.EmailAddress}
    //                           cnumber={x.ContactNumber}
                              
    //                           setFlag={setFlag}
    //                           flag={flag}
    //                           countryname={x.CountryID}
    //                           statename={x.StateID}
    //                           cityname={x.CityID}
    //                           imageurl={x.FilePath}/></button></td>
    //         <td><button onClick={()=>handledelete(x.CompanyID)}>Delete</button></td>
    //       </tr>})}
    //     </tbody>
    //   </table>
    // </div>
    <p>hello world</p>
  )
}

export default App