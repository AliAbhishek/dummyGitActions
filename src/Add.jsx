import React, { memo, useEffect, useState } from "react";
import axios from "axios"

const Add = ({flag,setFlag,name,cname,cemail,cnumber,caddress,
  id,
  countryname,
  statename,
  cityname,}) => {
  const [isopen, setisopen] = useState(false);
  const [country,setCountry] = useState([])
  const [state,setState] = useState([])
  const [city,setCity] = useState([])
  
  const [companydata, setcompanydata] = useState({
    CompanyName: "",
    CompanyAddress: "",
    EmailAddress: "",
    ContactNumber: "",
    Active: true,
    CityID: "",
    StateID: "",
    CountryID: "",
    FileUpload: "123",
    test : "",
    FilePath: "",
  });

  useEffect(()=>{
    axios.get("http://dev-softwiz-002/CommonType/GetByCountry").then(res=>setCountry(res.data))

  },[])


  useEffect(()=>{
    axios.get("http://dev-softwiz-002/CommonType/GetByState?CountryId="+companydata.CountryID).then(res=>setState(res.data))
  },[companydata.CountryID])

  useEffect(()=>{
    axios.get("http://dev-softwiz-002/CommonType/GetByCity?StateId="+companydata.StateID).then(res=>setCity(res.data))

  },[companydata.StateID])
  

  

  const handlechange=(e)=>{
     setcompanydata((old)=>({...old,[e.target.name]:e.target.value}))
  }

  const handlesubmit=(e)=>{
    e.preventDefault()
    console.log(companydata)
    if (name==="add"){
      axios.post("http://dev-softwiz-002/Company",
      companydata
    ).then(res=>setFlag(!flag))
    }
    if(name==="edit"){
      axios.put("http://dev-softwiz-002/Company/"+id,companydata).then(res=>console.log(res ))
    }
    

  }


  return (
    <div>
      <button onClick={() =>{ 
        
        setisopen(!isopen)
        setcompanydata({
          CompanyName: cname,
          CompanyAddress: caddress,
          EmailAddress: cemail,
          ContactNumber: cnumber,
          Active: true,
          CityID: cityname,
          StateID: statename,
          CountryID: countryname,
          FileUpload: "123",
          test : "",
          FilePath: "",
        })
        }}>{name==="add"?"ADD":"EDIT"}</button>
      {isopen ? 
      <form onSubmit={handlesubmit} action="">
      <div>
        Name<input onChange={handlechange} type="text" name="CompanyName" id="" value={companydata.CompanyName} /><br /><br />
        Address<input onChange={handlechange} type="text" name="CompanyAddress" id="" value={companydata.CompanyAddress} /><br /><br />
        Email<input onChange={handlechange} type="text" name="EmailAddress" id="" value={companydata.EmailAddress} /><br /><br />
        Contact No.<input onChange={handlechange} type="text" name="ContactNumber" id="" value={companydata.ContactNumber} /><br /><br />
        <select onChange={handlechange}  name="CountryID" id="" value={companydata.CountryID} >
            <option >Country</option>
            {country.map((x)=>{return ( 
                <option value={x.countryId}>{x.countryName}</option>

            )
           })}
        </select><br /><br />
        <select  onChange={handlechange} name="StateID" id="" value={companydata.StateID}>
            <option value="">State</option>
            {state.map((x)=>{return ( 
                <option value={x.StateId}>{x.StateName}</option>

            )
           })}
        </select><br /><br />
        <select onChange={handlechange}  name="CityID" id="" value={companydata.CityID}>
            <option value="">City</option>
            {city.map((x)=>{return ( 
                <option value={x.CityId}>{x.CityName}</option>

            )
           })}
        </select><br /><br />
         <button>{name==="add"?"ADD":"UPDATE"}</button> 
      </div>
      </form>
      
     : null}
    </div>
  );
};

export default memo(Add);
