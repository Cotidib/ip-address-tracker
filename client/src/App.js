import React , {useState,useEffect,useCallback,useRef} from 'react';
import Map from './Map';
import Spinner from './Spinner.js';
import arrow from './images/icon-arrow.svg'
import pattern from './images/pattern-bg.png'

function App() {
  const [ip, setIp] = useState();
  const [coordinates,setCoordinates] = useState({});
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");

  const [input,setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const firstIpUpdate = useRef(false);

  const fetchAutoIP = useCallback(async () => {
    try{
      console.log('getting current ip');
      const ipresponse = await fetch(`/autoip`);
      const autoip = await ipresponse.json();
      setIp(autoip);
      firstIpUpdate.current = true;
      
    }
    catch(error){
      console.log(error.message);
    }
    
  },[])

  useEffect(() => {
    fetchAutoIP()
  },[fetchAutoIP])

  const fetchLocation = useCallback(async () => {
    if(firstIpUpdate.current)
    {
      setLoading(true)
      try{
        console.log('getting location');
        const georesponse = await fetch(`/geoloc/${ip}`);
        const obj = await georesponse.json();
        const loc = obj.location;
        // console.log(obj);
        const {country,region,city,lat,lng,timezone} = loc;
        setCoordinates({lat,lng});
        setCountry(country);
        setRegion(region);
        setCity(city);
        setTimezone(timezone);
        setIsp(obj.isp);
        setLoading(false);
      }
      catch(error){
        console.log(error.message);
        alert("Woops! Something went wrong! I cant find that IP. Wait while I load the default IP again");
        fetchAutoIP();
      }
    }  
    
  },[fetchAutoIP, ip])

  useEffect(() => {
    fetchLocation();
  },[fetchLocation])

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    setIp(input);
  }

    return (
      <main>
        <img className='pattern' src={pattern} alt=''/>
        <section className='header-container'>
          <h1>IP Adress Tracker</h1>
          <div className='form-control'>
            <input type='text' value={input} onChange={handleInput}/>
            <button type='submit' onClick={handleSubmit}><img src={arrow} alt='arrow'/></button>
          </div>
          <div className='display-container'>
            <div className='display-item'>
              <p>ip adress</p>
              <h3>{loading ? <Spinner loading={loading}/> : ip}</h3>
            </div>
            <div className='display-item'>
              <p>location</p>
              <h3>{loading ? <Spinner loading={loading}/> : `${city}, ${region}, ${country}`}</h3>
            </div>
            <div className='display-item'>
              <p>timezone</p>
              <h3>{loading ? <Spinner loading={loading}/> : `UTC ${timezone}`}</h3>
            </div>
            <div className='display-item'>
              <p>isp</p>
              <h3>{loading ? <Spinner loading={loading}/> : isp}</h3>
            </div> 
          </div>
        </section>
        {loading? <div className='map-loader' ><Spinner loading={loading}/></div> : <Map lat={coordinates.lat} lng={coordinates.lng} ip={ip}/>}
      </main>
    );
}


export default App;
