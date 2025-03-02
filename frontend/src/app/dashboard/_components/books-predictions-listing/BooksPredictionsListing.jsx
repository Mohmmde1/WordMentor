import {Suspense} from 'react';

import {Table, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {ArrowUpRight} from 'lucide-react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';

import BooksSuspense
  from '../../_suspenses/books-predictions-list/BooksSuspense';
import ListingSkeleton from '../../_skeletons/ListingSkeleton';
import PredictionsListingsSuspense
  from '../../_suspenses/books-predictions-list/PredictionsSuspense';

export default function BooksPredictionsListing () {
  return (
    <Tabs defaultValue="books">
      <TabsList className="grid w-full grid-cols-2 ">
        <TabsTrigger value="books">Books</TabsTrigger>
        <TabsTrigger value="predictions">Sessions</TabsTrigger>
      </TabsList>
      <TabsContent value="books">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4  ">
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
            <ScrollArea className="h-[80vh] sm:h-[400px] w-full p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead className="text-center">Pages</TableHead>
                  </TableRow>
                </TableHeader>
                <Suspense fallback={<ListingSkeleton />}>

                  <BooksSuspense />

                </Suspense>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="predictions">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Sessions</CardTitle>
              <CardDescription>
                Recent predictions made by AI.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/sessions">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[80vh] sm:h-[400px] w-full p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sessions</TableHead>
                    <TableHead className="text-center">
                      No Predicated Words
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <Suspense fallback={<ListingSkeleton />}>
                  <PredictionsListingsSuspense />
                </Suspense>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
