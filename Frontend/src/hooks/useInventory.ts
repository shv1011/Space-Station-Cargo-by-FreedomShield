import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventory } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

export function useInventory() {
  const queryClient = useQueryClient();

  // Get inventory summary
  const useInventorySummary = () => {
    return useQuery({
      queryKey: ['inventory', 'summary'],
      queryFn: inventory.getSummary,
    });
  };

  // Get inventory by location
  const useInventoryByLocation = () => {
    return useQuery({
      queryKey: ['inventory', 'location'],
      queryFn: inventory.getByLocation,
    });
  };

  // Get low stock items
  const useLowStockItems = (threshold?: number) => {
    return useQuery({
      queryKey: ['inventory', 'low-stock', threshold],
      queryFn: () => inventory.getLowStock(threshold),
    });
  };

  // Get expiring items
  const useExpiringItems = (days?: number) => {
    return useQuery({
      queryKey: ['inventory', 'expiring', days],
      queryFn: () => inventory.getExpiring(days),
    });
  };

  // Transfer items
  const useTransferItem = () => {
    return useMutation({
      mutationFn: ({ cargoId, newLocation }: { cargoId: string; newLocation: { module: string; rack: string } }) =>
        inventory.transfer(cargoId, newLocation),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['inventory'] });
        queryClient.invalidateQueries({ queryKey: ['cargo'] });
        toast({
          title: 'Success',
          description: 'Item transferred successfully',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Failed to transfer item',
          variant: 'destructive',
        });
      },
    });
  };

  return {
    useInventorySummary,
    useInventoryByLocation,
    useLowStockItems,
    useExpiringItems,
    useTransferItem,
  };
} 