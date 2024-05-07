'use client';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {toast} from 'sonner';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {signup} from '@/lib/actions';

const signupFormSchema = z.object ({
  firstname: z.string ().min(1),
  lastname: z.string ().min(1),
  email: z.string ().email ({message: 'Invalid email address'}).min (1),
  username: z.string ().min (1),
  password1: z
    .string ()
    .min (8, {message: 'Password must be at least 8 characters'}),
  password2: z
    .string ()
    .min (8, {message: 'Password must be at least 8 characters'}),
});

const SignupForm = ({setIsAuthenticated}) => {
  const form = useForm ({
    resolver: zodResolver (signupFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async formData => {
    try {
      await signup (formData);
      setIsAuthenticated (true);
      toast ('Signup Successfully!');
    } catch (error) {
      // Handle signup error
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid max-w-full grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={form.handleSubmit (onSubmit)}
      >
        <FormField
          control={form.control}
          name="firstname"
          render={({field}) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your firstname"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({field}) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your lastname"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password1"
          render={({field}) => (
            <FormItem>
              <FormLabel>Password 1</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password2"
          render={({field}) => (
            <FormItem>
              <FormLabel>Password 2</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Re-enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-full flex items-center justify-between">
          <Button type="submit" onClick={e => console.log ('HI')}>
            Signup
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
