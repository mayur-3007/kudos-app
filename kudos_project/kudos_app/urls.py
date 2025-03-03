from django.urls import path
from .views import (
    GetAllOrganizations,
    UserRegistration,
    UserLogin,
    CurrentUser,
    UserList,
    GiveKudos,
    ReceivedKudos,
    UserLogout
)

urlpatterns = [
    path('organizations/', GetAllOrganizations.as_view(), name='get_all_organizations'),
    path('register/', UserRegistration.as_view(), name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),
    path('current_user/', CurrentUser.as_view(), name='current_user'),
    path('users/', UserList.as_view(), name='user_list'),
    path('kudos/give/', GiveKudos.as_view(), name='give_kudos'),
    path('kudos/received/', ReceivedKudos.as_view(), name='received_kudos'),
]