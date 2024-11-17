from django.shortcuts import render
from .models import ChatRoom, Message, User
from rest_framework import generics
from .serializers import MessageSerializer, ProfileSerializer, UserSerializer, ChatRoomSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class MyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
class UserProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        username_arg = self.kwargs['username']
        return super().get_queryset().get(username=username_arg)

class ChatRoomsListView(generics.ListAPIView):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    permission_classes = [AllowAny]

class ChatRoomMessageListAPIView(generics.ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        chatroom_id = self.kwargs['pk']
        return super().get_queryset().filter(room_id=chatroom_id)

# class MessageCreateAPIView(generics.CreateAPIView):
#     serializer_class = MessageSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)