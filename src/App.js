import './App.css'
import React, { useState, useEffect } from 'react'

import { Grid, CircularProgress } from '@mui/material'
import SearchBar from './components/SearchBar'
import ImageCard from './components/ImageCard'

const App = () => {
  const [hits, setHits] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  //Default request
  useEffect(() => {
    setIsLoading(true)
    fetchData('Flower', '')
  }, [])

  //process research by user (API)
  const process = (search, colors) => {
    let searchText = search.split(' ').join('+')
    let colorText = ''
    for (let value of colors) {
      colorText += value + '+'
    }
    setIsLoading(true)
    fetchData(searchText, colorText)
  }

  //Fetch data from Pixabay API
  const fetchData = async (searchText, colorText) => {
    await fetch(
      `https://pixabay.com/api/?key=17555297-46a99d3dc7abf78679ec9e640&q=${searchText}&image_type=photo&colors=${colorText}`
    )
      .then(res => res.json())
      .then(
        result => {
          setHits(result.hits)
          setIsLoading(false)
        },
        error => {
          setError(true)
          setIsLoading(false)
        }
      )
  }

  return (
    <div className='App'>
      <SearchBar process={process}></SearchBar>
      <div className='container'>
        {!error && !isLoading && (
          <Grid container direction='row' alignItems='center' spacing={3}>
            {hits.map(hit => (
              <Grid item xs={3}>
                <ImageCard key={hit.id} src={hit.webformatURL} />
              </Grid>
            ))}
          </Grid>
        )}
        {error && !isLoading && (
          <h3 className='error'>
            Une erreur est survenue veuillez reessayer plus tard
          </h3>
        )}
        {isLoading && (
          <div className='loading'>
            <CircularProgress size={80} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
