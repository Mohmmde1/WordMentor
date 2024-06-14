import {
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';

import {Skeleton} from '@/components/ui/skeleton';

export default function ListingSkeleton () {
  const renderSkeletonRows = count =>
    Array.from ({length: count}).map ((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton className="h-4 w-[100px]" />
        </TableCell>
        <TableCell className="text-center">
          <Skeleton className="h-4 w-[100px]" />
        </TableCell>
      </TableRow>
    ));

  return (
    
      <TableBody>
        {renderSkeletonRows (6)}
        {' '}
      </TableBody>

  );
}
