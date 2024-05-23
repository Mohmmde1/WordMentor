'use server';
import apiService from '@/services/apiService';

import setSessionCookies, {
  deleteSessionCookies,
  getAssessmentStatus,
  setAssessmentStatus,
} from '@/lib/helpers';
import {getUserId, getProfileId} from '@/lib/helpers';
import {revalidatePath} from 'next/cache';

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
    const assessmentStatus = getAssessmentStatus ();
    if (assessmentStatus) return assessmentStatus;
    else return undefined;
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
    console.log (response);
    if (response.access) {
      await setSessionCookies (
        response.user,
        response.access,
        response.refresh
      );
    } else {
      throw new Error (`Response: ${response}`);
    }
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
  const words = await apiService.get ('word/assessment');
  return words;
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

    if(responseAssessment.error){
      throw new Error(responseAssessment.error);
    }
    
    const responseModel = await apiService.postUpdate (
      'trainedmodels/',
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
    const response = await apiService.get (`trainedmodels/task-status/`);
    console.log (response.status);
    return response.status;
  } catch (error) {
    console.error ('Error fetching status:', error);
    throw error;
  }

}


export async function fetchBooks () {
  const profileId = getProfileId ();
  try {
    const response = await apiService.get (`books/by-profile/${profileId}`);
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

export async function saveBook(form){
  form.append("profile", getProfileId());
  form.append("title", form.get("file").name);
  form.append("pages", 0);
  try {
    const response = await apiService.postFile("books/", form, "POST");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function extract_unknown_words(form){
  try {
    const data = {
      book_id: form.book_id,
      from_page: form.from_page,
      to_page: form.to_page
    }
    const response = await apiService.postUpdate("trainedmodels/extract-tokenize/", JSON.stringify(data), "POST");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function addToKnownWords(word){
  const form = new FormData();
  form.append("word", word);
  
  const profileId = getProfileId();
  try {

    const response = await apiService.postFile(`profile/${profileId}/remove-word/`, form, "POST");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}