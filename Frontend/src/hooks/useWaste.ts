import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { waste } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

export function useWaste() {
  const queryClient = useQueryClient();

  // Get all waste items
  const useWasteList = () => {
    return useQuery({
      queryKey: ['waste'],
      queryFn: waste.getAll,
    });
  };

  // Mark item as waste
  const useMarkAsWaste = () => {
    return useMutation({
      mutationFn: ({ cargoId, reason }: { cargoId: string; reason: string }) =>
        waste.markAsWaste(cargoId, reason),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['waste'] });
        queryClient.invalidateQueries({ queryKey: ['cargo'] });
        toast({
          title: 'Success',
          description: 'Item marked as waste successfully',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Failed to mark item as waste',
          variant: 'destructive',
        });
      },
    });
  };

  // Get waste statistics
  const useWasteStatistics = () => {
    return useQuery({
      queryKey: ['waste', 'statistics'],
      queryFn: waste.getStatistics,
    });
  };

  // Process waste items
  const useProcessWaste = () => {
    return useMutation({
      mutationFn: ({ cargoIds, processingMethod }: { cargoIds: string[]; processingMethod: string }) =>
        waste.process(cargoIds, processingMethod),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['waste'] });
        toast({
          title: 'Success',
          description: 'Waste items processed successfully',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Failed to process waste items',
          variant: 'destructive',
        });
      },
    });
  };

  return {
    useWasteList,
    useMarkAsWaste,
    useWasteStatistics,
    useProcessWaste,
  };
} 