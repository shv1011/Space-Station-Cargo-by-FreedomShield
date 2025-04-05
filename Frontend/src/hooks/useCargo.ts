import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cargo } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

export function useCargo() {
  const queryClient = useQueryClient();

  // Get all cargo items
  const useCargoList = (filters?: { type?: string; status?: string; module?: string }) => {
    return useQuery({
      queryKey: ['cargo', filters],
      queryFn: () => cargo.getAll(filters),
    });
  };

  // Get cargo item by ID
  const useCargoItem = (id: string) => {
    return useQuery({
      queryKey: ['cargo', id],
      queryFn: () => cargo.getById(id),
      enabled: !!id,
    });
  };

  // Create cargo item
  const useCreateCargo = () => {
    return useMutation({
      mutationFn: cargo.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cargo'] });
        toast({
          title: 'Success',
          description: 'Cargo item created successfully',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Failed to create cargo item',
          variant: 'destructive',
        });
      },
    });
  };

  // Update cargo item
  const useUpdateCargo = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) =>
        cargo.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cargo'] });
        toast({
          title: 'Success',
          description: 'Cargo item updated successfully',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Failed to update cargo item',
          variant: 'destructive',
        });
      },
    });
  };

  // Delete cargo item
  const useDeleteCargo = () => {
    return useMutation({
      mutationFn: cargo.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cargo'] });
        toast({
          title: 'Success',
          description: 'Cargo item deleted successfully',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Failed to delete cargo item',
          variant: 'destructive',
        });
      },
    });
  };

  // Search cargo items
  const useSearchCargo = (query: string) => {
    return useQuery({
      queryKey: ['cargo', 'search', query],
      queryFn: () => cargo.search(query),
      enabled: !!query,
    });
  };

  return {
    useCargoList,
    useCargoItem,
    useCreateCargo,
    useUpdateCargo,
    useDeleteCargo,
    useSearchCargo,
  };
} 