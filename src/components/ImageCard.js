import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia } from '@mui/material'

const ImageCard = props => {
  const { src } = props
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component='img' image={src} />
    </Card>
  )
}

ImageCard.propTypes = {
  src: PropTypes.string.isRequired
}

export default ImageCard
