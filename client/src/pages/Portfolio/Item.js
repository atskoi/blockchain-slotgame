/* eslint-disable */
import React from 'react'
// material
import { styled, useTheme } from '@material-ui/core/styles'
import {
  Typography,
  Button,
  Card,
  CardContent ,
  CardMedia,
  CardActionArea, 
  CardActions,
  Divider
} from '@material-ui/core'

export default function MultiActionAreaCard() {
 return (
   <Card sx={{ maxWidth: 300, backgroundColor: "#fff" }}>
     <CardActionArea>
       <CardMedia
         component="img"
         height="100%"
         image="/images/placeholder-portfolio-items.jpg"
         alt="green iguana"
       />
       <CardContent>
         <Typography
           align="left"
           color="primary"
           variant="subtitle1"
         >
           Small sub-text for the section
         </Typography>
         <Typography variant="body2" color="black" align="left">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
           Aliquam eros arcu, malesuada auctor velit feugiat, dapibus
           congue ligula. Etiam ipsum nisl, scelerisque
         </Typography>
       </CardContent>
     </CardActionArea>

     <Divider sx={{
      color:"primary",

     }} />

     <CardActions>
       <Typography variant="body2" color="black">
        VALUE
       </Typography>
       <Button size="small" color="primary">
         1500$
       </Button>
     </CardActions>
   </Card>
 );
}