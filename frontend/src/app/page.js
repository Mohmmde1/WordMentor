'use client';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CarouselPlugin from './CarouselHome';
import FAQAccordion from './FAQAccordion';

export default function Page() {
  return (
    <div>
      {/* Hero */}
      <section className="w-full py-12 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-500 to-primary-700 opacity-10 blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                Familiarize Your Next Great{' '}
                <span className="dark:text-amber-500 text-sky-600">Read</span>
              </h1>
              <p className="max-w-xl text-muted-foreground md:text-xl">
                Upload the book you will read and WordMentor will predict the unfamiliar words for you.
              </p>
              <Button>Get Started</Button>
            </div>
            <div className="flex justify-center">
              <Image
                alt="casual-life-3d-boy-carrying-books"
                height={300}
                src="/casual-life-3d-boy-carrying-books.png"
                width={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-14 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-secondary-500 to-secondary-700 opacity-10 blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Vocabulary Prediction',
              description: 'Predict unfamiliar words from your reading material.',
              imageSrc: '/props-robo-advisor-working-on-holographic-screen-1.png',
            },
            {
              title: 'Interactive Learning',
              description: 'Engage with interactive quizzes to reinforce your learning.',
              imageSrc: '/airy-magnifier-with-a-book-search-for-information-learning.png',
            },
            {
              title: 'Progress Tracking',
              description: 'Track your reading progress and vocabulary growth over time.',
              imageSrc: '/props-robo-advisor-working-on-holographic-screen-1.png',
            },
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <Image alt={feature.title} height={200} src={feature.imageSrc} width={200} />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              
            </div>
          ))}
        </div>
      </section>

      {/* Carousel Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-500 to-secondary-500 opacity-10 blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center">
          <div className="w-full flex justify-around items-center space-x-8">
            <Image
              alt="casual-life-3d-tall-stack-of-books"
              height={200}
              src="/casual-life-3d-tall-stack-of-books.png"
              width={200}
            />
            <CarouselPlugin />
            <Image
              alt="casual-life-3d-boy-sitting-at-the-desk-with-open-book"
              height={200}
              src="/casual-life-3d-boy-sitting-at-the-desk-with-open-book.png"
              width={200}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full px-4 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tighter text-center md:text-4xl">
            FAQ
          </h2>
          <FAQAccordion />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Stay Up-to-Date with Our Newsletter
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl">
              Subscribe to our newsletter to receive the latest updates, news, and exclusive offers.
            </p>
          </div>
          <div className="mx-auto w-full max-w-md mt-8">
            <form className="flex space-x-2">
              <Input
                className="flex-1"
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
