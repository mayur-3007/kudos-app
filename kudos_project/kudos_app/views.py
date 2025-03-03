from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import Organization, Kudo, User
from .serializers import UserSerializer, KudoSerializer, OrganizationSerializer, UserRegistrationSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

class GetAllOrganizations(APIView):
    permission_classes = []

    @method_decorator(cache_page(60 * 15))  # Cache for 15 minutes
    def get(self, request):
        organizations = Organization.objects.all()
        serializer = OrganizationSerializer(organizations, many=True)
        return Response(serializer.data)

class UserRegistration(APIView):
    permission_classes = []

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        organization_id = request.data.get('organization')
        try:
            organization = Organization.objects.get(id=organization_id)
        except Organization.DoesNotExist:
            return Response(
                {"error": "Organization does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer.save(organization=organization)
        return getToken(request)

def getToken(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)
    else:
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )

class UserLogin(APIView):
    permission_classes = []
    def post(self, request):
        return getToken(request)

class CurrentUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class UserList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.filter(organization=request.user.organization).exclude(id=request.user.id)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class GiveKudos(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        sender = request.user
        sender.reset_kudos_if_needed()

        if sender.kudos_remaining < 1:
            return Response(
                {"error": "No kudos remaining"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = KudoSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(sender=sender)
            sender.kudos_remaining -= 1
            sender.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReceivedKudos(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        kudos = Kudo.objects.filter(receiver=request.user).order_by('-created_at')
        serializer = KudoSerializer(kudos, many=True)
        return Response(serializer.data)

class UserLogout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)