import { Toast } from "../ToastContainer";

function Logout(setrole) {
  setrole(7);
  localStorage.removeItem("token");

  Toast("Logout successfully !! ");

  setrole(6);
}

export { Logout };
