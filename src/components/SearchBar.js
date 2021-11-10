import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  OutlinedInput,
  FormControl,
  InputLabel
} from '@mui/material'

//Select UI
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

//Colors list
const colors = [
  'grayscale',
  'transparent',
  'red',
  'orange',
  'yellow',
  'green',
  'turquoise',
  'blue',
  'lilac',
  'pink',
  'white',
  'gray',
  'black',
  'brown'
]

const SearchBar = props => {
  const { process } = props
  const [colorsName, setColorsName] = useState([])
  const [search, setSearch] = useState('')

  //Change value of multiple select
  const handleChangeSelect = event => {
    const {
      target: { value }
    } = event
    setColorsName(typeof value === 'string' ? value.split(',') : value)
  }

  //change value of search input
  const handleChangeSearch = event => {
    setSearch(event.target.value)
  }

  //Handle new search
  const handleSubmit = e => {
    e.preventDefault()
    process(search, colorsName)
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}
      >
        <Grid item>
          <FormControl sx={{ m: 1, width: 300 }}>
            <TextField
              required
              id='outlined-basic'
              label='Search'
              variant='outlined'
              value={search}
              onChange={handleChangeSearch}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id='select-colors-label'>Color(s)</InputLabel>
            <Select
              labelId='select-colors-label'
              id='select-colors'
              multiple
              value={colorsName}
              onChange={handleChangeSelect}
              input={<OutlinedInput label='Color(s)' />}
              MenuProps={MenuProps}
            >
              {colors.map(color => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant='outlined' type='submit'>
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

SearchBar.propTypes = {
  save: PropTypes.func.isRequired
}

export default SearchBar
