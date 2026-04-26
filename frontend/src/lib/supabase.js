/**
 * Cliente de Supabase
 * 
 * Configuración centralizada para acceder a Supabase Database
 * desde la aplicación React.
 * 
 * Variables de entorno requeridas:
 * - VITE_SUPABASE_URL: URL de tu proyecto Supabase
 * - VITE_SUPABASE_ANON_KEY: Clave pública (anon) de tu proyecto
 * 
 * Estas variables se configuran en GitHub Secrets y se inyectan
 * durante el build mediante el workflow CI/CD.
 */

import { createClient } from '@supabase/supabase-js'

// Obtener credenciales desde variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validar que las credenciales estén configuradas (warning, no error)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Credenciales de Supabase no configuradas. ',
    'Algunas funcionalidades pueden usar datos de fallback.'
  )
}

// Crear y exportar el cliente de Supabase
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false // No necesitamos persistencia de sesión para datos públicos
      }
    })
  : null

/**
 * Funciones helper para operaciones comunes
 */

/**
 * Obtener todas las reviews ordenadas por fecha de creación (más recientes primero)
 * @returns {Promise<Array>} Array de reviews o null si falla
 */
export async function getReviews() {
  if (!supabase) {
    console.warn('Cliente de Supabase no inicializado')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error al obtener reviews:', error)
      return null
    }
    
    return data || []
  } catch (err) {
    console.error('Error de red al obtener reviews:', err)
    return null
  }
}

/**
 * Obtener un número limitado de reviews destacadas
 * @param {number} limit - Número máximo de reviews a obtener
 * @returns {Promise<Array>} Array de reviews o null si falla
 */
export async function getFeaturedReviews(limit = 3) {
  if (!supabase) {
    console.warn('Cliente de Supabase no inicializado')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('rating', 5) // Solo 5 estrellas
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error al obtener reviews destacadas:', error)
      return null
    }
    
    return data || []
  } catch (err) {
    console.error('Error de red al obtener reviews destacadas:', err)
    return null
  }
}

/**
 * Obtener enlaces de redes sociales activos ordenados por display_order
 * @returns {Promise<Array>} Array de redes sociales o null si falla
 */
export async function getSocialLinks() {
  if (!supabase) {
    console.warn('Cliente de Supabase no inicializado')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
    
    if (error) {
      console.error('Error al obtener redes sociales:', error)
      return null
    }
    
    return data || []
  } catch (err) {
    console.error('Error de red al obtener redes sociales:', err)
    return null
  }
}

/**
 * Obtener servicios destacados para mostrar en Home (preview)
 * @returns {Promise<Array>} Array de servicios destacados o null si falla
 */
export async function getFeaturedServices() {
  if (!supabase) {
    console.warn('Cliente de Supabase no inicializado')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
    
    if (error) {
      console.error('Error al obtener servicios destacados:', error)
      return null
    }
    
    return data || []
  } catch (err) {
    console.error('Error de red al obtener servicios destacados:', err)
    return null
  }
}

/**
 * Obtener todos los servicios activos para página de servicios
 * @returns {Promise<Array>} Array de servicios o null si falla
 */
export async function getServices() {
  if (!supabase) {
    console.warn('Cliente de Supabase no inicializado')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
    
    if (error) {
      console.error('Error al obtener servicios:', error)
      return null
    }
    
    return data || []
  } catch (err) {
    console.error('Error de red al obtener servicios:', err)
    return null
  }
}

/**
 * Obtener un servicio específico por su slug
 * @param {string} slug - El slug del servicio
 * @returns {Promise<Object|null>} Objeto del servicio o null si falla
 */
export async function getServiceBySlug(slug) {
  if (!supabase) {
    console.warn('Cliente de Supabase no inicializado')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single() // Devuelve un objeto único, no array
    
    if (error) {
      console.error('Error al obtener servicio:', error)
      return null
    }
    
    return data
  } catch (err) {
    console.error('Error de red al obtener servicio:', err)
    return null
  }
}
