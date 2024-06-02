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

export default function WordsListing({ knownWords, unknownWords }) {
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
              <CardDescription>
                Words you already know.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/known-words">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Word</TableHead>
                  <TableHead className="text-center">Learned At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {knownWords.length > 0 ? (
                  knownWords.slice(0, 5).map((word, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{word.word}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        {word.learned_at}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="mt-3 text-right text-gray-700 dark:text-gray-300 font-medium">
                    No known words
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="unknown-words">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Unknown Words</CardTitle>
              <CardDescription>
                Words you need to learn.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/unknown-words">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Word</TableHead>
                  <TableHead className="text-center">Added At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unknownWords.length > 0 ? (
                  unknownWords.slice(0, 5).map((word, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{word.word}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        {word.added_at}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="mt-3 text-right text-gray-700 dark:text-gray-300 font-medium">
                    No unknown words
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
