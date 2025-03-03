from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from faker import Faker
from kudos_app.models import Organization, Kudo

User = get_user_model()

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        fake = Faker()

        org1 = Organization.objects.create(name="Tech Corp")
        org2 = Organization.objects.create(name="Design Studio")

        users_org1 = []
        users_org2 = []

        for _ in range(3):
            user1 = User.objects.create_user(
                username=fake.user_name(),
                password="password",
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                organization=org1
            )
            users_org1.append(user1)

            user2 = User.objects.create_user(
                username=fake.user_name(),
                password="password",
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                organization=org2
            )
            users_org2.append(user2)

        self.create_kudos(users_org1, fake)
        self.create_kudos(users_org2, fake)

        self.stdout.write(self.style.SUCCESS('Demo data loaded successfully!'))

    def create_kudos(self, users, fake):
        for sender in users:
            for receiver in users:
                if sender != receiver and sender.kudos_remaining > 0:
                    Kudo.objects.create(
                        sender=sender,
                        receiver=receiver,
                        message=fake.sentence()
                    )
                    sender.kudos_remaining -= 1
                    sender.save()