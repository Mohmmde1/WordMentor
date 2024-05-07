'use client';
import Link from 'next/link';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {toast} from 'sonner';
import {updateProfile} from '@/lib/actions';

const profileFormSchema = z.object ({
  firstname: z.string ().min (2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastname: z.string ().min (2, {
    message: 'Last name must be at least 2 characters.',
  }),
  username: z
    .string ()
    .min (2, {
      message: 'Username must be at least 2 characters.',
    })
    .max (30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string ({
      required_error: 'Please select an email to display.',
    })
    .email (),
});

export function ProfileForm({profile}) {
  const form = useForm ({
    resolver: zodResolver (profileFormSchema),
    defaultValues: {
      firstname: profile.user.first_name,
      lastname: profile.user.last_name,
      username: profile.user.username,
      email: profile.user.email,
    },
    mode: 'onChange',
  });

  function onSubmit (data) {
    const updateProfileAsync = async () => {
      await updateProfile (data);
      toast ('Profile updated');
    };

    updateProfileAsync ();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit (onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstname"
          render={({field}) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="first name" {...field} />
              </FormControl>
              <FormDescription>
                This is your first name.{' '}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({field}) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="last name" {...field} />
              </FormControl>
              <FormDescription>
                This is your last name.{' '}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your username. It must be unique.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your{' '}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          Update profile
        </Button>
      </form>
    </Form>
  );
}
