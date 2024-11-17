from rest_framework import serializers
from .models import ChatRoom, Message, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'profile_picture']
    
class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ['id', 'name']

class MessageSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    user_picture = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'content', 'room', 'user', 'user_picture']

    def get_user_picture(self, obj):
        return obj.user.profile_picture.url