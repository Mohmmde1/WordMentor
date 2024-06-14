import {Badge} from '@/components/ui/badge';
import {columns} from './_components/Columns';
import {DataTable} from './_components/DataTable';

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
import Link from 'next/link';
import {ArrowLeft} from 'lucide-react';
async function getData () {
  // Fetch book data from books API
  const response = await fetchBooks ();
  return response;
}

export default async function Page () {
  const data = await getData ();
  const status = await getStatus ();

  return (
    <div className="container  py-10">
      <div className="space-y-1.5 mb-4">
        {/* Back link */}
        <Link
          href={`/dashboard`}
          className="flex items-center gap-2 text-lg font-semibold custom-transition"
        >
          <ArrowLeft /> Back
        </Link>
      </div>
      <Card>
        <div className="flex justify-between">

          <CardTitle className="p-4">Books</CardTitle>
          <CardTitle className="p-4 text-sm">

            {status === 'completed'
              ? <HoverCard>
                  <HoverCardTrigger>
                    <Badge>Ready to Go</Badge>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Your personalized assistant is now ready to predict unknown words. You can select the book and pages to get started.
                  </HoverCardContent>
                </HoverCard>
              : <HoverCard>
                  <HoverCardTrigger>
                    <Badge>Preparing Your Experience</Badge>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    We are setting up your personalized assistant. This may take a few moments. Thank you for your patience.
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
