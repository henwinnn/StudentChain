import { useQuery } from '@tanstack/react-query';

const fetchTransactions = async () => {
  const res = await fetch('http://localhost:42069/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query MyQuery {
          transactions(limit: 5) {
            items {
              amount
              blockNumber
              blockTimestamp
              id
              logIndex
              sender
              to
              transactionHash
            }
            totalCount
          }
        }
      `,
    }),
  });

  const { data } = await res.json();
  return data.transactions;
};

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });
};
