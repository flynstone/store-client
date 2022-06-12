import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();

  const handleAddItem = (productId: number) => {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

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
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          size="small"
        >
          Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  );
}
