"""
Rutas para gestionar reviews
"""
from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required
from app.supabase_client import SupabaseClient

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/')
@login_required
def list():
    """Lista de reviews"""
    try:
        reviews = SupabaseClient.get_reviews()
        return render_template('reviews/list.html', reviews=reviews)
    except Exception as e:
        flash(f'Error al cargar reviews: {str(e)}', 'danger')
        return render_template('reviews/list.html', reviews=[])

@reviews_bp.route('/<review_id>/toggle-active', methods=['POST'])
@login_required
def toggle_active(review_id):
    """Activar/desactivar review"""
    try:
        # Nota: Asumiendo que la tabla reviews tiene campo is_active
        # Si no existe, necesitarás agregarlo a la base de datos
        review = SupabaseClient.get_reviews()
        review = next((r for r in review if r['id'] == review_id), None)
        
        if review:
            new_status = not review.get('is_active', True)
            SupabaseClient.update_review(review_id, {'is_active': new_status})
            status_text = 'activada' if new_status else 'desactivada'
            flash(f'Review {status_text} exitosamente', 'success')
        else:
            flash('Review no encontrada', 'danger')
    except Exception as e:
        flash(f'Error al cambiar estado: {str(e)}', 'danger')
    
    return redirect(url_for('reviews.list'))

@reviews_bp.route('/<review_id>/delete', methods=['POST'])
@login_required
def delete(review_id):
    """Eliminar review"""
    try:
        SupabaseClient.delete_review(review_id)
        flash('Review eliminada exitosamente', 'success')
    except Exception as e:
        flash(f'Error al eliminar review: {str(e)}', 'danger')
    
    return redirect(url_for('reviews.list'))
