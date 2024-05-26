'use client';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {toast} from 'sonner';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {login} from '@/lib/actions';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {useRouter} from 'next/navigation';

const loginFormSchema = z.object ({
  email: z.string ().email ({message: 'Invalid email address'}).min (1),
  password: z
    .string ()
    .min (8, {message: 'Password must be at least 8 characters'}),
});

const LoginForm = ({setIsAuthenticated}) => {
  const router = useRouter();
  const form = useForm ({
    resolver: zodResolver (loginFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async formData => {
    try {
      await login (formData);
      setIsAuthenticated (true);
      toast ('Login Successfully!');
      router.push ('/dashboard'); // Redirect to the home page
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <Form {...form}>

      <form
        onSubmit={form.handleSubmit (onSubmit)}
        className="rounded px-8 pt-6 pb-8 mb-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
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
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
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
        <Button className="mt-4" type="submit">Login</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
