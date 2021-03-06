import { USER_EMAIL } from '../../constants/index';

function setToLocal(key, value){
  localStorage.setItem(key, value);
}

function getFromLocal(key){
  return localStorage.getItem(key);
}

export function setCurrentUser(email){
  return setToLocal(USER_EMAIL, email);
}

export function getCurrentUser(){
  let current_user = getFromLocal(USER_EMAIL)
  if(current_user){
    return current_user;
  }
  else{
    return null
  }
}