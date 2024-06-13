
import {fetchWords} from '@/lib/actions';
import Words from '../../components/words-listing/Words';




export default async function KnownListingSuspense () {

  const {knownWords, unknownWords} = await fetchWords ();
  return <Words words={knownWords} message={"No known words"} />;
  
}
