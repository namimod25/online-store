import { ProductCard } from "@/components/product-card";
import { supabase } from "@/lib/supabase/client";
import { Product } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const search = searchParams?.search as string | undefined;

  let query = supabase.from("products").select("*");

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data: products } = await query.order("created_at", {
    ascending: false,
  });

  return (
    <main className="container py-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>

        <form className="flex gap-2">
          <Input
            name="search"
            placeholder="Search products..."
            defaultValue={search}
            className="max-w-md"
          />
          <Button type="submit" variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product: Product) => (
            <ProductCard imageUrl={""} key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}
