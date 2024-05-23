import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { extract_unknown_words } from '@/lib/actions';

const Selection = ({ noPages, bookId }) => {
  const [error, setError] = useState(null);

  const schema = z.object({
    from_page: z.coerce.number().min(1).max(noPages),
    to_page: z.coerce.number().min(1).max(noPages),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async formData => {
    try {
      setError(null); // Clear any previous errors
      
      const data = { ...formData, book_id: bookId };
      console.log('formData', data);
      const result = await extract_unknown_words(data);
      console.log('result', result); // Handle the result as needed
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while extracting unknown words.');
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex items-center space-x-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="from_page"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From:</FormLabel>
              <FormDescription>
                Enter the page number you want to start from
              </FormDescription>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="text-lg font-bold">-</span>
        <FormField
          control={form.control}
          name="to_page"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To:</FormLabel>
              <FormDescription>
                Enter the page number you want to end to
              </FormDescription>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" className="mt-4">Select</Button>
        </DialogFooter>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </Form>
  );
};

export default Selection;
