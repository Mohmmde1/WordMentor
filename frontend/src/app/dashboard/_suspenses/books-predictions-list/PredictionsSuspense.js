
import {fetchPredictions} from '@/lib/actions';

import Listing from '../../_components/books-predictions-listing/Listing';


export default async function PredictionsListingsSuspense () {

 
  const predictions = await fetchPredictions();
  return <Listing list={predictions} message={"No sessions have been found."} />;
  
}
