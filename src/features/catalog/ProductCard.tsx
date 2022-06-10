import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

export default function ProductCard({product}: Props) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: 'secondary.main'}}>
            {product.name.charAt(0).toLocaleUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: {fontWeight: 'bold', color: 'primary.main', fontFamily: 'Grandstander'}
        }}
      />
      <CardMedia
        component="img"
        sx={{ backgroundSize: 'contain' }}
        image={product.pictureUrl}
        alt="default"
        title={product.name}
      />
      <CardContent>
        <p>
          ${(product.price / 100).toFixed(2)}
        </p>
        <br />
        <p>
          {product.brand} / {product.type}
        </p>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  );
}
