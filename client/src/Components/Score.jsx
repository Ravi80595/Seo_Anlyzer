import { Box,Flex,Text,Image} from '@chakra-ui/react'
import React from 'react'
import '../CSS/Score.css'


const Score = ({data}) => {


    const { isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots,backlinks,externalLinks,internalLinks,hasUnfriendlyLinks,hasFlash, hasIframes, hasFavicon, hasSmallFont,socialMediaStatus,missingPlatforms} = data;

    const trueCount = [isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots,backlinks,externalLinks,internalLinks,hasUnfriendlyLinks ].filter(value => value === true).length;

    const falseCount=[ hasFlash, hasIframes, hasFavicon, hasSmallFont ].filter(value=>value===false).length;

    const onPageCount = [isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots].filter(value => value === true).length;

    const usabilityCount = [hasFlash, hasIframes, hasFavicon, hasSmallFont].filter(value => value === false).length;

    const linksCount = [backlinks,externalLinks,internalLinks,hasUnfriendlyLinks].filter(value => value === true).length;

return (
  <>
    <Flex gap={'70px'} w={'90%'} m={'auto'}  mt={10} mb={10}>
     <Box w={'50%'}> 
    <Box w={'60%'} m ='auto'>

    <Text fontSize={'46px'} fontWeight={'700'} color={'blue.400'}>{trueCount+falseCount>=17?'PERFECT':trueCount+falseCount>=12?'NORMAL':'BAD'}</Text>
    </Box>
     <Box>
    <Text fontWeight={'600'} lineHeight={'36px'} color={"#505458"} fontSize={'24px'}>{trueCount+falseCount>=17?'Your website SEO is very perfect!':trueCount+falseCount>=12?'Your website SEO is normal!':'Your website SEO is very bad!'}</Text>
    <Text color={'#797979'} fontSize={'14px'}>
    {trueCount+falseCount>=17?'Congratulations, your SEO efforts are paying off with a strong and active online presence. Search engine visibility is crucial for enhancing customer engagement, building brand recognition, and driving organic traffic to your website. We recommend consistently optimizing your SEO strategies to further expand your online reach.':trueCount+falseCount>=12?'Your current SEO status indicates room for improvement. Enhancing your search engine visibility is essential for better customer engagement, increased brand recognition, and driving more organic traffic to your website. We strongly advise refining your SEO tactics to unlock greater online potential.':'Your current SEO performance suggests significant challenges. Addressing your search engine optimization is crucial to improve customer engagement, boost brand awareness, and attract organic traffic to your website. Its imperative to undertake substantial changes to your SEO approach in order to rectify this situation and achieve better results.'}</Text>
</Box>
</Box>
<div className="tv-container">
<div className='tv-background'>
<img className="screenshot-overlay"  src={`data:image/png;base64,${data.screenshotBase64}`} alt="Home" />
</div>
</div>
</Flex>
  <Flex w={'80%'} m={'auto'} mt={20} mb={20} justifyContent={'space-around'}>
      <Box _hover={{ transform: 'translateY(-15px)', transition: 'transform 0.5s' }}>
        <Image w={100} 
        src={onPageCount>=10?'https://cdn1.iconfinder.com/data/icons/education-outline-24/64/1_18-512.png':onPageCount>=5?'https://cdn1.iconfinder.com/data/icons/education-outline-24/64/1_19-512.png':'https://cdn1.iconfinder.com/data/icons/education-outline-24/64/1_20-512.png'}
        />
        <Text fontWeight={'bold'} color={'blue.400'} textAlign={'center'}>On-Page SEO </Text>
      </Box>
      <Box _hover={{ transform: 'translateY(-15px)', transition: 'transform 0.5s' }}>
        <Image w={100} 
        src={usabilityCount>=4?'https://cdn1.iconfinder.com/data/icons/education-outline-24/64/1_18-512.png':usabilityCount>=2?'https://cdn1.iconfinder.com/data/icons/education-outline-24/64/1_19-512.png':'https://cdn1.iconfinder.com/data/icons/education-outline-24/64/1_20-512.png'}/>
        <Text fontWeight={'bold'} color={'blue.400'} textAlign={'center'}>Usability</Text>
      </Box>
      <Box _hover={{ transform: 'translateY(-15px)', transition: 'transform 0.5s' }}>
        <Image w={100} 
        src={linksCount>=4?'https://cdn1.iconfinder.com/data/icons/education-outline-24/64/1_18-512.png':linksCount>=2?'https://cdn1.iconfinder.com/data/icons/education-outline-24/64/1_19-512.png':'https://cdn1.iconfinder.com/data/icons/education-outline-24/64/1_20-512.png'}/>
        <Text fontWeight={'bold'} color={'blue.400'} textAlign={'center'}>Links</Text>
      </Box>
      <Box _hover={{ transform: 'translateY(-15px)', transition: 'transform 0.5s' }}>
        <Image w={100} 
        src={socialMediaStatus?'https://cdn1.iconfinder.com/data/icons/education-outline-24/64/1_18-512.png':missingPlatforms.length<=4 && missingPlatforms.length>=2?'https://cdn1.iconfinder.com/data/icons/education-outline-24/64/1_19-512.png':'https://cdn1.iconfinder.com/data/icons/education-outline-24/64/1_20-512.png'}/>
        <Text fontWeight={'bold'} color={'blue.400'} textAlign={'center'}>Social Results</Text>
      </Box>
  </Flex>
  </>
  )
}


export default Score

// w={'70%'} mt={'40px'} h={'65%'} ml={'65px'}