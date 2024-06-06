import {ScrollArea} from '@/components/ui/scroll-area';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';



import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

export default function WordsListing({knownWords, unknownWords}) {
  return (
    <Tabs defaultValue="known-words">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="known-words">Known Words</TabsTrigger>
        <TabsTrigger value="unknown-words">Unknown Words</TabsTrigger>
      </TabsList>

      <TabsContent value="known-words" className="h-full">

        <Card className="xl:col-span-2 h-full" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Known Words</CardTitle>
              <CardDescription>
                Words you already know.
              </CardDescription>
            </div>
  
          </CardHeader>
          <CardContent>

            <ScrollArea className="h-[80vh] sm:h-[400px] w-full p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Word</TableHead>
                    <TableHead className="text-center">Learned At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {knownWords.length > 0
                    ? knownWords.map ((word, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="font-medium">{word.word}</div>
                          </TableCell>
                          <TableCell className="text-center">
                            {word.learned_at}
                          </TableCell>
                        </TableRow>
                      ))
                    : <TableRow className="mt-3 text-right text-gray-700 dark:text-gray-300 font-medium">
                        No known words
                      </TableRow>}
                </TableBody>
              </Table>

            </ScrollArea>
          </CardContent>
        </Card>

      </TabsContent>
      <TabsContent value="unknown-words" className="h-full">
        <Card className="xl:col-span-2 h-full" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Unknown Words</CardTitle>
              <CardDescription>
                Words you need to learn.
              </CardDescription>
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
                <TableBody>
                  {unknownWords.length > 0
                    ? unknownWords.map ((word, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="font-medium">{word.word}</div>
                          </TableCell>
                          <TableCell className="text-center">
                            {word.added_at}
                          </TableCell>
                        </TableRow>
                      ))
                    : <TableRow className="mt-3 text-right text-gray-700 dark:text-gray-300 font-medium">
                        No unknown words
                      </TableRow>}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

    </Tabs>
  );
}
