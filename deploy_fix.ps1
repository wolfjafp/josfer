$ErrorActionPreference = "Stop"
Write-Host "Iniciando reparación del repositorio..."

# 1. Eliminar configuración git anterior
if (Test-Path .git) {
    Write-Host "Eliminando historial git antiguo..."
    Remove-Item -Path .git -Recurse -Force
}

# 2. Iniciar nuevo repositorio
Write-Host "Iniciando nuevo repositorio..."
git init

# 3. Configurar rama y remoto
git branch -M main
git remote add origin https://github.com/wolfjafp/josfer.git

# 4. Agregar archivos
Write-Host "Agregando archivos..."
git add .

# 5. Commit
git commit -m "DEPLOY FINAL: Web Reparada"

# 6. Push forzado
Write-Host "Subiendo a GitHub (esto puede tardar unos segundos)..."
git push -f origin main

Write-Host "¡LISTO! Repositorio actualizado."
