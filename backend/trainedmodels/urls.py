from rest_framework.routers import DefaultRouter

from .views import FineTuneViewSet, PredictionViewSet

router = DefaultRouter()

router.register(r'train', FineTuneViewSet, basename="fine-tune")
router.register(r'predict', PredictionViewSet, basename="prediction")

urlpatterns = router.urls
