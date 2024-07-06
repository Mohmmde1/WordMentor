'use client';

import {ArrowUpDown, MoreHorizontal} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
import {deleteBook} from '@/lib/actions';
import Selection from './Selection';
import Image from 'next/image';

export const columns = [
  {
    id: 'select',
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: '3d_picture',
    header: () => null,  // Hide the header
    cell: ({row}) => {
      const book = row.original;
      return <Image src="/3d-book2.png" alt={`${book.title} 3D`} width="50" height="50" />;
    },
    enableSorting: false, // Disable sorting for this column if needed
  },
  {
    accessorKey: 'title',
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const book = row.original;
      return (
        <div className="flex items-center">
          {book.title}
        </div>
      );
    },
  },
  {
    accessorKey: 'pages',
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
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
    },
  },
  {
    accessorKey: 'created_at',
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
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
        <Dialog>
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
                onClick={() => navigator.clipboard.writeText(book.id)}
              >
                Copy book ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a
                  href={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/${book.file_path}`}
                  target="_blank"
                >
                  View book
                </a>
              </DropdownMenuItem>
              <DialogTrigger>
                <DropdownMenuItem>
                  Select Pages
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem
                onClick={async () => {
                  await deleteBook(book.id);
                  console.log('Delete book');
                }}
              >
                Delete book
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select pages from and to</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Select the pages you want to parse
            </DialogDescription>
            <Selection noPages={book.pages} bookId={book.id} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
