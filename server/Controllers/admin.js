import axios from "axios";
import cheerio from "cheerio";


export const websiteSeo= async(req,res)=>{
    const websiteUrl = req.body.url;
    console.log(req.body.url,'req')
    try{

        const response = await axios.get(websiteUrl);
        const html = response.data;
        const $ = cheerio.load(html);
    
        const robotsResponse = await axios.get(`${websiteUrl}/robots.txt`);
        const robotsTxt = robotsResponse.data;
        const hasRobotsDisallowAll = /Disallow:\s*\//i.test(robotsTxt);

        const sitemapResponse = await axios.get(`${websiteUrl}/sitemap.xml`);
        const sitemapXml = sitemapResponse.data;
        const hasValidSitemap = sitemapXml.includes('<urlset');

    
        const title = $('title').text();
        const metaDescription = $('meta[name="description"]').attr('content');
        const h1Tags = $('h1');
        const h2Tags = $('h2');
        const h3Tags = $('h3');
        const h4Tags = $('h4');
        const h5Tags = $('h5');
        const h6Tags = $('h6');
        const images = $('img');
        const text = $('p');



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


        const isTitleInRange = title.length >= 60 && title.length <= 90;
        const isMetaDescriptionInRange = metaDescription.length >= 160 && metaDescription.length <= 300;

        const isSecure = response.request.connection.encrypted;


// ************************************ Google Console Checks here *************************************************


        const googleVerificationTags = [
            'google-site-verification', 
            'google-site-verification-bing',
          ];
      
          const verificationTagPresent = googleVerificationTags.some(tag => {
            return $('meta[name="' + tag + '"]').length > 0;
          });
        const hasGoogleAnalytics = $('head script[src*="google-analytics.com/analytics.js"]').length > 0;



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
            let socialMediaStatus = 'All social media links are present on the website.';
            if (missingPlatforms.length > 0) {
            socialMediaStatus = `${missingPlatforms.join(', ')} ${
                missingPlatforms.length > 1 ? 'are' : 'is'
            } not present on the website.`;
            }
                

// ***************************************** Broken Links Checks here *******************************************


            
    const allLinks = $('a[href]').map((index, element) => $(element).attr('href')).get();

    const brokenLinks = [];

    async function checkLink(link) {
      try {
        const linkResponse = await axios.get(link);
        if (linkResponse.status >= 400) {
          brokenLinks.push(link);
        }
      } catch (error) {
        brokenLinks.push(link);
      }
    }

    await Promise.all(allLinks.map(checkLink));




    const structuredData = [];
    
    // Extract script tags containing structured data
    $('script[type="application/ld+json"]').each((index, element) => {
      const scriptContent = $(element).html();
      try {
        const data = JSON.parse(scriptContent);
        structuredData.push(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });


    const canonicalUrls = new Set();

    // Extract canonical URLs from link elements
    $('link[rel="canonical"]').each((index, element) => {
      const canonicalUrl = $(element).attr('href');
      canonicalUrls.add(canonicalUrl);
    });





// ***************************************** Analysis Report Here *******************************************
    
        const seoAnalysis = {
          WebsiteUrl:websiteUrl,  
          title: title || 'No title tag',
          metaDescription: metaDescription || 'No meta description',
          h1TagCount: h1Tags.length,
          h2TagCount: h2Tags.length,
          h3TagCount: h3Tags.length,
          h4TagCount: h4Tags.length,
          h5TagCount: h5Tags.length,
          h6TagCount: h6Tags.length,
          imageCount: totalImages,
          imagewithoutAlt:imagesWithoutAlt,
          pTagCount:text.length,
          isTitleInRange: isTitleInRange?'Perfect':'Title charcters not have legth of 60 to 90 charcters',
          isMetaDescriptionInRange: isMetaDescriptionInRange?'Perfect':'Description charcters not have legth of 160 to 300 charcters',
          sercure:isSecure?'Website have SSL/HTTPS Certificate, SECURED':"Website is not secured",
          hasRobots:hasRobotsDisallowAll?'Website have robots.txt file':'Website dont have robots.txt file',
          hasSitemap:hasValidSitemap?'Sitemap found':"Website have no sitemap",
          googleAnalytics:hasGoogleAnalytics?"Google Anylatics Present":"Google Anylatics is not present in the website",
          hasCanonical:hasCanonicalLink?"website have Canonical Link":"Website dont have Canonical Link",
          googleConsole:verificationTagPresent?"Website have google serach console":'website dont have google serach console',
          textToHtmlRatio: textToHtmlRatio,
          visibleTextLength,
          totalHtmlLength,
          socialMediaStatus,
          missingPlatforms,
          subpages:subpages.length,
        //   allLinks,
          brokenLinks,
        //   structuredData: structuredData,
          hasStructuredData: structuredData.length > 0?"Website have structure data":'website dont have structured data',
        //   urlStructureIssues: urlStructureIssues,
        //   hasUrlStructureIssues: urlStructureIssues.length > 0,
          canonicalUrls: Array.from(canonicalUrls),
          hasCanonicalUrls: canonicalUrls.size > 0,
        };
        res.json(seoAnalysis);
    }catch(err){
        console.log(err)
    }
}


// /semrush