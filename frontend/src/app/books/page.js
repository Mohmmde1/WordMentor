import { Payment, columns } from "./Columns"
import { DataTable } from "./DataTable"
import { fetchBooks } from "@/lib/actions"

async function getData() {
    // Fetch book data from books API 
    const response = await fetchBooks();
    return response;
  }
  
export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
