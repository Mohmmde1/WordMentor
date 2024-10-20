'use server';
import apiService from '@/services/apiService';

import setSessionCookies, {
  deleteSessionCookies,
  getAssessmentStatus,
  setAssessmentStatus,
} from '@/lib/helpers';
import {getUserId, getProfileId} from '@/lib/helpers';
import {revalidatePath} from 'next/cache';
import {parseDate} from './utils';

export async function checkUser () {
  try {
    const userId = getUserId ();
    if (userId) return userId;
    else return undefined;
  } catch (error) {
    console.error ('Error checking user:', error.message);
    throw error;
  }
}

export async function checkAssessmentStatus () {
  try {
    const response = await apiService.get ('assessment/assessment-status');
    const assessmentStatus = response.assessment_exists;
    return assessmentStatus ? assessmentStatus : undefined;
  } catch (error) {
    console.error ('Error checking assessment status:', error.message);
    throw error;
  }
}

export async function login (formData) {
  try {
    const response = await apiService.postWithoutToken (
      'auth/login/',
      JSON.stringify (formData)
    );

    if (response.access) {
      await setSessionCookies (
        response.user,
        response.access,
        response.refresh
      );
    }
    return response;
  } catch (error) {
    // Handle errors
    console.error ('Error occurred during signing in:', error);

    throw error;
  }
}
export async function signup (formData) {
  try {
    const data = {
      email: formData.email,
      password1: formData.password1,
      password2: formData.password2,
      first_name: formData.firstname,
      last_name: formData.lastname,
      username: formData.username,
    };
    const response = await apiService.postWithoutToken (
      'auth/registration/',
      JSON.stringify (data)
    );
    if (response.access) {
      await setSessionCookies (
        response.user,
        response.access,
        response.refresh
      );
    }
    return response;
  } catch (error) {
    // Handle errors
    console.error ('Error occurred during signing up:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

export async function logout () {
  try {
    deleteSessionCookies ();
  } catch (error) {
    // Handle errors
    console.error ('Error occurred during signing ing:', error);

    throw error; // Re-throw the error to be caught by the caller
  }
}

export async function fetchProfile () {
  try {
    const profileId = getProfileId ();
    if (!profileId) throw new Error ('User is not logged in!');
    const response = await apiService.get (`profile/${profileId}`);

    return response;
  } catch (error) {
    console.error ('Error occured during fetching profile: ', error);
    throw error;
  }
}

export async function handleImageUpload (formState) {
  try {
    const profileId = getProfileId ();
    const response = await apiService.postFile (
      `profile/${profileId}/upload-image/`,
      formState,
      'POST'
    );
    console.log (response);
    if (response.id) {
      revalidatePath (`/`);
    } else {
      throw new Error (`Response: ${response}`);
      // Handle error
    }
  } catch (error) {
    console.error ('Error uploading file:', error);
    // Handle error
    throw error;
  }
}

export async function updateProfile (formData) {
  try {
    const data = {
      email: formData.email,
      first_name: formData.firstname,
      last_name: formData.lastname,
      username: formData.username,
    };

    const response = await apiService.postUpdate (
      `auth/user/`,
      JSON.stringify (data),
      'PUT'
    );

    if (response.id) {
      revalidatePath (`/profile/${data.username}`);
    } else {
      throw new Error (`Response: ${response}`);
    }
  } catch (error) {
    // Handle errors
    console.error ('Error occurred during signing up:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

export async function fetchAssessmentWords () {
  try {
    const words = await apiService.get ('word/assessment');

    // Ensure the data is in the correct format: { id: number, word: string }
    const standardizedWords = words.map (word => ({
      id: word.id,
      entry: word.word,
    }));

    return standardizedWords;
  } catch (error) {
    console.error ('Error fetching assessment words:', error);
    throw error;
  }
}

export async function submitAssessment (selected, unselected) {
  try {
    const profileId = getProfileId ();
    const data = {
      profile: profileId,
      selected_words: selected,
      unselected_words: unselected,
    };
    console.log (data);
    const responseAssessment = await apiService.postUpdate (
      'assessment/',
      JSON.stringify (data),
      'POST'
    );

    if (responseAssessment.error) {
      throw new Error (responseAssessment.error);
    }

    const responseModel = await apiService.postUpdate (
      'trainedmodels/train/',
      JSON.stringify ({
        profile: profileId,
      }),
      'POST'
    );
    setAssessmentStatus (true);
  } catch (error) {
    console.error ('Error submitting assessment:', error);
    throw error;
  }
}

export async function getStatus () {
  try {
    const response = await apiService.get (`trainedmodels/train/task-status/`);
    console.log (response.status);
    return response.status;
  } catch (error) {
    console.error ('Error fetching status:', error);
    throw error;
  }
}

export async function fetchBooks () {
  const profileId = getProfileId ();
  if (!profileId) return [];
  try {
    const response = await apiService.get (`books/by-profile/${profileId}`);
    console.log(`response: ${JSON.stringify(response)}`);

    response.forEach (item => {
      item.created_at = parseDate (item.created_at);
      item.updated_at = parseDate (item.updated_at);
    });
    return response;
  } catch (error) {
    console.error ('Error fetching books:', error);
    throw error;
  }
}

export async function deleteBook (bookId) {
  try {
    const response = await apiService.delete (`books/${bookId}`);
    return response;
  } catch (error) {
    console.error ('Error deleting book:', error);
    throw error;
  }
}

export async function deleteBooks (books) {
  try {
    books.forEach (element => {
      deleteBook (element);
    });
  } catch (error) {
    console.error ('Error deleting books:', error);
    throw error;
  }
}

export async function saveBook (form) {
  form.append ('profile', getProfileId ());
  form.append ('title', form.get ('file_path').name);
  form.append ('pages', 0);
  try {
    const response = await apiService.postFile ('books/', form, 'POST');
    console.log (response);
    return response;
  } catch (error) {
    console.error ('Error uploading file:', error);
    throw error;
  }
}

export async function extract_unknown_words (form) {
  try {
    const data = {
      book_id: form.book_id,
      from_page: form.from_page,
      to_page: form.to_page,
    };
    const response = await apiService.postUpdate (
      'trainedmodels/predict/',
      JSON.stringify (data),
      'POST'
    );
    console.log (response);
    return response;
  } catch (error) {
    console.error ('Error uploading file:', error);
    throw error;
  }
}

export async function addToKnownWords (word) {
  const form = new FormData ();
  form.append ('word', word);

  const profileId = getProfileId ();
  try {
    const response = await apiService.postFile (
      `profile/${profileId}/remove-word/`,
      form,
      'POST'
    );
    console.log (response);
    return response;
  } catch (error) {
    console.error ('Error uploading file:', error);
    throw error;
  }
}

export async function getLastPrediction () {
  try {
    const response = await apiService.get (
      'trainedmodels/predict/last-prediction/'
    );
    console.log (response);
    return response;
  } catch (error) {
    console.error ('Error uploading file:', error);
    throw error;
  }
}

export async function fetchPredictions () {
  try {
    const response = await apiService.get (`trainedmodels/predict/`);
    console.log (response);
    if (response.message) return [];

    response.forEach (item => {
      item.created_at = parseDate (item.created_at);
    });
    console.log (response);
    return response;
  } catch (error) {
    console.error ('Error fetching books:', error);
    throw error;
  }
}

export async function getPrediction (predictionId) {
  try {
    const response = await apiService.get (
      `trainedmodels/predict/${predictionId}/`
    );
    console.log (response);
    return response;
  } catch (error) {
    console.error ('Error fetching books:', error);
    throw error;
  }
}

export async function updateWordStatus (wordId, status, predictionId) {
  const data = {
    word_text: wordId,
  };
  try {
    const response = await apiService.postUpdate (
      `progress/update-word-progress/`,
      JSON.stringify (data),
      'PUT'
    );
    console.log (response);
    return response;
  } catch (error) {
    console.error ('Error fetching books:', error);
    throw error;
  }
}

export async function fetchKnownWords () {
  try {
    const response = await apiService.get ('progress/known-words');
    console.log (response);
    // Initialize an array to store the processed words
    const knownWords = response.map (item => ({
      word: item.word,
      added_at: parseDate (item.created_at),
    }));

    // Return the categorized words
    return knownWords;
  } catch (error) {
    console.error ('Error fetching words:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

export async function fetchUnKnownWords () {
  try {
    const response = await apiService.get ('progress/unknown-words');
    console.log (response);
    // Initialize an array to store the processed words
    const unknownWords = response.map (item => ({
      word: item.word,
      added_at: parseDate (item.created_at),
    }));

    // Return the categorized words
    return unknownWords;
  } catch (error) {
    console.error ('Error fetching words:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

export async function fetchStatistics () {
  try {
    const response = await apiService.get ('progress/statistics');
    return {
      knownWordsCount: response.known_words_count,
      knownWordsChange: response.known_words_change,
      unknownWordsCount: response.unknown_words_count,
      unknownWordsChange: response.unknown_words_change,
      progress: response.progress,
      progressChange: response.progress_change,
      sessions: response.predictions_count,
      sessionsChange: response.predictions_change,
    };
  } catch (error) {
    console.error ('Error fetching statistics:', error);
    throw error;
  }
}

export async function updateWordsStatus (learnedWordList) {
  try {
    const data = JSON.stringify ({learnedWords: learnedWordList});
    const response = await apiService.postUpdate("progress/update-words-status/", data, "PUT")

    if (response) {
      // Handle successful submission (e.g., show a success message)
      console.log ('Learned words submitted successfully');
      return response;
    } else {
      // Handle errors (e.g., show an error message)
      console.error ('Failed to submit learned words');
    }
  } catch (error) {
    console.error ('An error occurred while submitting learned words:', error);
  }
}
