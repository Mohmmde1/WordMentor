
import {fetchUnKnownWords} from '@/lib/actions';
import Words from '../../components/words-listing/Words';




export default async function UnknownListingSuspense () {

  const unknownWords = await fetchUnKnownWords ();
  return <Words words={unknownWords} message={"No unknown words"}/>;
  
}
