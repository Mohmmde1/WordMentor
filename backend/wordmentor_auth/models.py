from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class WordMentorUserManager(UserManager):
    def _create_user(self, email, username, password, **extra_fields):
        if not email:
            raise ValueError("Email must be set")
        if not username:
            raise ValueError("Username must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, username, password, **extra_fields)

    def create_superuser(self, email, username, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, username, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)
    username = models.CharField(_("username"), max_length=150, unique=True)

    objects = WordMentorUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email
