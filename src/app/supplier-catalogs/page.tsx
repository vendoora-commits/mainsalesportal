import { SupplierCatalogDashboard } from '@/components/supplier-analysis/SupplierCatalogDashboard';

export const metadata = {
  title: 'Supplier Catalog Analysis | Vendoora',
  description: 'Comprehensive analysis and visualization of all supplier PDF catalogs',
};

export default function SupplierCatalogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <SupplierCatalogDashboard />
        </div>
      </div>
    </div>
  );
}

