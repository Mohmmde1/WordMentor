import requests
from django.core.management.base import BaseCommand
from word.models import Word

class Command(BaseCommand):
    help = 'Seeds the database with additional data from a remote service for each word entry'
    BASE_URL = 'https://backend-bvutct6wjq-uc.a.run.app/api/v1/word/'
    LOGIN_URL = 'https://backend-bvutct6wjq-uc.a.run.app/api/v1/auth/login/'
    EMAIL = 'mohammed@gmail.com'
    PASSWORD = 'Ab1277795*'

    def handle(self, *args, **kwargs):
        # Authenticate and get the token
        token = self.login_and_get_token()
        if not token:
            self.stdout.write(self.style.ERROR("Failed to obtain authentication token."))
            return
        
        headers = {
            'Authorization': f'Bearer {token}'
        }

        # Fetch words from the local database
        words = Word.objects.all()
        for word in words:
            url = f'{self.BASE_URL}{word.entry}'
            response = requests.get(url, headers=headers)
            if response.status_code == 201:
                # word_data = response.json()
                # word.definition = word_data.get('definition', word.definition)
                # # Update other fields as needed
                # word.save()
                self.stdout.write(self.style.SUCCESS(f"Updated word: with entry: {word.entry}"))
            else:
                self.stdout.write(self.style.ERROR(f"Failed to fetch data for word entry: {word.entry}. Status code: {response.status_code}"))

    def login_and_get_token(self):
        data = {
            'email': self.EMAIL,
            'password': self.PASSWORD
        }
        response = requests.post(self.LOGIN_URL, data=data)
        if response.status_code == 200:
            return response.json().get('access')  # Assuming the JWT token is returned as 'access'
        else:
            self.stdout.write(self.style.ERROR(f"Login failed. Status code: {response.status_code}"))
            return None
