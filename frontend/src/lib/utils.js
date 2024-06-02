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
// utils.js
export function parseAndTransformDefinitions(inputString) {
  // Convert single quotes to double quotes and handle escaped double quotes
  const doubleQuotedString = inputString.replace(/\\'/g, "'").replace(/'/g, '"');
  
  // Parse the string into a JSON object
  let cardData;
  try {
    cardData = JSON.parse(doubleQuotedString);
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return 'Not Found';
  }

  // Format the definitions
  const definitions = [];
  for (const [partOfSpeech, definition] of Object.entries(cardData)) {
    if (definition) {
      const formattedDefinition = `${capitalizeFirstLetter(partOfSpeech)}: ${definition}`;
      definitions.push(formattedDefinition);
    }
  }

  return definitions.join('\n\n');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
