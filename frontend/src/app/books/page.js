import {Badge} from '@/components/ui/badge';
import {columns} from './Columns';
import {DataTable} from './DataTable';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {fetchBooks, getStatus} from '@/lib/actions';

async function getData () {
  // Fetch book data from books API
  const response = await fetchBooks ();
  return response;
}

export default async function Page () {
  const data = await getData ();
  const status = await getStatus ();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <div className="flex justify-between">

          <CardTitle className="p-4">Books</CardTitle>
          <CardTitle className="p-4 text-sm">

            {status === 'completed'
              ? <HoverCard>
                  <HoverCardTrigger>
                    <Badge>Model is Ready</Badge>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Model is ready to predict unknown words. You can select the book and pages to predict the unknown words.
                  </HoverCardContent>
                </HoverCard>
              : <HoverCard>
                  <HoverCardTrigger>
                    <Badge>Model Not Ready</Badge>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Model is not ready to predict unknown words. Please wait for the model to be ready.
                  </HoverCardContent>
                </HoverCard>}

          </CardTitle>
        </div>
        <CardDescription className="p-4">
          Manage your books and select pages to predict unknown words.
        </CardDescription>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
