from rest_framework import serializers
from .models import Kudo, User, Organization

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name']

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name', 'email', 'organization')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Extract organization from validated_data
        organization = validated_data.pop('organization')
        
        user = User.objects.create_user(
            **validated_data,
            organization=organization
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    organization_name = serializers.CharField(source='organization.name', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'organization_name', 'kudos_remaining']
        read_only_fields = ['id', 'username', 'email', 'organization_name']

class KudoSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    message = serializers.CharField(max_length=500)

    class Meta:
        model = Kudo
        fields = ['id', 'sender', 'receiver', 'message', 'created_at']
        read_only_fields = ['id', 'sender', 'created_at']

    def validate_receiver(self, value):
        request = self.context.get('request')
        if request.user.organization != value.organization:
            raise serializers.ValidationError("Cannot send kudos to users outside your organization")
        return value

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['receiver'] = UserSerializer(instance.receiver).data
        return representation

