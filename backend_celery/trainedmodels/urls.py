from rest_framework.routers import DefaultRouter

from .views import FineTuneViewSet

router = DefaultRouter()

router.register(r'', FineTuneViewSet, basename="fine-tune")

urlpatterns = router.urls
