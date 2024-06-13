import {Suspense} from 'react';

import {ScrollArea} from '@/components/ui/scroll-area';
import ListingSkeleton from '../../skeletons/ListingSkeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {TableHead, TableHeader, Table, TableRow} from '@/components/ui/table';


import WordsListingSuspense
  from '../../suspenses/words-list/WordsListingSuspense';

export default function WordsListing () {
  return (
    <Tabs defaultValue="known-words">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="known-words">Known Words</TabsTrigger>
        <TabsTrigger value="unknown-words">Unknown Words</TabsTrigger>
      </TabsList>

      <TabsContent value="known-words">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Known Words</CardTitle>
              <CardDescription>Words you already know.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[80vh] sm:h-[400px] w-full p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Word</TableHead>
                    <TableHead className="text-center">Added At</TableHead>
                  </TableRow>
                </TableHeader>
                <Suspense fallback={<ListingSkeleton />}>

                  <WordsListingSuspense type={"known"} />
                </Suspense>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="unknown-words">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Unknown Words</CardTitle>
              <CardDescription>Words you need to learn.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[80vh] sm:h-[400px] w-full p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Word</TableHead>
                    <TableHead className="text-center">Added At</TableHead>
                  </TableRow>
                </TableHeader>
                <Suspense fallback={<ListingSkeleton />}>

                <WordsListingSuspense type={"unknown"} />
                </Suspense>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
