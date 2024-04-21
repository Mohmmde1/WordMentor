from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow the user who owns the profile to access the book.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the request user is the owner of the profile associated with the book
        return obj.user == request.user
