import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchOperators, createOperator, deleteOperator, updateOperatorDetails, fetchOperatorById } from '../services/OperatorService';
import { Operator } from '../types/Operator';

export const useFetchOperators = () => {
  return useQuery({
    queryKey: ['operators'],
    queryFn: fetchOperators,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddOperator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOperator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['operators'] });
    },
  });
};

export const useDeleteOperator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOperator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['operators'] });
    },
  });
};

export const useUpdateOperator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOperatorDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['operators'] });
    },
  });
};

export const useFetchOperatorById=(operatorId: string)=>{
  return useQuery({
    queryKey: ['operator', operatorId],
    queryFn: fetchOperatorById,
  });
}