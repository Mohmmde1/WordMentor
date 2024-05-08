/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QFbT6UZrbNB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {CardContent, Card} from '@/components/ui/card';
import CarouselPlugin from './CarouselHome';
import FAQAccordion from './FAQAccordion';

export default function Page () {
  return (
    <div>
      {/* Hero */}
      <section className="w-full py-3 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#27ae60] to-[#2ecc71] opacity-10 blur-3xl" />
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] space-x-40">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Familiarize Your Next Great
                  {' '}
                  <span className="px-4 mt-3 rounded text-amber-500">
                    {' '}Read
                  </span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Upload the book you will read and WordMentor will predict the unfammilar words for you.
                </p>
              </div>
              <Button>Get Started</Button>
            </div>
            <div className="flex gap-6">
              <div>

                <Image
                  alt="casual-life-3d-boy-carrying-books"
                  height={200}
                  src="/casual-life-3d-boy-carrying-books.png"
                  width={200}
                />

              </div>

            </div>
          </div>
        </div>

      </section>

      <section className="w-full py-14 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#9b59b6] to-[#8e44ad] opacity-10 blur-3xl" />
        <div className="flex  px-4 md:grid-cols-3 md:px-6 m-3 space-x-60 ">
          <div className="flex flex-col items-start h-96 space-x-2  space-y-2 ">
            <Image
              alt="silky-knowledge-assessment"
              height={200}
              src="/silky-knowledge-assessment.png"
              width={200}
              className=" "
            />
            <h3 className="text-xl font-bold">The Great Gatsby</h3>
            <p className="text-gray-500 dark:text-gray-400">
              F. Scott Fitzgerald
            </p>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Learn More
            </Link>
          </div>
          <div className="flex flex-col items-start h-96 space-x-2  space-y-2">
            <Image
              alt="airy-magnifier-with-a-book-search-for-information-learning"
              height={200}
              src="/airy-magnifier-with-a-book-search-for-information-learning.png"
              width={200}
            />
            <h3 className="text-xl font-bold">To Kill a Mockingbird</h3>
            <p className="text-gray-500 dark:text-gray-400">Harper Lee</p>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Learn More
            </Link>
          </div>
          <div className="flex flex-col items-start h-96 space-x-2  space-y-2">
            <Image
              alt="props-robo-advisor-working-on-holographic-screen-1"
              height={200}
              src="/props-robo-advisor-working-on-holographic-screen-1.png"
              width={200}
            />
            <h3 className="text-xl font-bold">1984</h3>
            <p className="text-gray-500 dark:text-gray-400">George Orwell</p>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-4 md:py-24 lg:py-32 flex justify-center relative space-x-40">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#ff6b6b] to-[#ffa500] opacity-10 blur-3xl" />
        <div>

          <Image
            alt="casual-life-3d-tall-stack-of-books"
            height={200}
            src="/casual-life-3d-tall-stack-of-books.png"
            width={200}
          />

        </div>
        <CarouselPlugin />
        <div>

          <Image
            alt="casual-life-3d-boy-sitting-at-the-desk-with-open-book"
            height={200}
            src="/casual-life-3d-boy-sitting-at-the-desk-with-open-book.png"
            width={200}
          />

        </div>
      </section>

      <section className="w-full px-4 py-4  md:px-6 mx-2 relative">
        <h2 className="text-3xl font-bold tracking-tighter text-center md:text-4xl/tight">
          FAQ
        </h2>
        <FAQAccordion />
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Stay Up-to-Date with Our Newsletter
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Subscribe to our newsletter to receive the latest updates, news, and exclusive offers.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input
                className="max-w-lg flex-1"
                placeholder="Enter your email"
                type="email"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
