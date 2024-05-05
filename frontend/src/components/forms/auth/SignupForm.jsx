import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {signup} from '@/lib/actions';

const SignupForm = ({setIsAuthenticated}) => {
  return (
    <form
      className="grid max-w-full grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 rounded px-8 pt-6 pb-8 mb-4"
      action={async formData => {
        await signup (formData);
        setIsAuthenticated (true);
      }}
    >
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="firstname"
        >
          First Name
        </label>
        <Input
          type="text"
          placeholder="Enter your first name"
          id="firstname"
          name="firstname"
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="lastname"
        >
          Last Name
        </label>
        <Input
          type="text"
          placeholder="Enter your last name"
          id="lastname"
          name="lastname"
        />
      </div>
      <div className=" sm:col-span-2 md:col-span-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <Input
          type="email"
          placeholder="Enster your email"
          id="email"
          name="email"
        />
      </div>
      <div className=" sm:col-span-2 md:col-span-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <Input
          type="text"
          placeholder="Enter your username"
          id="username"
          name="username"
        />
      </div>
      <div className=" sm:col-span-2 md:col-span-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <Input
          type="password"
          placeholder="Enter your password"
          id="password"
          name="password"
        />
      </div>
      <div className="col-span-full flex items-center justify-between">
        <Button>
          Signup
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
