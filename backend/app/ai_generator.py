"""
Generador de contenido usando Groq AI
"""
from groq import Groq
from app.supabase_client import SupabaseClient
import logging

logger = logging.getLogger(__name__)

class AIContentGenerator:
    """Genera contenido para servicios usando Groq AI"""
    
    @classmethod
    def get_groq_client(cls):
        """Obtiene el cliente de Groq configurado"""
        api_key = SupabaseClient.get_setting('groq_api_key')
        
        if not api_key:
            raise ValueError("API Key de Groq no configurada. Ve a Configuración para agregarla.")
        
        return Groq(api_key=api_key)
    
    @classmethod
    def generate_service_content(cls, title: str) -> dict:
        """
        Genera descripción corta y contenido completo para un servicio
        
        Args:
            title: Título del servicio (ej: "Reparación de Televisores")
            
        Returns:
            dict: {
                'description': 'Descripción corta (max 150 chars)',
                'long_description': 'Contenido HTML completo'
            }
        """
        try:
            client = cls.get_groq_client()
            model = SupabaseClient.get_setting('groq_model', 'llama-3.3-70b-versatile')
            
            # Prompt para generar contenido
            prompt = f"""Eres un redactor experto en servicios técnicos de reparación de televisores todas las marcas.

Genera contenido profesional en español para el servicio: "{title}"

IMPORTANTE:
1. La descripción corta debe tener MÁXIMO 150 caracteres y minimo 100 caracteres
2. El contenido completo debe estar en HTML válido, bien estructurado
3. Usa etiquetas semánticas: <h2>, <h3>, <p>, <ul>, <li>, <strong>
4. El tono debe ser profesional pero cercano
5. Enfócate en beneficios para el cliente
6. Incluye información sobre garantía que es de 3 meses desde su reparación y calidad
7. El contenido debe ser original y no contener frases genéricas o clichés y con un minimo de 600 palabras y un máximo de 1200 palabras

Responde ÚNICAMENTE con un JSON válido en este formato exacto:
{{
  "description": "Descripción corta aquí (max 150 caracteres)",
  "long_description": "<h2>Título Principal</h2><p>Contenido HTML aquí...</p>"
}}

NO agregues explicaciones adicionales, SOLO el JSON."""

            logger.info(f"Generando contenido para: {title}")
            
            # Llamada a Groq
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "Eres un asistente que genera contenido en formato JSON para servicios técnicos. Siempre respondes únicamente con JSON válido, sin texto adicional."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model=model,
                temperature=0.7,
                max_tokens=2000,
                top_p=1,
                stream=False
            )
            
            # Extraer respuesta
            response_text = chat_completion.choices[0].message.content.strip()
            logger.debug(f"Respuesta de Groq: {response_text[:200]}...")
            
            # Parsear JSON de la respuesta
            import json
            import re
            
            # Limpiar respuesta por si tiene markdown
            if response_text.startswith("```json"):
                response_text = response_text.replace("```json", "").replace("```", "").strip()
            elif response_text.startswith("```"):
                response_text = response_text.replace("```", "").strip()
            
            # SOLUCIÓN: Usar json.loads con strict=False para permitir control characters
            # O mejor aún, usar una regex para extraer solo el objeto JSON válido
            try:
                content = json.loads(response_text, strict=False)
            except json.JSONDecodeError:
                # Si falla, intentar limpiar saltos de línea dentro de strings
                # Buscar el JSON usando regex para ser más flexible
                json_match = re.search(r'\{[\s\S]*\}', response_text)
                if json_match:
                    response_text = json_match.group(0)
                    content = json.loads(response_text, strict=False)
                else:
                    raise
            
            # Validar respuesta
            if 'description' not in content or 'long_description' not in content:
                raise ValueError("Respuesta de IA incompleta")
            
            # Asegurar límite de 150 caracteres en descripción
            if len(content['description']) > 150:
                content['description'] = content['description'][:147] + '...'
            
            logger.info(f"Contenido generado exitosamente para: {title}")
            return content
            
        except json.JSONDecodeError as e:
            logger.error(f"Error al parsear JSON de Groq: {str(e)}")
            logger.error(f"Respuesta recibida: {response_text}")
            raise ValueError("La IA no generó contenido en formato válido. Intenta de nuevo.")
        
        except Exception as e:
            logger.error(f"Error al generar contenido: {str(e)}")
            raise
    
    @classmethod
    def is_enabled(cls) -> bool:
        """Verifica si la generación con IA está habilitada"""
        enabled = SupabaseClient.get_setting('ai_generation_enabled', 'true')
        api_key = SupabaseClient.get_setting('groq_api_key', '')
        
        return enabled.lower() == 'true' and bool(api_key)
