import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Filter, Search, ArrowUpDown, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllWaste, updateWaste, deleteWaste } from '@/lib/api';
import { useNotifications } from '@/contexts/NotificationContext';

export default function Waste() {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [waste, setWaste] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('type');

  useEffect(() => {
    const fetchWaste = async () => {
      try {
        const data = await getAllWaste();
        setWaste(data);
      } catch (error) {
        console.error('Failed to fetch waste:', error);
        addNotification('error', 'Failed to fetch waste items');
      }
    };

    fetchWaste();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateWaste(id, { status: newStatus });
      setWaste(waste.map(item => 
        item._id === id ? { ...item, status: newStatus } : item
      ));
      addNotification('success', 'Waste status updated successfully');
    } catch (error) {
      console.error('Failed to update waste status:', error);
      addNotification('error', 'Failed to update waste status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWaste(id);
      setWaste(waste.filter(item => item._id !== id));
      addNotification('success', 'Waste item deleted successfully');
    } catch (error) {
      console.error('Failed to delete waste item:', error);
      addNotification('error', 'Failed to delete waste item');
    }
  };

  const filteredWaste = waste
    .filter(item => {
      const matchesSearch = item.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !filterType || item.type === filterType;
      const matchesStatus = !filterStatus || item.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      if (sortBy === 'quantity') return b.quantity - a.quantity;
      return 0;
    });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Waste Management</h1>
        <Button onClick={() => navigate('/waste/add')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Waste
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search waste..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="organic">Organic</SelectItem>
            <SelectItem value="recyclable">Recyclable</SelectItem>
            <SelectItem value="hazardous">Hazardous</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="disposed">Disposed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="type">Type</SelectItem>
            <SelectItem value="quantity">Quantity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWaste.map((item) => (
          <Card key={item._id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{item.type}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item._id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p>Quantity: {item.quantity}</p>
              <p>Weight: {item.weight} kg</p>
              <div className="flex items-center gap-2 mt-2">
                <p>Status:</p>
                <Select
                  value={item.status}
                  onValueChange={(value) => handleStatusUpdate(item._id, value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="disposed">Disposed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="mt-2">Processing Method: {item.processingMethod}</p>
              {item.notes && <p className="mt-2 text-sm text-gray-500">Notes: {item.notes}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
