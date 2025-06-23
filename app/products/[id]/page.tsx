import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <main className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square bg-muted rounded-lg">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < 4 ? "fill-primary" : ""}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(24 reviews)</span>
          </div>

          <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>

          <p className="text-muted-foreground mb-8">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                -
              </Button>
              <span className="w-10 text-center">1</span>
              <Button variant="outline" size="icon">
                +
              </Button>
            </div>
            <Button className="flex-1">Add to cart</Button>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <h3 className="font-medium">Availability</h3>
              <p className="text-muted-foreground">
                {product.stock > 0 ? "In stock" : "Out of stock"}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Category</h3>
              <p className="text-muted-foreground">Electronics</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Product Details</h2>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </section>
    </main>
  );
}
