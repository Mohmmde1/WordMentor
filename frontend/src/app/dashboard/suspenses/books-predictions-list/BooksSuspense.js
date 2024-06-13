
import {fetchBooks} from '@/lib/actions';

import Listing from '../../components/books-predictions-listing/Listing';


export default async function BooksListingsSuspense () {

 
  const books = await fetchBooks();
  return <Listing list={books} message={"No books have been uploaded yet"} />;
  
}
