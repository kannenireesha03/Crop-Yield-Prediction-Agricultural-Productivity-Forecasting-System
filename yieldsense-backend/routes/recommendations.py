from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/v1/analytics",
    tags=["Analytics & Recommendations"]
)

# Request Model
class FarmAnalyticsRequest(BaseModel):
    crop_type: str
    avg_temp: float
    rainfall: float
    soil_ph: float
    nitrogen: float
    phosphorus: float
    potassium: float


@router.post("/recommendations")
def generate_farm_insights(payload: FarmAnalyticsRequest):

    recommendations = []
    risks = []

    # Soil pH Recommendation
    if payload.soil_ph < 6.0:
        recommendations.append(
            "Apply agricultural lime to increase soil pH."
        )
    elif payload.soil_ph > 7.5:
        recommendations.append(
            "Apply elemental sulfur to reduce soil pH."
        )
    else:
        recommendations.append(
            "Soil pH is optimal."
        )

    # Nitrogen Recommendation
    if payload.nitrogen < 50:
        recommendations.append(
            "Low Nitrogen detected. Apply Urea fertilizer."
        )

    # Phosphorus Recommendation
    if payload.phosphorus < 40:
        recommendations.append(
            "Apply Phosphorus fertilizer."
        )

    # Potassium Recommendation
    if payload.potassium < 40:
        recommendations.append(
            "Apply Potassium fertilizer."
        )

    # Risk Assessment
    risk_level = "Low"

    if payload.rainfall < 300:
        risk_level = "High"
        risks.append({
            "type": "Drought Risk",
            "severity": "High",
            "advice": "Increase irrigation immediately."
        })

    elif payload.rainfall > 1200:
        risk_level = "Medium"
        risks.append({
            "type": "Flood Risk",
            "severity": "Medium",
            "advice": "Ensure proper field drainage."
        })

    if payload.avg_temp > 35:
        risk_level = "High"
        risks.append({
            "type": "Heat Stress",
            "severity": "High",
            "advice": "Water crops during morning or evening."
        })

    return {
        "crop": payload.crop_type,
        "overall_risk_level": risk_level,
        "identified_risks": risks,
        "actionable_recommendations": recommendations,
        "best_practice_tips": [
            "Rotate crops every season.",
            "Use organic manure regularly.",
            "Monitor weather updates weekly."
        ]
    }