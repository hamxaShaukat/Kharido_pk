import Swal from "sweetalert2";

const showToast = (type: 'success' | 'error', title: string) => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: type,
    title: title,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};
export default showToast;