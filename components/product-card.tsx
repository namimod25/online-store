import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export function ProductCard({
  //id,
  name,
  description,
  price,
  imageUrl,
  stock,
}: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="truncate">{name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative aspect-square">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded-md object-cover"
          />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${price.toFixed(2)}</span>
          <Badge variant={stock > 0 ? "default" : "destructive"}>
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={stock === 0}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
