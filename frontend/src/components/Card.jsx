'use client'
// VocabularyAssessment.js
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { submitAssessment } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import {toast} from "sonner";


const VocabularyAssessment = ({ words }) => {
    const [step, setStep] = useState(1);
    const [selectedWords, setSelectedWords] = useState([]);
    const router = useRouter();

    const handleCheckboxChange = (wordId) => {
        setSelectedWords((prevSelectedWords) => {
            if (prevSelectedWords.includes(wordId)) {
                // Deselect the word if it's already selected
                return prevSelectedWords.filter((id) => id !== wordId);
            } else {
                // Select the word if it's not already selected
                return [...prevSelectedWords, wordId];
            }
        });
    };

    const handleNextStep = () => {
        if (step === 1) {
            setStep(2);
        }
    };

    const handlePreviousStep = () => {
        if (step === 2) {
            setStep(1);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const allWords = words.map((word) => word.id);
        const selectedIds = new Set(selectedWords);
        const unselectedWords = allWords.filter((id) => !selectedIds.has(id));

        // Submit both selected and unselected words
        submitAssessment(selectedWords, unselectedWords);
        toast.success('Assessment submitted successfully!');
        router.push("/");
    };

    // Divide the words into two halves based on step
    const halfIndex = Math.ceil(words.length / 2);
    const displayedWords = step === 1 ? words.slice(0, halfIndex) : words.slice(halfIndex);

    return (
        <div className="container mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Step {step} of 2: Select words you know
                    </CardTitle>
                    <CardDescription>
                        Check the box if you know at least one definition for a word. If
                        you’re not sure about the exact meaning, leave it blank.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        {displayedWords.map((word) => (
                            <div key={word.id}>
                                <input
                                type="checkbox"
                                    id={word.id}
                                    checked={selectedWords.includes(word.id)}
                                    onChange={() => handleCheckboxChange(word.id)}
                                />
                                <label
                                    htmlFor={word.id} // Use unique id for each label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                                >
                                    {word.entry}
                                </label>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className='flex justify-between'>
                    {step === 1 ? (
                        <Button variant="outline" size="icon"  onClick={handleNextStep}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <>
                            <Button variant="outline" size="icon" onClick={handlePreviousStep}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default VocabularyAssessment;
