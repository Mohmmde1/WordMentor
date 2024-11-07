import csv
import os
import random

from django.conf import settings
from django.core.management.base import BaseCommand

import pandas as pd
from tqdm import tqdm


class Command(BaseCommand):
    help = "Generate files with known/not known status and calculate results"

    def add_arguments(self, parser):
        parser.add_argument("num_files", type=int, help="Number of files to generate")

    def handle(self, *args, **kwargs):
        num_files = kwargs['num_files']

        # Define the paths
        input_file_path = os.path.join(settings.BASE_DIR, "data", "assessment_words.csv")
        base_dir = os.path.join(settings.BASE_DIR, "data/test")
        results_file_path = os.path.join(base_dir, "assessment_results.csv")

        # Ensure the directory exists
        os.makedirs(base_dir, exist_ok=True)

        # Read the original CSV file
        df = pd.read_csv(input_file_path)

        # Prepare the results file
        with open(results_file_path, mode="w", newline="") as results_file:
            results_writer = csv.writer(results_file)
            results_writer.writerow(
                [
                    'File',
                    'Total Words',
                    'Known Words',
                    'Not Known Words',
                    'Avg Difficulty (Known)',
                    'Avg Difficulty (Not Known)',
                    'Overall Score (%)',
                ]
            )

            # Define different strategies for selecting known words
            known_selection_strategies = [
                {'name': 'First 20', 'known_count': 20},
                {'name': 'First 50', 'known_count': 50},
                {'name': 'First 78', 'known_count': 78},
                {'name': 'Random 50%', 'known_fraction': 0.5},
                {'name': 'Random 80%', 'known_fraction': 0.8},
            ]

            # Create new files with different known/not known statuses
            for i in tqdm(range(num_files), desc="Generating files", unit="file"):
                df_copy = df.copy()

                # Select known words based on strategy
                strategy = known_selection_strategies[i % len(known_selection_strategies)]

                if "known_count" in strategy:
                    # Select the first 'known_count' rows as known
                    df_copy['known'] = [
                        'known' if idx < strategy['known_count'] else 'not known' for idx in df_copy.index
                    ]
                elif 'known_fraction' in strategy:
                    # Randomly select a fraction of rows as known
                    num_known = int(strategy["known_fraction"] * len(df_copy))
                    indices = random.sample(df_copy.index.tolist(), num_known)
                    df_copy["known"] = ["known" if idx in indices else "not known" for idx in df_copy.index]

                output_file_path = os.path.join(base_dir, f"words_difficulty_{i+1}.csv")
                df_copy.to_csv(output_file_path, index=False)

                # Calculate assessment results
                total_words = len(df_copy)
                known_words = df_copy[df_copy["known"] == "known"].shape[0]
                not_known_words = df_copy[df_copy["known"] == "not known"].shape[0]
                average_difficulty_known = df_copy[df_copy["known"] == "known"]["difficulty_level"].mean()
                average_difficulty_not_known = df_copy[df_copy["known"] == "not known"]["difficulty_level"].mean()

                # Calculate overall score
                overall_score = 0
                denominator = 0
                for level in range(1, 11):  # Difficulty levels from 1 to 10
                    count_known_level = df_copy[
                        (df_copy['known'] == 'known') & (df_copy['difficulty_level'] == level)
                    ].shape[0]
                    overall_score += level * count_known_level
                    denominator += level * 10

                overall_score = (overall_score / denominator) * 100

                # Append the results to the CSV file
                results_writer.writerow(
                    [
                        output_file_path,
                        total_words,
                        known_words,
                        not_known_words,
                        average_difficulty_known,
                        average_difficulty_not_known,
                        overall_score,
                    ]
                )

        self.stdout.write(self.style.SUCCESS(f'{num_files} files generated successfully!'))
