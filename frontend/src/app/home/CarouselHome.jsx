import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {Card, CardContent} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function CarouselPlugin () {
  const plugin = React.useRef (
    Autoplay ({delay: 2000, stopOnInteraction: true})
  );

  // Define content for each carousel item
  const carouselContent = [
    {text: 'Explore New Words'},
    {text: 'Track Your Progress'},
    {text: 'Personalized Learning'},
    {text: 'Interactive Exercises'},
    {text: 'Enhance Your Skills'},
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#2980b9] to-[#3498db] opacity-20 blur-3xl" />
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {carouselContent.map ((item, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-lg font-semibold">{item.text}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
