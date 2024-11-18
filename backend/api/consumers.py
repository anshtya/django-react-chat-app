import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from .constants import EVENT_USER_JOIN, EVENT_CHAT_MESSAGE
from .models import Message, ChatRoom, User

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f'chat_{self.room_name}'
        username = self.scope['url_route']['kwargs']['username']

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': EVENT_USER_JOIN,
                'username': username,
                'message': f'{username} has joined the room.',
            }
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_content = data['content']
        username = data['username']

        message = await self.save_message(self.room_name, username, message_content)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': EVENT_CHAT_MESSAGE,
                'user': message.user.username,
                'profile_picture': message.user.profile_picture.url,
                'content': message.content
            }
        )

    async def chat_message(self, event):
        user = event['user']
        profile_picture = event['profile_picture']
        content = event['content']
        await self.send(text_data=json.dumps({
            'type': EVENT_CHAT_MESSAGE,
            'user': user,
            'user_picture': profile_picture,
            'content': content
        }))

    async def join_room(self, event):
        message = event['message']
        user = event['username']
        await self.send(text_data=json.dumps({
            'type': EVENT_USER_JOIN,
            'user': user,
            'message': message
        }))

    @database_sync_to_async
    def save_message(self, room_id, username, content):
        user = User.objects.get(username=username)
        room = ChatRoom.objects.get(id=room_id)
        return Message.objects.create(user=user, room=room, content=content)