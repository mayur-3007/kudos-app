from celery import shared_task
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

@shared_task
def reset_kudos_for_all_users():
    users = User.objects.all()
    for user in users:
        user.reset_kudos_if_needed()