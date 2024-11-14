from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    profile_picture = models.ImageField(default='profile_pictures/blank.png', upload_to='profile_pictures')