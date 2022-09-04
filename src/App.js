import React, {useState, useEffect} from 'react';
import './App.css';
import PieChartData from './components/PieChartData'
import axios from "axios"


const axiosInstance = axios.create({
  baseURL: 'https://imdb8.p.rapidapi.com/',
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '35cdd7fc24msh1935a3a3988a735p1701e0jsn9bf4b1571a99',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
  },
})


function App() {
  
  const [actorsAwards, setActorsAwards] = useState([])
  const [awardYear, setAwardYear] = useState([])
  const [countYear, setCountYear] = useState([])

  const fetchActors = async () => {
    try {
      const response = await axiosInstance.get(
        'actors/get-awards?nconst=nm0001667'
      )
      setActorsAwards(response.data.resource.awards)
      const years = response.data.resource.awards.map((item) => item.year)
      setAwardYear(years)
      const outcome = Object.values(
        years.reduce((acc,item) => {
          if (acc[item]) {
            acc[item].name = item
            acc[item].value += 1
          }
          else {
            acc[item] = {
              name: item,
              value: 1,
            }
          }
          return acc
        }, {})
      )
      setCountYear(outcome)
    } catch (error) {
      console.log({ error })
    }
  }
  useEffect(() => {
    fetchActors()
  }, [])
console.log({ actorsAwards }, { awardYear }, { countYear })

  return (
    <div className="app">
      <h1 className="title">PieChart of Year of Award against Number of Award in each year.</h1>
      {countYear.length > 0?<PieChartData countYear={countYear} />: null}
      
    </div>
  );
}

export default App;


