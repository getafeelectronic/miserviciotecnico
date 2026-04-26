"""
Cliente de Supabase para interactuar con la base de datos
"""
from supabase import create_client, Client
from app.config import Config
import logging
from PIL import Image
import io
import uuid
from datetime import datetime

# Configurar logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class SupabaseClient:
    """Cliente singleton para Supabase"""
    
    _instance: Client = None
    
    @classmethod
    def get_client(cls) -> Client:
        """Obtiene la instancia del cliente Supabase"""
        if cls._instance is None:
            url = Config.SUPABASE_URL
            key = Config.SUPABASE_SERVICE_KEY or Config.SUPABASE_KEY
            
            logger.debug(f"Inicializando Supabase con URL: {url}")
            logger.debug(f"Service Key presente: {bool(Config.SUPABASE_SERVICE_KEY)}")
            
            if not url or not key:
                raise ValueError("SUPABASE_URL y SUPABASE_KEY/SUPABASE_SERVICE_KEY son requeridos")
            
            cls._instance = create_client(url, key)
            logger.info("Cliente Supabase inicializado correctamente")
        
        return cls._instance
    
    @classmethod
    def get_services(cls):
        """Obtiene todos los servicios"""
        try:
            client = cls.get_client()
            logger.debug("Consultando tabla 'services'...")
            response = client.table('services').select('*').order('display_order').execute()
            logger.debug(f"Servicios obtenidos: {len(response.data)} registros")
            return response.data
        except Exception as e:
            logger.error(f"Error al obtener servicios: {str(e)}", exc_info=True)
            raise
    
    @classmethod
    def get_service_by_id(cls, service_id):
        """Obtiene un servicio por ID"""
        try:
            client = cls.get_client()
            response = client.table('services').select('*').eq('id', service_id).single().execute()
            return response.data
        except Exception as e:
            logger.error(f"Error al obtener servicio {service_id}: {str(e)}")
            return None
    
    @classmethod
    def create_service(cls, data):
        """Crea un nuevo servicio"""
        client = cls.get_client()
        response = client.table('services').insert(data).execute()
        return response.data[0] if response.data else None
    
    @classmethod
    def update_service(cls, service_id, data):
        """Actualiza un servicio"""
        client = cls.get_client()
        response = client.table('services').update(data).eq('id', service_id).execute()
        return response.data[0] if response.data else None
    
    @classmethod
    def delete_service(cls, service_id):
        """Elimina un servicio"""
        client = cls.get_client()
        response = client.table('services').delete().eq('id', service_id).execute()
        return response.data
    
    @classmethod
    def get_reviews(cls):
        """Obtiene todas las reviews"""
        client = cls.get_client()
        response = client.table('reviews').select('*').order('date', desc=True).execute()
        return response.data
    
    @classmethod
    def update_review(cls, review_id, data):
        """Actualiza una review"""
        client = cls.get_client()
        response = client.table('reviews').update(data).eq('id', review_id).execute()
        return response.data[0] if response.data else None
    
    @classmethod
    def delete_review(cls, review_id):
        """Elimina una review"""
        client = cls.get_client()
        response = client.table('reviews').delete().eq('id', review_id).execute()
        return response.data
    
    @classmethod
    def get_social_links(cls):
        """Obtiene los enlaces de redes sociales"""
        client = cls.get_client()
        response = client.table('social_links').select('*').order('display_order').execute()
        return response.data
    
    @classmethod
    def update_social_link(cls, link_id, data):
        """Actualiza un enlace social"""
        client = cls.get_client()
        response = client.table('social_links').update(data).eq('id', link_id).execute()
        return response.data[0] if response.data else None
    
    @classmethod
    def upload_image(cls, bucket_name, file_path, file_data):
        """Sube una imagen a Supabase Storage"""
        client = cls.get_client()
        response = client.storage.from_(bucket_name).upload(file_path, file_data)
        return response
    
    @classmethod
    def process_and_upload_image(cls, file, folder='services'):
        """
        Procesa y sube una imagen a Supabase Storage
        
        Args:
            file: Archivo de Flask (werkzeug.datastructures.FileStorage)
            folder: Carpeta donde guardar (services, reviews, etc.)
            
        Returns:
            str: URL pública de la imagen subida
        """
        try:
            # Abrir imagen con Pillow
            img = Image.open(file.stream)
            
            # Convertir a RGB si es necesario (para PNG con transparencia)
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            
            # Redimensionar si es muy grande (máximo 1920px)
            max_size = 1920
            if img.width > max_size or img.height > max_size:
                img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
            
            # Guardar en buffer como JPEG con calidad 85%
            buffer = io.BytesIO()
            img.save(buffer, format='JPEG', quality=85, optimize=True)
            buffer.seek(0)
            
            # Generar nombre único
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            unique_id = str(uuid.uuid4())[:8]
            filename = f"{folder}/{timestamp}_{unique_id}.jpg"
            
            # Subir a Supabase Storage
            client = cls.get_client()
            bucket_name = 'images'
            
            # Subir archivo
            response = client.storage.from_(bucket_name).upload(
                filename,
                buffer.getvalue(),
                file_options={"content-type": "image/jpeg"}
            )
            
            logger.debug(f"Imagen subida: {filename}")
            
            # Obtener URL pública
            public_url = client.storage.from_(bucket_name).get_public_url(filename)
            
            return public_url
            
        except Exception as e:
            logger.error(f"Error al procesar/subir imagen: {str(e)}")
            raise
    
    @classmethod
    def get_public_url(cls, bucket_name, file_path):
        """Obtiene la URL pública de un archivo"""
        client = cls.get_client()
        response = client.storage.from_(bucket_name).get_public_url(file_path)
        return response
    
    @classmethod
    def delete_image(cls, bucket_name, file_path):
        """Elimina una imagen de Supabase Storage"""
        client = cls.get_client()
        response = client.storage.from_(bucket_name).remove([file_path])
        return response
    
    @classmethod
    def list_images(cls, bucket_name, folder=''):
        """
        Lista las imágenes de un bucket/carpeta
        
        Args:
            bucket_name: Nombre del bucket (ej: 'images')
            folder: Carpeta dentro del bucket (ej: 'services')
            
        Returns:
            list: Lista de imágenes con sus URLs públicas
        """
        try:
            client = cls.get_client()
            
            # Listar archivos en la carpeta
            response = client.storage.from_(bucket_name).list(folder)
            
            images = []
            for file in response:
                # Solo incluir archivos (no carpetas)
                if file.get('id'):
                    file_path = f"{folder}/{file['name']}" if folder else file['name']
                    public_url = client.storage.from_(bucket_name).get_public_url(file_path)
                    
                    images.append({
                        'name': file['name'],
                        'path': file_path,
                        'url': public_url,
                        'size': file.get('metadata', {}).get('size', 0),
                        'created_at': file.get('created_at', ''),
                        'updated_at': file.get('updated_at', '')
                    })
            
            logger.debug(f"Imágenes listadas: {len(images)} archivos")
            return images
            
        except Exception as e:
            logger.error(f"Error al listar imágenes: {str(e)}")
            return []
    
    # ========== CONFIGURACIONES / SETTINGS ==========
    
    @classmethod
    def get_setting(cls, key, default=None):
        """
        Obtiene una configuración del sistema
        
        Args:
            key: Clave de la configuración (ej: 'groq_api_key')
            default: Valor por defecto si no existe
            
        Returns:
            str: Valor de la configuración
        """
        try:
            client = cls.get_client()
            response = client.table('settings').select('value').eq('key', key).execute()
            
            if response.data and len(response.data) > 0:
                return response.data[0]['value']
            return default
            
        except Exception as e:
            logger.error(f"Error al obtener setting '{key}': {str(e)}")
            return default
    
    @classmethod
    def set_setting(cls, key, value, description=None):
        """
        Guarda o actualiza una configuración del sistema
        
        Args:
            key: Clave de la configuración
            value: Valor a guardar
            description: Descripción opcional
            
        Returns:
            dict: Configuración guardada
        """
        try:
            client = cls.get_client()
            
            # Verificar si existe
            existing = client.table('settings').select('id').eq('key', key).execute()
            
            data = {
                'key': key,
                'value': value,
                'updated_at': datetime.now().isoformat()
            }
            
            if description:
                data['description'] = description
            
            if existing.data and len(existing.data) > 0:
                # Actualizar
                response = client.table('settings').update(data).eq('key', key).execute()
            else:
                # Insertar
                response = client.table('settings').insert(data).execute()
            
            logger.info(f"Setting '{key}' guardado correctamente")
            return response.data[0] if response.data else None
            
        except Exception as e:
            logger.error(f"Error al guardar setting '{key}': {str(e)}")
            raise
    
    @classmethod
    def get_all_settings(cls):
        """
        Obtiene todas las configuraciones del sistema
        
        Returns:
            dict: Diccionario con todas las configuraciones {key: value}
        """
        try:
            client = cls.get_client()
            response = client.table('settings').select('key, value').execute()
            
            settings = {}
            for item in response.data:
                settings[item['key']] = item['value']
            
            return settings
            
        except Exception as e:
            logger.error(f"Error al obtener configuraciones: {str(e)}")
            return {}
