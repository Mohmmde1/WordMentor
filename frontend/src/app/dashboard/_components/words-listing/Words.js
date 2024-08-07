import {TableBody, TableCell, TableRow} from '@/components/ui/table';

export default function Words({words, message}) {
  return (
    <TableBody>
      {words.length > 0
        ? words.map ((word, index) => (
            <TableRow key={word.id || index}>
              <TableCell>
                <div className="font-medium">{word.word}</div>
              </TableCell>
              <TableCell className="text-center">
                {word.added_at}
              </TableCell>
            </TableRow>
          ))
        : <TableRow className="mt-3 text-right text-gray-700 dark:text-gray-300 font-medium">
            <TableCell className="text-center" colSpan={2}>
              {message}
            </TableCell>
          </TableRow>}
    </TableBody>
  );
}
