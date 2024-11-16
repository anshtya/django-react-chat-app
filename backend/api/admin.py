from django.contrib import admin
from .models import ChatRoom, User, Message

admin.site.register({User, ChatRoom, Message})