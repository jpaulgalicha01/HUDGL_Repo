import Swal from "sweetalert2";

export function ClsAlert({ icon, title }) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
  });
  Toast.fire({
    icon: icon,
    title: title,
  });
}

export const ClsModalAlert = ({ icon, title }) => {
  Swal.fire({
    text: title,
    icon: icon,
    showConfirmButton: false,
    timer: 1500,
  });
};
