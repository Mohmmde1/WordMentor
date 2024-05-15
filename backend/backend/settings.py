"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.2.8.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import os

from pathlib import Path
from datetime import timedelta


from configurations import Configuration, values
import logging
import socket

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

MODE = os.environ.get('MODE')

if MODE == "docker":
    hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())


logger = logging.getLogger(__name__)

class Dev(Configuration):
    # Build paths inside the project like this: BASE_DIR / 'subdir'.
    BASE_DIR = Path(__file__).resolve().parent.parent

    DOTENV = os.path.join(BASE_DIR, '.env')

    FIREBASE_PATH = os.path.join(BASE_DIR, 'wordmentor_firebase.json')

    # Quick-start development settings - unsuitable for production
    # See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

    # SECURITY WARNING: keep the secret key used in production secret!
    SECRET_KEY = 'django-insecure-ba-$pse%or=e6*6t%t=8i=c&wc5o4!dt2*sh%j7gt3+xy-r441'


    # SECURITY WARNING: don't run with debug turned on in production!
    DEBUG = values.BooleanValue(True)

    ALLOWED_HOSTS = values.ListValue(["backend", "localhost"])


    # Application definition

    INSTALLED_APPS = values.ListValue(default=[
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'debug_toolbar',
        'rest_framework',
        'rest_framework.authtoken',
        'corsheaders',
        'wordmentor_auth',
        'dj_rest_auth',
        'django.contrib.sites',
        'allauth',
        'allauth.account',
        'allauth.socialaccount',
        'dj_rest_auth.registration',
        'settings',
        'word',
        'assessment',
        'books',
        'trainedmodels',
    ])

    MIDDLEWARE = values.ListValue(default=[
        'debug_toolbar.middleware.DebugToolbarMiddleware',
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'corsheaders.middleware.CorsMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
        'allauth.account.middleware.AccountMiddleware'

    ])

    ROOT_URLCONF = values.Value('backend.urls')

    TEMPLATES = values.ListValue(default=[
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ])



    REST_FRAMEWORK = values.DictValue(default={
        'DEFAULT_AUTHENTICATION_CLASSES': [
            'rest_framework_simplejwt.authentication.JWTAuthentication',
        ],
        'DEFAULT_PERMISSION_CLASSES': [
                'rest_framework.permissions.IsAuthenticated',
            ]
    })


    LOGGING = values.DictValue(default={
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "verbose": {
                "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}", "style": "{", }, },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stdout",
                "formatter": "verbose",
            },
        },
        "root": {
            "handlers": ["console"],
            "level": "DEBUG",
        },
    })

    WSGI_APPLICATION = values.Value('backend.wsgi.application')


    # Database
    # https://docs.djangoproject.com/en/4.2/ref/settings/#databases

    if MODE == "docker":
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.postgresql',
                'NAME': values.Value(environ_name='DATABASE_NAME'),
                'USER': values.Value(environ_name='DATABASE_USER'),
                'PASSWORD': values.Value(environ_name='DATABASE_PASSWORD'),
                'HOST': values.Value(environ_name='DATABASE_HOST'),
                'PORT': values.Value(environ_name='DATABASE_PORT'),
            }
        }
    else:
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': BASE_DIR / 'db.sqlite3',
            }
        }

    # Password validation
    # https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

    AUTH_PASSWORD_VALIDATORS = values.ListValue(default=[
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ])


    # Internationalization
    # https://docs.djangoproject.com/en/4.2/topics/i18n/

    LANGUAGE_CODE = values.Value('en-us')

    TIME_ZONE = values.Value("UTC")

    USE_I18N = values.BooleanValue(True)

    USE_TZ = values.BooleanValue(True)


    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/4.2/howto/static-files/

    STATIC_URL = values.Value('static/')

    # Default primary key field type
    # https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

    DEFAULT_AUTO_FIELD = values.Value('django.db.models.BigAutoField')



    if MODE == "docker":
        INTERNAL_IPS = [ip[:-1] + '1' for ip in ips] + ['127.0.0.1']
        
    DEBUG_TOOLBAR_CONFIG = {
        'SHOW_TOOLBAR_CALLBACK': lambda request: False if False else True,
    }

    X_RAPID_API_KEY = values.SecretValue(environ_name="X_RAPID_API_KEY")

    CORS_ORIGIN_ALLOW_ALL = values.BooleanValue(True)

    AUTH_USER_MODEL = "wordmentor_auth.User"
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
    ACCOUNT_ACTIVATION_DAYS = 7

    # ACCOUNT_USER_MODEL_USERNAME_FIELD = None
    ACCOUNT_EMAIL_REQUIRED = True
    ACCOUNT_USERNAME_REQUIRED = True
    ACCOUNT_AUTHENTICATION_METHOD = "email"
    ACCOUNT_UNIQUE_EMAIL = True
    MEDIA_ROOT = BASE_DIR / "media"
    ACCOUNT_EMAIL_VERIFICATION = 'none'
    MEDIA_URL = "/media/"
    SITE_ID = 1
    SIMPLE_JWT = {
        "ACCESS_TOKEN_LIFETIME": timedelta(days=7),
        "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
        "ROTATE_REFRESH_TOKEN": False,
        "BLACKLIST_AFTER_ROTATION": False,
        "UPDATE_LAST_LOGIN": True,
        "SIGNING_KEY": "acomplexkey",
        "ALOGRIGTHM": "HS512",
    }
    REST_AUTH = {
            'REGISTER_SERIALIZER': 'wordmentor_auth.serializers.CustomRegisterSerializer',
            "USE_JWT": True,
            "JWT_AUTH_HTTPONLY": False,
            "USER_DETAILS_SERIALIZER": "wordmentor_auth.serializers.UserDetailSerializer"
    }
    AUTHENTICATION_BACKENDS = [
        # allauth specific authentication methods, such as login by e-mail
        'allauth.account.auth_backends.AuthenticationBackend',
        # Needed to login by username in Django admin, regardless of allauth
        'django.contrib.auth.backends.ModelBackend',
    ]
    if MODE != "docker":
        # Celery Configuration
        CELERY_BROKER_URL = 'redis://localhost:6379/0'
        CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
    else:
        CELERY_BROKER_URL = 'redis://redis:6379/0'
        CELERY_RESULT_BACKEND = 'redis://redis:6379/0'
        
    CELERY_ACCEPT_CONTENT = ['json']
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'
    CELERY_TIMEZONE = 'UTC'



class Prod(Dev):
    DEBUG = False
    SECRET_KEY = values.SecretValue()
    X_RAPID_API_KEY = values.SecretValue()
