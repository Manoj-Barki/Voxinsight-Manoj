import Topbar from './components/Topbar'
import Content from './components/Content'
import {useState, useEffect} from 'react';
import axios from "axios";
import {Chart as chartjs} from 'chart.js/auto'; 
import {Bar, Doughnut} from 'react-chartjs-2';
import './App.css' 

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [posRev, setPos] = useState(null);
  const [negRev, setNeg] = useState(null);
  const [neuRev, setNeu] = useState(null);
  const [totRev, setRev] = useState(null);
  const [posScore, setposScore] = useState(null);
  const [negScore, setnegScore] = useState(null);
 
  useEffect( ()=> {

    const fecthData = async() => {
    setLoading(true); 
    setError(null);    

    try{
      const response = await axios.get("http://localhost:5000/api");
      const result = response.data;
      setData(result); 
      setPos(result.PosRevs);
      setNeg(result.NegRevs);
      setNeu(result.NeuRevs);
      setRev(result.numRevs);
      setposScore(result.PosScore);
      setnegScore(result.NegScore);

    } 
    catch(err) 
    {
      setError('Failed to fetch data');
    } 
    finally 
    {
      setLoading(false);  
    }
  }
  fecthData();
  
  }, []);

  return (
    <div className='body'>
      <Topbar />
      {loading && 
      <div className='loading'>
        <div className='loadOut'>
          <div className='loadIn'></div>
        </div>
      </div>}
      {!loading && 
      <div className='lower'>
        <Content/>
        <div className='conRight'>
          <div>
            <div className='graph'>
              {/* <div className='pos'></div>
              <div className='neg'></div>
              <div className='neu'></div> */}
              <h4>Intensity of Reviews</h4>
              <Bar data={{
                labels:["Positive", "Negative"],
                datasets:[
                  {
                    label: "",
                    backgroundColor: "#1f1f1f",
                    data: [0,0]
                  },
                  {
                    backgroundColor: "#00da0b",
                    borderRadius: 4,
                    label: "Positive", 
                    data: [posScore,0]
                  },
                  {
                    backgroundColor: [ "#ff0000"], 
                    label: "Negative",
                    borderRadius: 4,
                    data:[ 0, negScore]
                  },
                  {
                    label: "",
                    backgroundColor: "#1f1f1f",
                    data: [0,0]
                  }
                ]
              }}/>
            </div>

          </div>
          <div>
            <div className='pie'>
              <Doughnut data={{
                labels: ['Positive', 'Negative', 'Neutral'],
                datasets: [
                  {
                    label: [""],
                    data: [posRev, negRev, neuRev],
                    hoverOffset: 20,
                    backgroundColor: ["#00da0b", "#ff0000", "#fbff00"],
                    borderWidth: 0
                  }
                ]
              }}/>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )}

export default App
