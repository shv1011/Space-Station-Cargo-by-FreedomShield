import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function Inventory() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Button onClick={() => navigate('/inventory/add')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventory.map((item) => (
          <Card key={item._id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Type: {item.type}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Weight: {item.weight} kg</p>
              <p>Status: {item.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
