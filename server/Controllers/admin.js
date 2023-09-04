import axios from "axios";
import cheerio from "cheerio";
import puppeteer from 'puppeteer'




export const websiteSeo= async(req,res)=>{
    const websiteUrl = req.body.url;
    console.log(req.body.url,'req')
    try{
        const response = await axios.get(websiteUrl);
        const html = response.data;
        const $ = cheerio.load(html);


        let hasRobotsDisallowAll = false;

        try {
          const robotsResponse = await axios.get(`${websiteUrl}/robots.txt`);
          const robotsTxt = robotsResponse.data;
          hasRobotsDisallowAll = /Disallow:\s*\//i.test(robotsTxt);
      } catch (error) {
          console.error('Error fetching robots.txt:', error); 
      }
        // const robotsResponse = await axios.get(`${websiteUrl}/robots.txt`);
        // const robotsTxt = robotsResponse.data;
        // const hasRobotsDisallowAll = /Disallow:\s*\//i.test(robotsTxt);
      let hasValidSitemap=false
        try {
          const sitemapResponse = await axios.get(`${websiteUrl}/sitemap.xml`);
          const sitemapXml = sitemapResponse.data;
          const hasValidSitemap = sitemapXml.includes('<urlset');    
          } catch (error) {
          console.error('Error fetching robots.txt:', error); 
      }
        
    
        const title = $('title').text() || ''
        const metaDescription = $('meta[name="description"]').attr('content') || ''
        const h1Tags = $('h1');
        const h2Tags = $('h2');
        const h3Tags = $('h3');
        const h4Tags = $('h4');
        const h5Tags = $('h5');
        const h6Tags = $('h6');
        const images = $('img');
        const text = $('p');



        const hasHreflangAttribute = $('link[rel="alternate"][hreflang]').length > 0;

        const hasNoindexTag = $('meta[name="robots"][content*="noindex"]').length;

        const backlinks = $('a[href^="http"], a[href^="https"]').length>0
        const langAttribute = $('html').attr('lang');

        const internalLinks = $('a[href^="/"], a[href^="' + websiteUrl + '"]').length>0;
        const externalLinks = $('a[href^="http"], a[href^="https"]').not('[href^="' + websiteUrl + '"]').length>0;





// ************************************ Page Load Speed Analysis here *************************************************

        //  const startTime = Date.now();
            
        //  // Make a new axios request to measure page load time
        //  const pageLoadResponse = await axios.get(websiteUrl);
        //  const endTime = Date.now();
        //  const pageLoadTimeInMilliseconds  = endTime - startTime;
        //  const pageLoadTimeInSeconds = pageLoadTimeInMilliseconds / 1000;

// ************************************  Subpages Checks here *************************************************


        const subpages = [];

        $('a[href]').each((index, element) => {
          const href = $(element).attr('href');
          const absoluteUrl = new URL(href, websiteUrl).toString();
    
          if (absoluteUrl.startsWith(websiteUrl)) {
            subpages.push(absoluteUrl);
          }
        });


// ************************************  Image alt Checks here *************************************************


        let totalImages = 0;
        let imagesWithoutAlt = 0;

        $('img').each((index, element) => {
        totalImages++;

        const altAttribute = $(element).attr('alt');
        if (!altAttribute) {
            imagesWithoutAlt++;
        }
        });

// ************************************  Title and meta desc range Checks here *************************************************


        const isTitleInRange = title.length >= 60 && title.length <= 90 || false
        const isMetaDescriptionInRange = metaDescription.length >= 160 && metaDescription.length <= 300 || false

        const isSecure = response.request.connection.encrypted;


// ************************************ Google Console Checks here *************************************************


        const googleVerificationTags = [
            'google-site-verification', 
            'google-site-verification-bing',
          ];
      
          const verificationTagPresent = googleVerificationTags.some(tag => {
            return $('meta[name="' + tag + '"]').length > 0;
          });

      

        const hasGoogleAnalytics = $('head script[src*="google-analytics.com/analytics.js"]').length>0;

        const hasGoogleAnalyticsComment = $('head').html().includes('<!-- Google Analytics snippet added by Site Kit -->');

        const isGoogleAnalyticsPresent = hasGoogleAnalytics || hasGoogleAnalyticsComment;

 // ************************************  Canonical Links Checks here *************************************************


        const hasCanonicalLink = $('head link[rel="canonical"]').length > 0;


// ************************************  Text HTML Ratio Checks here *************************************************


        const visibleTextLength = text.text().replace(/\s+/g, ' ').trim().length;
        const totalHtmlLength = $('html').html().replace(/\s+/g, ' ').trim().length;
        const textToHtmlRatio = (visibleTextLength / totalHtmlLength).toFixed(2);


        
        
        
// ************************************  Social Media Links Checks here *************************************************
        
        
            const socialMediaLinks = {};
            const socialMediaPatterns = {
                facebook: /facebook\.com/i,
                twitter: /twitter\.com/i,
                instagram: /instagram\.com/i,
                linkedin: /linkedin\.com/i,
                // youtube: /youtube\.com/i,
                // pinterest: /pinterest\.com/i,
            };
      
            $('a[href]').each((index, element) => {
                const href = $(element).attr('href');
        
                for (const platform in socialMediaPatterns) {
                if (socialMediaPatterns[platform].test(href)) {
                    socialMediaLinks[platform] = href;
                    break;
                }
                }
            });
          
            const missingPlatforms = [];
            const socialMediaPlatformNames = {
            facebook: 'Facebook',
            twitter: 'Twitter',
            instagram: 'Instagram',
            linkedin: 'LinkedIn',
            };

            for (const platform in socialMediaPatterns) {
            if (!socialMediaLinks[platform]) {
                missingPlatforms.push(socialMediaPlatformNames[platform]);
            }
            }
            let socialMediaStatus = true;
            if (missingPlatforms.length > 0) {
            socialMediaStatus = `${missingPlatforms.join(', ')} ${
                missingPlatforms.length > 1 ? 'are' : 'is'
            } not present on the website.`;
            }
                

// ***************************************** Broken Links Checks here *******************************************


            
    // const allLinks = $('a[href]').map((index, element) => $(element).attr('href')).get();

    // const brokenLinks = [];

    // async function checkLink(link) {
    //   try {
    //     const linkResponse = await axios.get(link);
    //     if (linkResponse.status >= 400) {
    //       brokenLinks.push(link);
    //     }
    //   } catch (error) {
    //     brokenLinks.push(link);
    //   }
    // }

    // await Promise.all(allLinks.map(checkLink));


// ************************************  Structure Data Checks here *************************************************


    const structuredData = [];
    $('script[type="application/ld+json"]').each((index, element) => {
      const scriptContent = $(element).html();
      try {
        const data = JSON.parse(scriptContent);
        structuredData.push(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });

// ************************************  canonical Urls Checks here *************************************************


    const canonicalUrls = new Set();
    $('link[rel="canonical"]').each((index, element) => {
      const canonicalUrl = $(element).attr('href');
      canonicalUrls.add(canonicalUrl);
    });


    const uniqueTextContent = new Set();
    const duplicateTextContent = [];
  
    // Check duplicate content within text paragraphs
    text.each((index, element) => {
      const paragraphText = $(element).text().trim();
  
      if (uniqueTextContent.has(paragraphText)) {
        duplicateTextContent.push(paragraphText);
      } else {
        uniqueTextContent.add(paragraphText);
      }
    });


    const unfriendlyLinks = [];

    $('a[href]').each((index, element) => {
        const href = $(element).attr('href');
        if (href && containsUnfriendlyParameters(href)) {
            unfriendlyLinks.push(href);
        }
    });

    const hasUnfriendlyLinks = unfriendlyLinks.length > 0;


    const hasFlash = $('object[type^="application/x-shockwave-flash"]').length > 0 ||
    $('embed[type^="application/x-shockwave-flash"]').length > 0;

        const iframesUsed = $('iframe').length;
        const hasIframes = iframesUsed > 0;

        const hasFavicon = $('link[rel="icon"], link[rel="shortcut icon"]').length > 0;

        const smallFontElements = [];
        const legibleFontSize = 16; // Adjust as needed

        $('p, span, div, a, h1, h2, h3, h4, h5, h6').each((index, element) => {
            const fontSize = parseInt($(element).css('font-size'), 10);
            if (fontSize && fontSize < legibleFontSize) {
                smallFontElements.push(element.tagName);
            }
        });

        const hasSmallFont = smallFontElements.length > 0;


// ************************************** Performance logic here **********************************************




      // const browser = await puppeteer.launch();
    //   const browser = await puppeteer.launch({ headless: "new" });

    // const page = await browser.newPage();
    // await page.goto(websiteUrl, { waitUntil: 'networkidle2' });

    // const screenshotData = await page.screenshot();
    // const screenshotBase64 = screenshotData.toString('base64');

    // let screenshotBase64 = null; // Initialize screenshotBase64

    // try {
      // const browser = await puppeteer.launch({ headless: "new" });
      // const page = await browser.newPage();
      // await page.goto(websiteUrl, { waitUntil: 'networkidle2'});
      // const screenshotData = await page.screenshot();
      // const screenshotBase64 = screenshotData.toString('base64'); 
      // console.log('Screenshot taken successfully.');
      // await browser.close();
    // } catch (error) {
      // console.error('Navigation error:', error);
    // }



    const isHttp2Used = await checkHttp2Usage(websiteUrl);
    const pageSize = await checkPageSize(websiteUrl);
    const inlineStyles = checkInlineStyles($);
    const isMinified = checkMinification(html);
    const screenshotBase64 = await captureWebsiteScreenshot(websiteUrl);

// ***************************************** Analysis Report Here *******************************************
    
    const seoAnalysis = {
          WebsiteUrl:websiteUrl,  
          title: title || 'No title tag',
          metaDescription: metaDescription || 'No meta description',
          h1Tag:h1Tags.length>0?true:false,
          h1TagCount: h1Tags.length,
          h2TagCount: h2Tags.length,
          h3TagCount: h3Tags.length,
          h4TagCount: h4Tags.length,
          h5TagCount: h5Tags.length,
          h6TagCount: h6Tags.length,
          imageCount: totalImages,
          imageAlt:imagesWithoutAlt>0?false:true,
          imagewithoutAlt:imagesWithoutAlt,
          pTagCount:text.length || 0,
          isTitleInRange: isTitleInRange,
          isMetaDescriptionInRange: isMetaDescriptionInRange,
          sercure:isSecure,
          hasRobots:hasRobotsDisallowAll,
          hasSitemap:hasValidSitemap?'Sitemap found':"Website have no sitemap",
          googleAnalytics:isGoogleAnalyticsPresent,
          hasCanonical:hasCanonicalLink?"website have Canonical Link":"Website dont have Canonical Link",
          googleConsole:verificationTagPresent?"Website have google serach console":'website dont have google serach console',
          textToHtmlRatio: textToHtmlRatio,
          visibleTextLength,
          totalHtmlLength,
          socialMediaStatus:socialMediaStatus,
          missingPlatforms,
          subpages:subpages.length,
          // brokenLinks,
          hasStructuredData: structuredData,
          canonicalUrls: Array.from(canonicalUrls),
          hasCanonicalUrls: canonicalUrls.size > 0?false:true,
          duplicateTextContent: duplicateTextContent,
          // pageLoadTime: pageLoadTimeInSeconds,
          langAttribute:langAttribute?'Your page is using the lang attribute':'Your page is not using the lang attribute.',
          hasHreflangAttribute:hasHreflangAttribute,
          hasNoindexTag:hasNoindexTag>0?false:true,
          backlinks:backlinks,
          internalLinks:internalLinks,
          externalLinks:externalLinks,
          hasUnfriendlyLinks:hasUnfriendlyLinks?false:true,
          hasFlash:hasFlash,
          hasIframes:hasIframes,
          hasFavicon:hasFavicon?false:true,
          hasSmallFont:hasSmallFont,
          language:true,
          // screenshotBase64:screenshotBase64
          isHttp2Used: isHttp2Used,
          pageSize: pageSize,
          inlineStyles: inlineStyles,
          isMinified: isMinified,
          screenshotBase64: screenshotBase64,
        };
        res.json(seoAnalysis);
    }catch(err){
        console.log(err)
    }
}

async function captureWebsiteScreenshot(websiteUrl) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(websiteUrl, { waitUntil: 'networkidle2' });

    // Capture a screenshot
    const screenshotData = await page.screenshot();
    const screenshotBase64 = screenshotData.toString('base64');

    await browser.close();

    return screenshotBase64;
  } catch (error) {
    console.error('Error capturing website screenshot:', error);
    return null;
  }
}


