const generateImage = async (prompt) => {
    const apiKey = "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"; // Replace with your API key
    const endpoint = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large";
  
    const headers = {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };
  
    const body = JSON.stringify({
        inputs: prompt,
        options: { width: 1024, height: 576 }, // Specify a landscape resolution
      });
      
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
  
      // Update the image in your HTML
      const outputImage = document.getElementById("generated-image");
      outputImage.src = imageUrl;
      outputImage.style.display = "block";
    } catch (error) {
      console.error(error);
      alert("Failed to generate image. Please check your API key or try again.");
    }
  };
  
  // Event listener for form submission
  document.getElementById("text-to-image-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const prompt = document.getElementById("text-input").value.trim();
    if (prompt) {
      generateImage(prompt);
    } else {
      alert("Please enter a description.");
    }
  });
  