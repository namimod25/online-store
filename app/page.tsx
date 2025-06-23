import { ProductCard } from "@/components/product-card";
import { supabase } from "@/lib/supabase/client";
import { Product } from "@/types";

export default async function Home() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <main className="container py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to Our Store
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Discover amazing products at great prices
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product: Product) => (
            <ProductCard imageUrl={""} key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}