function containsUnfriendlyParameters(url) {
  return url.length > 100 || /[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(url);
}

async function checkHttp2Usage(url) {
  try {
    const response = await axios.get(url, {
      validateStatus: function (status) {
        return status >= 200 && status < 300; // Accept only successful responses
      },
    });

    const protocol = response.headers[':version'];

    return protocol === 'HTTP/2';
  } catch (error) {
    console.error('Error checking HTTP/2 usage:', error);
    return false;
  }
}


async function checkPageSize(url) {
  try {
      const response = await fetch(url);
      const contentLengthHeader = response.headers.get('content-length');
      if (contentLengthHeader) {
          const contentLength = parseInt(contentLengthHeader, 10);
          return contentLength / 1024; // Convert to KB
      } else {
          console.error('Content-Length header not found in response.');
          return null;
      }
  } catch (error) {
      console.error('Error checking page size:', error);
      return null;
  }
}



function checkInlineStyles($) {
  const hasInlineStyles = $('[style]').length > 0;
  return hasInlineStyles;
}

function checkMinification(html) {
  // Remove spaces, tabs, and line breaks from the HTML
  const minifiedHtml = html.replace(/\s+/g, '');

  // Compare the lengths of original and minified HTML
  const originalLength = html.length;
  const minifiedLength = minifiedHtml.length;

  // If minified HTML is significantly shorter than original, consider it minified
  const minificationThreshold = 0.7; // You can adjust this threshold as needed
  const minificationRatio = minifiedLength / originalLength;

  return minificationRatio <= minificationThreshold;
}

// https://fierce-clam-necklace.cyclic.cloud