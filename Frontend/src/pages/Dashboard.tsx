import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card 
          className="cursor-pointer hover:bg-gray-50"
          onClick={() => navigate('/inventory')}
        >
          <CardHeader>
            <CardTitle>Inventory Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage all items in inventory</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:bg-gray-50"
          onClick={() => navigate('/cargo')}
        >
          <CardHeader>
            <CardTitle>Cargo Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Track and manage cargo shipments</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:bg-gray-50"
          onClick={() => navigate('/waste')}
        >
          <CardHeader>
            <CardTitle>Waste Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Monitor and process waste materials</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 