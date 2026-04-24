# Script para configurar GitHub Secrets necesarios para el deploy
# Uso: .\setup-secrets.ps1
# Requiere: GitHub CLI (gh) instalado y autenticado

Write-Host "🔐 Configuración de GitHub Secrets para Deploy" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

# Verificar que gh está instalado
if (!(Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Error: GitHub CLI (gh) no está instalado" -ForegroundColor Red
    Write-Host "Instalar: https://cli.github.com/" -ForegroundColor Yellow
    exit 1
}

# Verificar autenticación
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: No estás autenticado en GitHub CLI" -ForegroundColor Red
    Write-Host "Ejecuta: gh auth login" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ GitHub CLI configurado correctamente" -ForegroundColor Green
Write-Host ""

# Información del negocio (valores por defecto)
$secrets = @{
    "VITE_BUSINESS_EMAIL" = "ruizrjan@gmail.com"
    "VITE_BUSINESS_PHONE" = "+34 916 95 07 81"
    "VITE_BUSINESS_ADDRESS" = "C. Leoncio Rojas, 11, 28901 Getafe, Madrid"
    "VITE_BUSINESS_HOURS" = "Lun-Vie: 9:00 - 19:00"
    "VITE_BUSINESS_COORDINATES_LAT" = "40.302205"
    "VITE_BUSINESS_COORDINATES_LNG" = "-3.7329539"
}

# APIs (valores vacíos - usuario debe configurar)
$apiSecrets = @{
    "VITE_EMAILJS_SERVICE_ID" = ""
    "VITE_EMAILJS_TEMPLATE_ID" = ""
    "VITE_EMAILJS_PUBLIC_KEY" = ""
    "VITE_GOOGLE_MAPS_API_KEY" = ""
}

Write-Host "📋 Configurando información del negocio..." -ForegroundColor Yellow
Write-Host ""

foreach ($key in $secrets.Keys) {
    $value = $secrets[$key]
    Write-Host "  Configurando: $key" -ForegroundColor Cyan
    
    # Pedir confirmación o cambio
    $input = Read-Host "  Valor: $value (Enter para usar, o escribe nuevo valor)"
    if ($input) {
        $value = $input
    }
    
    # Configurar el secret
    $value | gh secret set $key
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Configurado" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Error al configurar" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host ""
Write-Host "🔑 Configurando APIs (EmailJS y Google Maps)..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Deja vacío si no tienes las credenciales ahora" -ForegroundColor Yellow
Write-Host "    El sitio funcionará en modo demo sin ellas" -ForegroundColor Gray
Write-Host ""

foreach ($key in $apiSecrets.Keys) {
    $service = if ($key -like "*EMAILJS*") { "EmailJS" } else { "Google Maps" }
    Write-Host "  $service - $key" -ForegroundColor Cyan
    
    $value = Read-Host "  Valor (Enter para omitir)"
    
    if ($value) {
        $value | gh secret set $key
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Configurado" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Error al configurar" -ForegroundColor Red
        }
    } else {
        Write-Host "  ⏭️  Omitido (modo demo)" -ForegroundColor Gray
    }
    Write-Host ""
}

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "✅ Configuración de secrets completada" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Yellow
Write-Host "  1. Verifica los secrets configurados en:" -ForegroundColor White
Write-Host "     https://github.com/getafeelectronic/miserviciotecnico/settings/secrets/actions" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Forzar un nuevo deploy:" -ForegroundColor White
Write-Host "     git commit --allow-empty -m ""ci: redeploy con secrets configurados""" -ForegroundColor Gray
Write-Host "     git push origin develop" -ForegroundColor Gray
Write-Host ""
Write-Host "  3. Verificar el deploy:" -ForegroundColor White
Write-Host "     gh run watch" -ForegroundColor Gray
Write-Host ""
Write-Host "  4. Ver sitio desplegado:" -ForegroundColor White
Write-Host "     https://getafeelectronic.github.io/miserviciotecnico/" -ForegroundColor Gray
Write-Host ""
