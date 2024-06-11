from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow the user who owns the obj to access the obj.
    """

    def has_object_permission(self, request, view, obj):
        
        return obj.profile.user == request.user
