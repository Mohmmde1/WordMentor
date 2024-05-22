/**
 * v0 by Vercel.
 * @see https://v0.dev/t/z1KSmD6dWbz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link';
import Image from 'next/image';

export default function Hero () {
  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32">
      <div className="container space-y-10 xl:space-y-16">
        <div className="flex border">
        <div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                The complete platform for building the Web
              </h1>
            </div>

          </div>
          <div className="flex flex-col items-start space-y-4 border w-2/4">
            <p className=" border text-left mx-auto max-w-full text-gray-500 md:text-xl dark:text-gray-400">
              Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open
              Source.
            </p>
            <div className="space-x-4">
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Get Started
              </Link>
            </div>
          </div>
          </div>
          <Image
            src="/casual-life-3d-boy-carrying-books.png"
            alt="Casual Life"
            width={200}
            height={200}
            className="w-auto h-auto"
          />
        </div>
        <Image
          alt="Hero"
          className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
          height="300"
          src="/books-background.jpeg"
          width="1270"
        />
      </div>
    </section>
  );
}
