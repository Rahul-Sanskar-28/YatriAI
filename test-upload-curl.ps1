# PowerShell script to test image upload using curl
$API_BASE = "http://localhost:3001/api/recipes"
$AUTH_TOKEN = "mock-token-tourist-123456789"

Write-Host "🧪 Testing Recipe Image Upload with PowerShell..." -ForegroundColor Cyan

# Test 1: Health check
Write-Host "`n1️⃣ Testing backend health..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-WebRequest -Uri "http://localhost:3001/api/health" -Method GET -UseBasicParsing
    $healthData = $healthResponse.Content | ConvertFrom-Json
    Write-Host "✅ Backend health: $($healthData.status) at $($healthData.timestamp)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend health check failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 2: Create a simple test image (Base64 encoded 1x1 PNG)
Write-Host "`n2️⃣ Creating test image..." -ForegroundColor Yellow
$base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
$imageBytes = [System.Convert]::FromBase64String($base64Image)
$testImagePath = Join-Path $PWD "test-recipe-image.png"
[System.IO.File]::WriteAllBytes($testImagePath, $imageBytes)
Write-Host "✅ Test image created: $testImagePath" -ForegroundColor Green

# Test 3: Upload image using Invoke-RestMethod
Write-Host "`n3️⃣ Testing image upload..." -ForegroundColor Yellow
try {
    $headers = @{
        "Authorization" = "Bearer $AUTH_TOKEN"
    }
    
    $form = @{
        recipeImage = Get-Item $testImagePath
    }
    
    $uploadResponse = Invoke-RestMethod -Uri "$API_BASE/upload-image" -Method Post -Headers $headers -Form $form
    
    Write-Host "✅ Image upload successful!" -ForegroundColor Green
    Write-Host "📄 Response: $($uploadResponse | ConvertTo-Json -Depth 3)" -ForegroundColor Cyan
    
    # Test 4: Verify uploaded image is accessible
    Write-Host "`n4️⃣ Testing image accessibility..." -ForegroundColor Yellow
    $imageUrl = "http://localhost:3001$($uploadResponse.data.imageUrl)"
    try {
        $imageResponse = Invoke-WebRequest -Uri $imageUrl -Method GET -UseBasicParsing
        Write-Host "✅ Uploaded image is accessible at: $imageUrl" -ForegroundColor Green
        Write-Host "📊 Image size: $($imageResponse.Headers.'Content-Length') bytes" -ForegroundColor Cyan
        Write-Host "📋 Content type: $($imageResponse.Headers.'Content-Type')" -ForegroundColor Cyan
    } catch {
        Write-Host "❌ Uploaded image is not accessible: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Test 5: Test recipe creation with uploaded image
    Write-Host "`n5️⃣ Testing recipe creation with image..." -ForegroundColor Yellow
    $recipeData = @{
        title = "Test Recipe with Image"
        description = "A test recipe to verify image integration"
        ingredients = @("Test ingredient 1", "Test ingredient 2")
        instructions = @("Step 1: Test step", "Step 2: Another test step")
        prepTime = 15
        cookTime = 30
        servings = 4
        difficulty = "Easy"
        category = "Bengali_Sweets"
        tags = @("test", "image-upload")
        image = $uploadResponse.data.imageUrl
        tips = @("Test tip")
        story = "This is a test recipe created to verify image upload functionality."
        region = "Test Region"
    } | ConvertTo-Json -Depth 3
    
    $createHeaders = @{
        "Authorization" = "Bearer $AUTH_TOKEN"
        "Content-Type" = "application/json"
    }
    
    $createResponse = Invoke-RestMethod -Uri $API_BASE -Method Post -Headers $createHeaders -Body $recipeData
    
    Write-Host "✅ Recipe created successfully with image!" -ForegroundColor Green
    Write-Host "📄 Recipe ID: $($createResponse.data.id)" -ForegroundColor Cyan
    Write-Host "🖼️ Recipe image URL: $($createResponse.data.image)" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Image upload failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $errorStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorStream)
        $errorContent = $reader.ReadToEnd()
        Write-Host "📄 Error details: $errorContent" -ForegroundColor Red
    }
}

# Cleanup
Write-Host "`n🧹 Cleaning up test files..." -ForegroundColor Yellow
if (Test-Path $testImagePath) {
    Remove-Item $testImagePath -Force
    Write-Host "✅ Test image file deleted" -ForegroundColor Green
}

Write-Host "`n🎉 Image upload test completed!" -ForegroundColor Cyan