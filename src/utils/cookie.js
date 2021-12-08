export const cookieNames = {
  teacher_session_id: "teacher_session_id",
  manager_session_id: "manager_session_id",
};

function set(cookieName, cookieValue, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${cookieName}=${cookieValue};${expires};domain=${process.env.REACT_APP_SERVER_DOMAIN};path=/`;
}

function get(c_name) {
  let c_start, c_end;
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end === -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}

function deleteAll() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      name + `=;domain=${process.env.REACT_APP_SERVER_DOMAIN};path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

const cookie = { set, get, deleteAll };

export default cookie;
