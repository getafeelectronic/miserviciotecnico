# Script para configurar GitHub Secrets necesarios para el deploy
# Uso: .\setup-secrets.ps1
# Requiere: GitHub CLI (gh) instalado y autenticado

Write-Host "[CONFIG] Configuracion de GitHub Secrets para Deploy" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que gh esta instalado
if (!(Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] GitHub CLI (gh) no esta instalado" -ForegroundColor Red
    Write-Host "Instalar: https://cli.github.com/" -ForegroundColor Yellow
    exit 1
}

# Verificar autenticacion
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] No estas autenticado en GitHub CLI" -ForegroundColor Red
    Write-Host "Ejecuta: gh auth login" -ForegroundColor Yellow
    exit 1
}

Write-Host "[OK] GitHub CLI configurado correctamente" -ForegroundColor Green
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

Write-Host "[INFO] Configurando informacion del negocio..." -ForegroundColor Yellow
Write-Host ""

foreach ($key in $secrets.Keys) {
    $value = $secrets[$key]
    Write-Host "  Configurando: $key" -ForegroundColor Cyan
    
    # Pedir confirmacion o cambio
    $input = Read-Host "  Valor: $value (Enter para usar, o escribe nuevo valor)"
    if ($input) {
        $value = $input
    }
    
    # Configurar el secret
    $value | gh secret set $key
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  [OK] Configurado" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] Error al configurar" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host ""
Write-Host "[API] Configurando APIs (EmailJS y Google Maps)..." -ForegroundColor Yellow
Write-Host ""
Write-Host "[WARN] Deja vacio si no tienes las credenciales ahora" -ForegroundColor Yellow
Write-Host "       El sitio funcionara en modo demo sin ellas" -ForegroundColor Gray
Write-Host ""

foreach ($key in $apiSecrets.Keys) {
    $service = if ($key -like "*EMAILJS*") { "EmailJS" } else { "Google Maps" }
    Write-Host "  $service - $key" -ForegroundColor Cyan
    
    $value = Read-Host "  Valor (Enter para omitir)"
    
    if ($value) {
        $value | gh secret set $key
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  [OK] Configurado" -ForegroundColor Green
        } else {
            Write-Host "  [ERROR] Error al configurar" -ForegroundColor Red
        }
    } else {
        Write-Host "  [SKIP] Omitido (modo demo)" -ForegroundColor Gray
    }
    Write-Host ""
}

Write-Host ""
Write-Host "[DB] Configurando Supabase Database..." -ForegroundColor Yellow
Write-Host ""
Write-Host "[INFO] Para reviews dinamicas desde base de datos" -ForegroundColor Gray
Write-Host "        Si no configuras, se usaran reviews de fallback" -ForegroundColor Gray
Write-Host ""

$supabaseSecrets = @{
    "VITE_SUPABASE_URL" = ""
    "VITE_SUPABASE_ANON_KEY" = ""
}

foreach ($key in $supabaseSecrets.Keys) {
    Write-Host "  Supabase - $key" -ForegroundColor Cyan
    
    if ($key -eq "VITE_SUPABASE_URL") {
        Write-Host "    (Ejemplo: https://tuproyecto.supabase.co)" -ForegroundColor Gray
    } else {
        Write-Host "    (Clave publica 'anon' de Supabase Dashboard > Settings > API)" -ForegroundColor Gray
    }
    
    $value = Read-Host "  Valor (Enter para omitir)"
    
    if ($value) {
        $value | gh secret set $key
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  [OK] Configurado" -ForegroundColor Green
        } else {
            Write-Host "  [ERROR] Error al configurar" -ForegroundColor Red
        }
    } else {
        Write-Host "  [SKIP] Omitido (se usaran datos de fallback)" -ForegroundColor Gray
    }
    Write-Host ""
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "[OK] Configuracion de secrets completada" -ForegroundColor Green
Write-Host ""
Write-Host "[NEXT] Proximos pasos:" -ForegroundColor Yellow
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
