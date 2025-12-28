// Simple Node.js test for image upload functionality
const fs = require('fs');
const path = require('path');

async function testImageUpload() {
    console.log('🧪 Testing Recipe Image Upload API...\n');

    const API_BASE = 'http://localhost:3001/api/recipes';
    const AUTH_TOKEN = 'mock-token-tourist-123456789';

    try {
        // Test 1: Health check
        console.log('1️⃣ Testing backend health...');
        const healthResponse = await fetch('http://localhost:3001/api/health');
        const healthData = await healthResponse.json();
        console.log('✅ Backend health:', healthData);

        // Test 2: Create a test image file (1x1 pixel PNG)
        console.log('\n2️⃣ Creating test image...');
        const testImageBuffer = Buffer.from([
            0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
            0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
            0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 pixel
            0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
            0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, // IDAT chunk
            0x54, 0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0x00,
            0xFF, 0xFF, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01,
            0xE2, 0x21, 0xBC, 0x33, 0x00, 0x00, 0x00, 0x00, // IEND chunk
            0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
        ]);
        
        const testImagePath = path.join(__dirname, 'test-recipe-image.png');
        fs.writeFileSync(testImagePath, testImageBuffer);
        console.log('✅ Test image created:', testImagePath);

        // Test 3: Upload image using FormData
        console.log('\n3️⃣ Testing image upload...');
        
        // Create FormData equivalent for Node.js
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('recipeImage', fs.createReadStream(testImagePath), {
            filename: 'test-recipe-image.png',
            contentType: 'image/png'
        });

        const uploadResponse = await fetch(`${API_BASE}/upload-image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
                ...formData.getHeaders()
            },
            body: formData
        });

        const uploadResult = await uploadResponse.json();
        
        if (uploadResponse.ok) {
            console.log('✅ Image upload successful!');
            console.log('📄 Response:', JSON.stringify(uploadResult, null, 2));
            
            // Test 4: Verify uploaded image is accessible
            console.log('\n4️⃣ Testing image accessibility...');
            const imageUrl = `http://localhost:3001${uploadResult.data.imageUrl}`;
            const imageResponse = await fetch(imageUrl);
            
            if (imageResponse.ok) {
                console.log('✅ Uploaded image is accessible at:', imageUrl);
                console.log('📊 Image size:', imageResponse.headers.get('content-length'), 'bytes');
                console.log('📋 Content type:', imageResponse.headers.get('content-type'));
            } else {
                console.log('❌ Uploaded image is not accessible');
                console.log('📄 Response status:', imageResponse.status);
            }
        } else {
            console.log('❌ Image upload failed');
            console.log('📄 Error response:', JSON.stringify(uploadResult, null, 2));
        }

        // Test 5: Test recipe creation with uploaded image
        console.log('\n5️⃣ Testing recipe creation with image...');
        const recipeData = {
            title: 'Test Recipe with Image',
            description: 'A test recipe to verify image integration',
            ingredients: ['Test ingredient 1', 'Test ingredient 2'],
            instructions: ['Step 1: Test step', 'Step 2: Another test step'],
            prepTime: 15,
            cookTime: 30,
            servings: 4,
            difficulty: 'Easy',
            category: 'Bengali_Sweets',
            tags: ['test', 'image-upload'],
            image: uploadResult.success ? uploadResult.data.imageUrl : '',
            tips: ['Test tip'],
            story: 'This is a test recipe created to verify image upload functionality.',
            region: 'Test Region'
        };

        const createResponse = await fetch(`${API_BASE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AUTH_TOKEN}`,
            },
            body: JSON.stringify(recipeData)
        });

        const createResult = await createResponse.json();
        
        if (createResponse.ok) {
            console.log('✅ Recipe created successfully with image!');
            console.log('📄 Recipe ID:', createResult.data.id);
            console.log('🖼️ Recipe image URL:', createResult.data.image);
        } else {
            console.log('❌ Recipe creation failed');
            console.log('📄 Error:', JSON.stringify(createResult, null, 2));
        }

        // Cleanup
        console.log('\n🧹 Cleaning up test files...');
        if (fs.existsSync(testImagePath)) {
            fs.unlinkSync(testImagePath);
            console.log('✅ Test image file deleted');
        }

        console.log('\n🎉 Image upload test completed!');

    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
        console.error('📄 Stack trace:', error.stack);
    }
}

// Run the test
testImageUpload();