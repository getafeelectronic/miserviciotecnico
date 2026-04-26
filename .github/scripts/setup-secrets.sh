#!/bin/bash
# Script para configurar GitHub Secrets necesarios para el deploy
# Uso: ./setup-secrets.sh
# Requiere: GitHub CLI (gh) instalado y autenticado

set -e

echo -e "\033[36m🔐 Configuración de GitHub Secrets para Deploy\033[0m"
echo "============================================================"
echo ""

# Verificar que gh está instalado
if ! command -v gh &> /dev/null; then
    echo -e "\033[31m❌ Error: GitHub CLI (gh) no está instalado\033[0m"
    echo -e "\033[33mInstalar: https://cli.github.com/\033[0m"
    exit 1
fi

# Verificar autenticación
if ! gh auth status &> /dev/null; then
    echo -e "\033[31m❌ Error: No estás autenticado en GitHub CLI\033[0m"
    echo -e "\033[33mEjecuta: gh auth login\033[0m"
    exit 1
fi

echo -e "\033[32m✅ GitHub CLI configurado correctamente\033[0m"
echo ""

# Información del negocio (valores por defecto)
declare -A secrets=(
    ["VITE_BUSINESS_EMAIL"]="ruizrjan@gmail.com"
    ["VITE_BUSINESS_PHONE"]="+34 916 95 07 81"
    ["VITE_BUSINESS_ADDRESS"]="C. Leoncio Rojas, 11, 28901 Getafe, Madrid"
    ["VITE_BUSINESS_HOURS"]="Lun-Vie: 9:00 - 19:00"
    ["VITE_BUSINESS_COORDINATES_LAT"]="40.302205"
    ["VITE_BUSINESS_COORDINATES_LNG"]="-3.7329539"
)

# APIs (valores vacíos - usuario debe configurar)
declare -A apiSecrets=(
    ["VITE_EMAILJS_SERVICE_ID"]=""
    ["VITE_EMAILJS_TEMPLATE_ID"]=""
    ["VITE_EMAILJS_PUBLIC_KEY"]=""
    ["VITE_GOOGLE_MAPS_API_KEY"]=""
)

echo -e "\033[33m📋 Configurando información del negocio...\033[0m"
echo ""

for key in "${!secrets[@]}"; do
    value="${secrets[$key]}"
    echo -e "\033[36m  Configurando: $key\033[0m"
    
    # Pedir confirmación o cambio
    read -p "  Valor: $value (Enter para usar, o escribe nuevo valor): " input
    if [ ! -z "$input" ]; then
        value="$input"
    fi
    
    # Configurar el secret
    echo "$value" | gh secret set "$key"
    
    if [ $? -eq 0 ]; then
        echo -e "\033[32m  ✅ Configurado\033[0m"
    else
        echo -e "\033[31m  ❌ Error al configurar\033[0m"
    fi
    echo ""
done

echo ""
echo -e "\033[33m🔑 Configurando APIs (EmailJS y Google Maps)...\033[0m"
echo ""
echo -e "\033[33m⚠️  Deja vacío si no tienes las credenciales ahora\033[0m"
echo -e "\033[90m    El sitio funcionará en modo demo sin ellas\033[0m"
echo ""

for key in "${!apiSecrets[@]}"; do
    if [[ "$key" == *"EMAILJS"* ]]; then
        service="EmailJS"
    else
        service="Google Maps"
    fi
    
    echo -e "\033[36m  $service - $key\033[0m"
    read -p "  Valor (Enter para omitir): " value
    
    if [ ! -z "$value" ]; then
        echo "$value" | gh secret set "$key"
        
        if [ $? -eq 0 ]; then
            echo -e "\033[32m  ✅ Configurado\033[0m"
        else
            echo -e "\033[31m  ❌ Error al configurar\033[0m"
        fi
    else
        echo -e "\033[90m  ⏭️  Omitido (modo demo)\033[0m"
    fi
    echo ""
done

echo ""
echo "============================================================"
echo -e "\033[32m✅ Configuración de secrets completada\033[0m"
echo ""
echo -e "\033[33m📝 Próximos pasos:\033[0m"
echo -e "\033[37m  1. Verifica los secrets configurados en:\033[0m"
echo -e "\033[90m     https://github.com/getafeelectronic/miserviciotecnico/settings/secrets/actions\033[0m"
echo ""
echo -e "\033[37m  2. Forzar un nuevo deploy:\033[0m"
echo -e "\033[90m     git commit --allow-empty -m \"ci: redeploy con secrets configurados\"\033[0m"
echo -e "\033[90m     git push origin develop\033[0m"
echo ""
echo -e "\033[37m  3. Verificar el deploy:\033[0m"
echo -e "\033[90m     gh run watch\033[0m"
echo ""
echo -e "\033[37m  4. Ver sitio desplegado:\033[0m"
echo -e "\033[90m     https://getafeelectronic.github.io/miserviciotecnico/\033[0m"
echo ""
