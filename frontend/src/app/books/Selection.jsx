import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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


const Selection = ({ noPages }) => {
    const schema = z.object({
        from: z.coerce.number().min(1).max(noPages),
        to: z.coerce.number().min(1).max(noPages),

    });
    const form = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = async formData => {
        try {
            //   await signup (formData);
            //   setIsAuthenticated (true);
            //   toast ('Signup Successfully!');
        } catch (error) {
            // Handle signup error
        }
    };

    return (
        <Form {...form}>
            <form className="flex items-center space-x-4"
                onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="from" render={({ field }) => (
                    <FormItem>
                        <FormLabel>From:</FormLabel>
                        <FormDescription>Enter the page number you want to start from</FormDescription>
                        <FormControl>

                            <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>)}
                />
                <span className="text-lg font-bold">-</span>
                <FormField control={form.control} name="to" render={({ field }) => (
                    <FormItem>
                        <FormLabel>To:</FormLabel>
                        <FormDescription>Enter the page number you want to end to</FormDescription>
                        <FormControl>

                            <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>)}
                />
            </form>
            <DialogFooter>

                <Button className="mt-4">Select</Button>
            </DialogFooter>
        </Form >
    );
}

export default Selection;
