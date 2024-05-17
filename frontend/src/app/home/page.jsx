/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FwU7zEnAQL7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import { AccordionTrigger, AccordionContent, AccordionItem, Accordion } from "@/components/ui/accordion"
import Image from "next/image"

export default function Component() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover Your Next Great Read
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Explore our curated selection of the best books across genres. Find your next literary adventure.
                </p>
              </div>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Explore Books
              </Link>
            </div>
            <div className="relative mx-auto w-full max-w-[400px] sm:w-full lg:order-last">
              <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-br from-[#ff6b6b] to-[#ffa500] opacity-50 blur-xl" />
              <Image
                alt="Hero"
                className="relative z-10 mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                height="550"
                src="/placeholder.svg"
                width="550"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-3 md:px-6">
          <div className="flex flex-col items-start space-y-2">
            <div className="relative w-full max-w-[200px] mx-auto">
              <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] opacity-50 blur-xl" />
              <Image
                alt="Book Cover"
                className="relative z-10 aspect-[2/3] overflow-hidden rounded-xl object-cover"
                height="300"
                src="/placeholder.svg"
                width="200"
              />
            </div>
            <h3 className="text-xl font-bold">The Great Gatsby</h3>
            <p className="text-gray-500 dark:text-gray-400">F. Scott Fitzgerald</p>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Learn More
            </Link>
          </div>
          <div className="flex flex-col items-start space-y-2">
            <div className="relative w-full max-w-[200px] mx-auto">
              <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-br from-[#2980b9] to-[#3498db] opacity-50 blur-xl" />
              <Image
                alt="Book Cover"
                className="relative z-10 aspect-[2/3] overflow-hidden rounded-xl object-cover"
                height="300"
                src="/placeholder.svg"
                width="200"
              />
            </div>
            <h3 className="text-xl font-bold">To Kill a Mockingbird</h3>
            <p className="text-gray-500 dark:text-gray-400">Harper Lee</p>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Learn More
            </Link>
          </div>
          <div className="flex flex-col items-start space-y-2">
            <div className="relative w-full max-w-[200px] mx-auto">
              <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-br from-[#27ae60] to-[#2ecc71] opacity-50 blur-xl" />
              <Image
                alt="Book Cover"
                className="relative z-10 aspect-[2/3] overflow-hidden rounded-xl object-cover"
                height="300"
                src="/placeholder.svg"
                width="200"
              />
            </div>
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
              <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6">
          <Carousel
            className="w-full max-w-xs h-[320px]"
            opts={{
              align: "start",
            }}
            orientation="horizontal"
          >
            <CarouselContent className="h-[340px]">
              <CarouselItem>
                <div className="p-1">
                  <div className="relative w-full max-w-[200px] mx-auto">
                    <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-br from-[#ff6b6b] to-[#ffa500] opacity-50 blur-xl" />
                    <Image
                      alt="Book Cover"
                      className="relative z-10 aspect-[2/3] overflow-hidden rounded-xl object-cover"
                      height="300"
                      src="/placeholder.svg"
                      width="200"
                    />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-1">
                  <div className="relative w-full max-w-[200px] mx-auto">
                    <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] opacity-50 blur-xl" />
                    <Image
                      alt="Book Cover"
                      className="relative z-10 aspect-[2/3] overflow-hidden rounded-xl object-cover"
                      height="300"
                      src="/placeholder.svg"
                      width="200"
                    />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-1">
                  <div className="relative w-full max-w-[200px] mx-auto">
                    <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-br from-[#2980b9] to-[#3498db] opacity-50 blur-xl" />
                    <Image
                      alt="Book Cover"
                      className="relative z-10 aspect-[2/3] overflow-hidden rounded-xl object-cover"
                      height="300"
                      src="/placeholder.svg"
                      width="200"
                    />
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <Accordion className="w-full" collapsible type="single">
            <AccordionItem value="item-1">
              <AccordionTrigger>The Great Gatsby</AccordionTrigger>
              <AccordionContent>
                The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long
                Island, near New York City, the novel depicts first-person narrator Nick Carraway interactions with
                mysterious millionaire Jay Gatsby and Gatsbys obsession to reunite with his former lover, Daisy
                Buchanan.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>To Kill a Mockingbird</AccordionTrigger>
              <AccordionContent>
                To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was
                instantly successful. In the town of Maycomb, Alabama, during the Great Depression, the story is told by
                the young girl Scout Finch, whose father, Atticus, a middle-aged lawyer, defends a black man named Tom
                Robinson, who is accused of a crime he did not commit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>1984</AccordionTrigger>
              <AccordionContent>
                Nineteen Eighty-Four, often published as 1984, is a dystopian social science fiction novel by English
                novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwells ninth and final
                book completed in his lifetime.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
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
              <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}