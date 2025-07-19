import { Container } from "@/components/ui/container";
import ShopSidebar from "@/components/pages/shop/ShopSidebar";
import ProductGrid from "@/components/pages/shop/ShopGrid";

export default function ShopPage() {
  return (
    <main className="flex-1 bg-white flex flex-col">
      <Container className="flex-1">

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8 flex-1 mb-24 lg:mt-24">
          <ShopSidebar />
          <ProductGrid />
        </div>

      </Container>
    </main>
  );
}
