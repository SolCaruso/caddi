import Link from "next/link";

export default function ShopHeader() {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="text-sm text-black/50 mb-2 font-medium">
        <ol className="flex items-center space-x-1.5">
          <li>
            <Link href="/" className="hover:text-caddi-blue transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-700">Shop</li>
        </ol>
      </nav>

      {/* Main Heading */}
      <h1 className="text-4xl font-semibold text-caddi-blue font-proxima-nova-extra-condensed">
        ALL PRODUCTS
      </h1>
    </>
  );
} 