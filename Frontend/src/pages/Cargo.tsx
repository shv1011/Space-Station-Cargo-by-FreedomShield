import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Filter, Search, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllCargo, updateCargo } from '@/lib/api';
import { useNotifications } from '@/contexts/NotificationContext';

export default function Cargo() {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [cargo, setCargo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchCargo = async () => {
      try {
        const data = await getAllCargo();
        setCargo(data);
      } catch (error) {
        console.error('Failed to fetch cargo:', error);
        addNotification('error', 'Failed to fetch cargo items');
      }
    };

    fetchCargo();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateCargo(id, { status: newStatus });
      setCargo(cargo.map(item => 
        item._id === id ? { ...item, status: newStatus } : item
      ));
      addNotification('success', 'Cargo status updated successfully');
    } catch (error) {
      console.error('Failed to update cargo status:', error);
      addNotification('error', 'Failed to update cargo status');
    }
  };

  const filteredCargo = cargo
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.destination.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !filterType || item.type === filterType;
      const matchesStatus = !filterStatus || item.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cargo Management</h1>
        <Button onClick={() => navigate('/cargo/add')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Cargo
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search cargo..."
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
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
            <SelectItem value="medical">Medical</SelectItem>
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
            <SelectItem value="in-transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCargo.map((item) => (
          <Card key={item._id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Type: {item.type}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Weight: {item.weight} kg</p>
              <p>Destination: {item.destination}</p>
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
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="mt-2">Priority: {item.priority}</p>
              {item.notes && <p className="mt-2 text-sm text-gray-500">Notes: {item.notes}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 