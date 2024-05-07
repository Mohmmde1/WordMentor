import {columns} from './Columns';
import {DataTable} from './DataTable';
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {fetchBooks} from '@/lib/actions';

async function getData () {
  // Fetch book data from books API
  const response = await fetchBooks ();
  return response;
}

export default async function Page () {
  const data = await getData ();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardTitle className="p-4">Books</CardTitle>
        <CardDescription className="p-4">Manage your books and select pages to predict unknown words.</CardDescription>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
