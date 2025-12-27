# Multi-AI Chat - Quick Setup Script
# This script helps you set up your environment quickly

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Multi-AI Chat - Quick Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (Test-Path ".env") {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
    $overwrite = Read-Host "Do you want to overwrite it? (y/N)"
    if ($overwrite -ne "y" -and $overwrite -ne "Y") {
        Write-Host "Keeping existing .env file" -ForegroundColor Yellow
        exit
    }
}

# Copy .env.example to .env
Write-Host ""
Write-Host "Creating .env file..." -ForegroundColor Yellow
Copy-Item ".env.example" ".env"
Write-Host "✓ .env file created" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  API Keys Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "You can add your API keys now, or skip and add them later." -ForegroundColor Yellow
Write-Host "Press Enter to skip any key you don't have yet." -ForegroundColor Yellow
Write-Host ""

# Function to update .env file
function Update-EnvFile {
    param($key, $value)
    if ($value -and $value.Trim() -ne "") {
        $content = Get-Content ".env"
        $content = $content -replace "^$key=.*", "$key=$value"
        $content | Set-Content ".env"
    }
}

# OpenAI
Write-Host "1. OpenAI (GPT-4, GPT-3.5)" -ForegroundColor Cyan
Write-Host "   Get key from: https://platform.openai.com/api-keys" -ForegroundColor Gray
$openaiKey = Read-Host "   Enter OpenAI API Key (or press Enter to skip)"
if ($openaiKey) {
    Update-EnvFile "VITE_OPENAI_API_KEY" $openaiKey
    Write-Host "   ✓ OpenAI key added" -ForegroundColor Green
}
Write-Host ""

# Anthropic
Write-Host "2. Anthropic (Claude)" -ForegroundColor Cyan
Write-Host "   Get key from: https://console.anthropic.com/settings/keys" -ForegroundColor Gray
$anthropicKey = Read-Host "   Enter Anthropic API Key (or press Enter to skip)"
if ($anthropicKey) {
    Update-EnvFile "VITE_ANTHROPIC_API_KEY" $anthropicKey
    Write-Host "   ✓ Anthropic key added" -ForegroundColor Green
}
Write-Host ""

# Google
Write-Host "3. Google (Gemini) - FREE TIER AVAILABLE!" -ForegroundColor Cyan
Write-Host "   Get key from: https://aistudio.google.com/app/apikey" -ForegroundColor Gray
$googleKey = Read-Host "   Enter Google API Key (or press Enter to skip)"
if ($googleKey) {
    Update-EnvFile "VITE_GOOGLE_API_KEY" $googleKey
    Write-Host "   ✓ Google key added" -ForegroundColor Green
}
Write-Host ""

# Local LLM
Write-Host "4. Local LLM (Ollama) - 100% FREE!" -ForegroundColor Cyan
Write-Host "   Download from: https://ollama.ai/" -ForegroundColor Gray
$useLocal = Read-Host "   Do you want to use Local LLM? (y/N)"
if ($useLocal -eq "y" -or $useLocal -eq "Y") {
    Write-Host "   To set up Ollama:" -ForegroundColor Yellow
    Write-Host "   1. Download from https://ollama.ai/" -ForegroundColor Yellow
    Write-Host "   2. Install Ollama" -ForegroundColor Yellow
    Write-Host "   3. Run: ollama pull llama2" -ForegroundColor Yellow
    Write-Host "   ✓ Local LLM configured (default URL)" -ForegroundColor Green
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if any keys were added
$envContent = Get-Content ".env" -Raw
$hasKeys = $false

if ($envContent -match "VITE_OPENAI_API_KEY=(?!your_)") { $hasKeys = $true }
if ($envContent -match "VITE_ANTHROPIC_API_KEY=(?!your_)") { $hasKeys = $true }
if ($envContent -match "VITE_GOOGLE_API_KEY=(?!your_)") { $hasKeys = $true }

if ($hasKeys) {
    Write-Host "✓ API keys configured successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run: npm run dev" -ForegroundColor White
    Write-Host "2. Open: http://localhost:5173" -ForegroundColor White
    Write-Host "3. Start chatting with AI models!" -ForegroundColor White
} else {
    Write-Host "⚠ No API keys were added" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "You can add them later by editing the .env file" -ForegroundColor Yellow
    Write-Host "See API_KEYS_GUIDE.md for detailed instructions" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "For detailed setup instructions, see:" -ForegroundColor Cyan
Write-Host "- README.md (Quick start)" -ForegroundColor White
Write-Host "- API_KEYS_GUIDE.md (Detailed API setup)" -ForegroundColor White
Write-Host ""

# Ask if user wants to start the dev server
$startServer = Read-Host "Do you want to start the development server now? (y/N)"
if ($startServer -eq "y" -or $startServer -eq "Y") {
    Write-Host ""
    Write-Host "Starting development server..." -ForegroundColor Green
    npm run dev
}
