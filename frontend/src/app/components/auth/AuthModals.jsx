import AuthModal from "@/app/components/auth/AuthModal";
import { login, signup } from "@/app/lib/actions";

const SignupModal = () => {
  return (
    <AuthModal
      id="signupModal"
      title="Sign Up"
      action={signup}
      buttonText="Sign Up"
    />
  );
};

const LoginModal = () => {
  return (
    <AuthModal
      id="loginModal"
      title="Log In"
      action={login}
      buttonText="Log In"
    />
  );
};
export { LoginModal, SignupModal };
