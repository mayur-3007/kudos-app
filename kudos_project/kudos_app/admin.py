from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Organization, User, Kudo

# Register the Organization model
@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

# Register the User model
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'organization', 'kudos_remaining', 'last_kudos_reset')
    list_filter = ('organization',)
    fieldsets = UserAdmin.fieldsets + (
        ('Kudos Info', {'fields': ('organization', 'kudos_remaining', 'last_kudos_reset')}),
    )

# Register the Kudo model
@admin.register(Kudo)
class KudoAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'receiver', 'created_at')
    list_filter = ('sender', 'receiver')
    search_fields = ('message',)