export const checkSignin = () => {
  const token = localStorage.getItem("Bear-token");
  if (!token) {
    window.location.href = "/login";
  }
};
