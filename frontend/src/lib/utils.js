import {clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn (...inputs) {
  return twMerge (clsx (inputs));
}

export function parseDate (date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const d = new Date (date);

  const month = months[d.getMonth ()];
  const year = d.getFullYear ();
  const day = d.getDate ();

  let hours = d.getHours ();
  const minutes = d.getMinutes ().toString ().padStart (2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  return `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
}
