import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {ArrowUpRight} from 'lucide-react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
export default function Listing ({books}) {
  return (
    <div>
      <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Books</CardTitle>
            <CardDescription>
              Recent books that you have uploaded.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/books">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead className="text-right">Pages</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {books.map((book) =>  (
                    <TableRow>
                    <TableCell>
                        <div className="font-medium">{book.title}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            mohammed@gmail.com
                        </div>
                    </TableCell><TableCell className="text-right">{book.pages}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
