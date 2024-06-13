
import {fetchWords} from '@/lib/actions';
import Words from '../../components/words-listing/Words';




export default async function UnknownListingSuspense () {

  const {knownWords, unknownWords} = await fetchWords ();
  return <Words words={unknownWords} message={"No unknown words"}/>;
  
}
