'use client';

import {ArrowUpDown, MoreHorizontal} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteBook } from '@/lib/actions';

export const columns = [
  {
    id: 'select',
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected () ||
            (table.getIsSomePageRowsSelected () && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected (!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected ()}
        onCheckedChange={value => row.toggleSelected (!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting (column.getIsSorted () === 'asc')}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
  },
  {
    accessorKey: 'pages',
    header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting (column.getIsSorted () === 'asc')}
            className="text-left"
            
          >
            Pages
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    cell: ({row}) => {
      return (
        <div className="text-center pr-16">
          {row.original.pages}
        </div>
      );
    }
  },

  {
    accessorKey: 'created_at',
    header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting (column.getIsSorted () === 'asc')}
          >
            Uploaded At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
  },
  {
    id: 'actions',
    cell: ({row}) => {
      const book = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText (book.id)}
            >
              Copy book ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View book</DropdownMenuItem>
            <DropdownMenuItem>Select pages</DropdownMenuItem>
            <DropdownMenuItem onClick={async ()=> {
                await deleteBook(book.id);
                console.log('Delete book');
            }}>Delete book</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
