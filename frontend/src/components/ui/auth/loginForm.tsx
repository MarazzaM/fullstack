"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState  } from 'react'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";
import Swal from "sweetalert2";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState } = form; // Extract formState from form

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const backend = process.env.NEXT_PUBLIC_NEXTBACKEND_URL;
  
    let responseStatus;
    let responseData;
  
    try {
      const response = await fetch(`${backend}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      responseStatus = response.status;
  
      if (!response.ok) {
        const errorResponse = await response.json();
  
        if (errorResponse.message === 'Invalid login credentials.') {
          Toast.fire({
            icon: 'error',
            title: 'Invalid login credentials. Please check your email and password.',
          });
        } else {
          throw new Error('Failed to submit the data. Please try again.');
        }
      } else {
        responseData = await response.json();
        document.cookie = `accessToken=${responseData.accessToken}; expires=Wed, 01 Jan 2025 00:00:00 GMT; path=/; Secure; SameSite=Lax`;
        // Save user information to Zustand store
        useStore.getState().startLogin({
          email: data.email,
          accessToken: responseData.accessToken,
          refreshToken: responseData.refreshToken,
        });
  
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
          text: "Redirecting...",
        });
  
        setTimeout(() => {
          router.push('/protected/dashboard/chat');
        }, 2000);
  
        // console.log('dataResponse', responseData);
        // console.log('store', useStore.getState());
        // ...
      }
    } catch (error) {
      // Handle other errors
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    // console.log(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 m-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="panic@thedis.co"
                  autoComplete="email"
                  required
                  className="text-gray-700"
                  {...field}
                />
              </FormControl>
              <FormMessage>{formState.errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  required
                  placeholder=""
                  className="text-gray-700"
                  {...field}
                />
              </FormControl>
              <FormMessage>{formState.errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

      </form>
    </Form>
  );
}