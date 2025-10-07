'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';
import { 
  Users, 
  ShoppingCart, 
  Settings, 
  BarChart3, 
  Package, 
  Lock, 
  Home,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity
} from 'lucide-react';

// Mock data for the admin dashboard
const mockStats = {
  totalOrders: 1247,
  totalRevenue: 2847392,
  activeCustomers: 892,
  pendingOrders: 23,
  completedOrders: 1156,
  cancelledOrders: 68,
  averageOrderValue: 2283,
  conversionRate: 3.2,
  monthlyGrowth: 12.5,
};

const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'Grand Hotel Downtown',
    email: 'manager@grandhotel.com',
    amount: 15420,
    status: 'completed',
    date: '2024-01-15',
    items: ['Kiosk Premium', 'Smart Locks Pro', 'Room Features Basic'],
  },
  {
    id: 'ORD-002',
    customer: 'Seaside Resort',
    email: 'admin@seasideresort.com',
    amount: 28950,
    status: 'processing',
    date: '2024-01-14',
    items: ['Kiosk Enterprise', 'Smart Locks Enterprise', 'Room Features Premium'],
  },
  {
    id: 'ORD-003',
    customer: 'City Center Inn',
    email: 'owner@citycenterinn.com',
    amount: 8750,
    status: 'pending',
    date: '2024-01-13',
    items: ['Kiosk Basic', 'Smart Locks Basic', 'Room Features Basic'],
  },
  {
    id: 'ORD-004',
    customer: 'Mountain View Lodge',
    email: 'info@mountainviewlodge.com',
    amount: 19680,
    status: 'completed',
    date: '2024-01-12',
    items: ['Kiosk Premium', 'Smart Locks Premium', 'Room Features Premium'],
  },
  {
    id: 'ORD-005',
    customer: 'Business Hotel Chain',
    email: 'procurement@businesshotel.com',
    amount: 45200,
    status: 'processing',
    date: '2024-01-11',
    items: ['Kiosk Enterprise x3', 'Smart Locks Enterprise x5', 'Room Features Enterprise'],
  },
];

const mockProducts = [
  {
    id: 'kiosk-basic',
    name: 'Basic Kiosk',
    category: 'kiosk',
    price: 2500,
    stock: 45,
    sales: 156,
    status: 'active',
  },
  {
    id: 'kiosk-premium',
    name: 'Premium Kiosk',
    category: 'kiosk',
    price: 4500,
    stock: 23,
    sales: 89,
    status: 'active',
  },
  {
    id: 'lock-basic',
    name: 'Basic Smart Lock',
    category: 'smart-lock',
    price: 180,
    stock: 234,
    sales: 445,
    status: 'active',
  },
  {
    id: 'lock-premium',
    name: 'Premium Smart Lock',
    category: 'smart-lock',
    price: 320,
    stock: 67,
    sales: 234,
    status: 'active',
  },
  {
    id: 'features-basic',
    name: 'Basic Room Features',
    category: 'room-features',
    price: 1200,
    stock: 89,
    sales: 167,
    status: 'active',
  },
];

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'kiosk':
        return <Package className="h-4 w-4" />;
      case 'smart-lock':
        return <Lock className="h-4 w-4" />;
      case 'room-features':
        return <Home className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(mockStats.totalRevenue)}</p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{mockStats.monthlyGrowth}% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{mockStats.totalOrders.toLocaleString()}</p>
                <p className="text-sm text-blue-600 flex items-center">
                  <Activity className="h-3 w-3 mr-1" />
                  {mockStats.pendingOrders} pending
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold">{mockStats.activeCustomers.toLocaleString()}</p>
                <p className="text-sm text-purple-600 flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {mockStats.conversionRate}% conversion rate
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold">{formatCurrency(mockStats.averageOrderValue)}</p>
                <p className="text-sm text-orange-600 flex items-center">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  +5.2% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'overview' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab('orders')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'orders' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setSelectedTab('products')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'products' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setSelectedTab('analytics')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'analytics' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(order.amount)}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best performing products by sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProducts
                    .sort((a, b) => b.sales - a.sales)
                    .slice(0, 5)
                    .map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getCategoryIcon(product.category)}
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.sales} sales</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(product.price)}</p>
                          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        )}

        {/* Orders Tab */}
        {selectedTab === 'orders' && (
          <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>Manage and track all customer orders</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Orders Table */}
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold">{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Amount</p>
                        <p className="font-semibold">{formatCurrency(order.amount)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date</p>
                        <p className="font-semibold">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Email</p>
                        <p className="font-semibold">{order.email}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-gray-600 text-sm mb-2">Items:</p>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </div>
        )}

        {/* Products Tab */}
        {selectedTab === 'products' && (
          <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>Manage your product catalog and inventory</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        {getCategoryIcon(product.category)}
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-600">ID: {product.id}</p>
                        </div>
                        <Badge variant="outline">
                          {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Price</p>
                        <p className="font-semibold">{formatCurrency(product.price)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Stock</p>
                        <p className="font-semibold">{product.stock} units</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Sales</p>
                        <p className="font-semibold">{product.sales} sold</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Status</p>
                        <Badge className={product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>Revenue and order trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-xl font-bold">{formatCurrency(mockStats.totalRevenue)}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Orders This Month</p>
                      <p className="text-xl font-bold">{mockStats.totalOrders}</p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                      <p className="text-xl font-bold">{mockStats.conversionRate}%</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
                <CardDescription>Breakdown of orders by status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Completed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{mockStats.completedOrders}</span>
                      <span className="text-sm text-gray-600">
                        ({((mockStats.completedOrders / mockStats.totalOrders) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{mockStats.pendingOrders}</span>
                      <span className="text-sm text-gray-600">
                        ({((mockStats.pendingOrders / mockStats.totalOrders) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Pending</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{mockStats.pendingOrders}</span>
                      <span className="text-sm text-gray-600">
                        ({((mockStats.pendingOrders / mockStats.totalOrders) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Cancelled</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{mockStats.cancelledOrders}</span>
                      <span className="text-sm text-gray-600">
                        ({((mockStats.cancelledOrders / mockStats.totalOrders) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
