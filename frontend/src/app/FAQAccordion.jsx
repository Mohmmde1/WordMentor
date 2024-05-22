import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    question: 'How can I access Word Mentor?',
    answer: 'Word Mentor is accessible online through any web browser. Simply visit our website and create an account to get started.',
  },
  {
    question: 'How often should I use Word Mentor?',
    answer: 'The frequency of Word Mentor usage depends on your learning goals and schedule. We recommend incorporating Word Mentor into your daily or weekly language learning routine for best results.',
  },
  {
    question: 'Can I track my progress on Word Mentor?',
    answer: 'Yes, Word Mentor provides tools to track your progress and monitor your improvement over time. You can view statistics, set goals, and measure your vocabulary growth.',
  },
  {
    question: 'How can I create flashcards in Word Mentor?',
    answer: 'To create flashcards in Word Mentor, simply navigate to the flashcards section and click on the "Create Flashcards" button. You can then enter the question and answer for each flashcard and save them for later.',
  },
  {
    question: 'How can I study with flashcards in Word Mentor?',
    answer: 'To study with flashcards in Word Mentor, simply access the flashcards section and select the deck you want to study. You can then flip through the flashcards, reviewing the questions and answers as you go.',
  },
  {
    question: 'Does Word Mentor track my progress with flashcards?',
    answer: "Yes, Word Mentor tracks your progress with flashcards. It records which flashcards you've studied, how many times you've reviewed each card, and your performance on quizzes or tests related to the flashcards.",
  },
];
export default function FAQAccordion () {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqData.map ((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
