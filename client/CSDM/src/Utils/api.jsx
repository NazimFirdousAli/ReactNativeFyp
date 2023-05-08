const host = 'http://192.168.1.103:4000';
const authApi = `${host}/api/user`;
const getApi = `${host}/api/get`;
const postApi = `${host}/api/post`;

const AUTH = {
  LOGIN: `${authApi}/login`,
  SIGNUP: `${authApi}/sign-up`,
};

const GET = {
  GET_SHELTER_BY_USER_ID: `${getApi}/get-shelter-by-user-id`, // params user id
  ALL_SHELTER: `${getApi}/get-shelter`,
  ALL_FUND: `${getApi}/get-fund`,
  GET_FUND_BY_ID: `${getApi}/get-fund-by-user-id`,
  GET_MISSING_PERSON_BY_USER_ID: `${getApi}/get-missing-person-by-user-id`, // params user id
  ALL_MISSING_PERSON: `${getApi}/get-missing-person`,
  ALL_VOLUNTEER: `${getApi}/get-volunteer`,
  GET_VOLUNTEER_BY_ID: `${getApi}/get-volunteer-by-user-id`,
};

const POST = {
  SHELTER: `${postApi}/shelter`, // params user id
  SHELTER_BY_ID: `${postApi}/delete-shelter-by-user`,
  SHELTER_BY_ADMIN: `${postApi}/delete-shelter-by-admin`,
  FUND_RASING: `${postApi}/fund-rasing`,
  FUND_BY_ID: `${postApi}/delete-fund-by-user`,
  FUND_BY_ADMIN: `${postApi}/delete-fund-by-admin`,
  MISSING_PERSON: `${postApi}/missing-person`, // params user id
  MISSING_PERSON_BY_ID: `${postApi}/delete-missing-person-by-user`,
  MISSING_PERSON_BY_ADMIN: `${postApi}/delete-missing-person-by-admin`,
  VOLUNTEER: `${postApi}/volunteer`,
  VOLUNTEER_BY_ID: `${postApi}/delete-volunteer-by-user`,
  VOLUNTEER_BY_ADMIN: `${postApi}/delete-volunteer-by-admin`,
};

export {AUTH, GET, POST};
