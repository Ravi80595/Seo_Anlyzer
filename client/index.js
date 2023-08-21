const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to analyze SEO for a website
app.get('/analyze-seo', async (req, res) => {
  const websiteUrl = req.query.url;

  try {
    const response = await axios.get(websiteUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    // Analyze various SEO aspects
    const title = $('title').text();
    const metaDescription = $('meta[name="description"]').attr('content');
    const h1Tags = $('h1');
    const images = $('img');

    // You can add more analysis here based on the aspects mentioned earlier

    const seoAnalysis = {
      title: title || 'No title tag',
      metaDescription: metaDescription || 'No meta description',
      h1TagCount: h1Tags.length,
      imageCount: images.length,
      // Add more analysis results as needed
    };

    res.json(seoAnalysis);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Endpoint to check SSL/HTTPS
app.get('/check-ssl', async (req, res) => {
  const websiteUrl = req.query.url;

  try {
    const response = await axios.get(websiteUrl);
    const isSecure = response.request.connection.encrypted;

    const sslCheckResult = {
      secure: isSecure,
    };

    res.json(sslCheckResult);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Endpoint to check mobile-friendliness (simplified example)
app.get('/check-mobile-friendly', async (req, res) => {
  const websiteUrl = req.query.url;
  // Use a third-party API like Google's Mobile-Friendly Test API to perform this check
  // Example: https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest?url=${websiteUrl}

  try {
    const isMobileFriendly = true; // Replace with actual API response
    const mobileFriendlyResult = {
      mobileFriendly: isMobileFriendly,
    };

    res.json(mobileFriendlyResult);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Endpoint to check page speed (simplified example)
app.get('/check-page-speed', async (req, res) => {
  const websiteUrl = req.query.url;
  // Use a third-party API like Google's PageSpeed Insights API to perform this check
  // Example: https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${websiteUrl}

  try {
    const pageSpeedScore = 90; // Replace with actual API response
    const pageSpeedResult = {
      score: pageSpeedScore,
    };

    res.json(pageSpeedResult);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Add more endpoints for other SEO checks

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
