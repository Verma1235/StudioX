import { Toast } from "../ToastContainer";

function logout(setrole) {
  setrole(7);
  localStorage.removeItem("token");

  Toast("Logout successfully !! ");

  setrole(0);
}

export { logout };
