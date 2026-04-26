"""
Rutas del dashboard principal
"""
from flask import Blueprint, render_template
from flask_login import login_required
from app.supabase_client import SupabaseClient

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/')
@dashboard_bp.route('/dashboard')
@login_required
def index():
    """Dashboard principal"""
    try:
        # Obtener estadísticas
        services = SupabaseClient.get_services()
        reviews = SupabaseClient.get_reviews()
        social_links = SupabaseClient.get_social_links()
        
        stats = {
            'total_services': len(services),
            'active_services': len([s for s in services if s.get('is_active')]),
            'featured_services': len([s for s in services if s.get('is_featured')]),
            'total_reviews': len(reviews),
            'total_social_links': len(social_links)
        }
        
        return render_template('dashboard/index.html', stats=stats)
    except Exception as e:
        return render_template('dashboard/index.html', stats={}, error=str(e))
