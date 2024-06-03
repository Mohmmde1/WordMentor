import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function Listing({ books = [], predictions = [] }) {
  return (
    <Tabs defaultValue="books"  >
      <TabsList className="grid w-full grid-cols-2 ">
        <TabsTrigger value="books">Books</TabsTrigger>
        <TabsTrigger value="predictions">Predictions</TabsTrigger>
      </TabsList>
      <TabsContent value="books" className=' h-full'>
        <Card className="xl:col-span-2 h-full" x-chunk="dashboard-01-chunk-4  ">
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
          <CardContent >
            <Table >
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead className="text-center">Pages</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {books.length > 0 ? (
                  books.slice(0, 5).map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <div className="font-medium">{book.title}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          Uploaded At: {book.created_at}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {book.pages}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      No books uploaded
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="predictions" className=' h-full'>
        <Card className="xl:col-span-2 h-full" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Predictions</CardTitle>
              <CardDescription>
                Recent predictions made by AI.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/flashcards">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Predictions</TableHead>
                  <TableHead className="text-center">No Predicated Words</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {predictions.length > 0 ? (
                  predictions.slice(0, 5).map((prediction, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{prediction.book}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          Predicted At: {prediction.created_at}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {prediction.unknown_words.length}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      No predictions have been predicted.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
