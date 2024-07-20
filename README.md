# Word Mentor Project Documentation

## Project Repository
The code for the Word Mentor project can be found on GitHub at the following link:
[WordMentor GitHub Repository](https://github.com/Mohmmde1/WordMentor)

## Overview
The Word Mentor System is a comprehensive platform designed to enhance readers' language proficiency through interactive tools and assessments. The project follows Agile Kanban methodology for iterative development, employing Django for the backend and PostgreSQL for the database.

## Key Features
- **Auth Package:** Manages user authentication and authorization.
- **Books Package:** Handles book-related functionalities such as uploading, listing, and deleting books.
- **Progress Tracking Package:** Monitors and tracks user progress.
- **Word Package:** Manages word-related features.
- **Assessment Package:** Conducts assessments and provides feedback.
- **Settings Package:** Allows users to configure and update their profiles and preferences.

## Use Cases
1. **Uploading Books:** Users can upload books in various formats.
2. **Selecting Pages:** Users can select specific pages for reading or analysis.
3. **Listing Books:** Displays a list of all uploaded books.
4. **Deleting Books:** Provides functionality to delete books from the repository.
5. **Monitoring Progress:** Tracks user progress and provides insights.
6. **Updating Profiles:** Allows users to update their personal information and preferences.

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/Mohmmde1/WordMentor.git
    ```
2. Navigate to the project directory:
    ```sh
    cd WordMentor
    ```
3. Create and activate a virtual environment:
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```
4. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```
5. Apply migrations:
    ```sh
    python manage.py migrate
    ```
6. Create a superuser:
    ```sh
    python manage.py createsuperuser
    ```
7. Run the development server:
    ```sh
    python manage.py runserver
    ```

## Usage
1. Access the application at `http://127.0.0.1:8000/`.
2. Log in with the superuser account.
3. Use the dashboard to upload books, select pages, monitor progress, and manage profiles.


## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



