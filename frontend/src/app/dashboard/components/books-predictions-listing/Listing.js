import {TableBody, TableCell, TableRow} from '@/components/ui/table';

export default function Listing({list, message}) {
  console.log(list)
  return (
    <TableBody>
      {list.length > 0
        ? list.slice (0, 5).map (item => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="font-medium">{item.title || item.book}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  Uploaded At: {item.created_at}
                </div>
              </TableCell>
              <TableCell className="text-center">
                {item.pages || item.unknown_words}
              </TableCell>
            </TableRow>
          ))
        : <TableRow>
            <TableCell colSpan={2} className="text-center">
              {message}
            </TableCell>
          </TableRow>}
    </TableBody>
  );
}
