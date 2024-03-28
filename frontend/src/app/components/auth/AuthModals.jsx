import AuthModal from "@/app/components/auth/AuthModel";
import { authenticate } from "@/app/lib/actions";

const SignupModal = () => {
  return (
    <AuthModal
      id="signupModal"
      title="Sign Up"
      action={authenticate}
      buttonText="Sign Up"
    />
  );
};

const LoginModal = () => {
  return (
    <AuthModal
      id="loginModal"
      title="Log In"
      action={authenticate}
      buttonText="Log In"
    />
  );
};
export { LoginModal, SignupModal };
