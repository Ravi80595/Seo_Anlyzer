import { Box,Flex,Text} from '@chakra-ui/react'
import React from 'react'


const Score = ({data}) => {


    const { isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots,backlinks,externalLinks,internalLinks,hasUnfriendlyLinks,hasFlash, hasIframes, hasFavicon, hasSmallFont  } = data;

    const trueCount = [isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots,backlinks,externalLinks,internalLinks,hasUnfriendlyLinks ].filter(value => value === true).length;

    const falseCount=[ hasFlash, hasIframes, hasFavicon, hasSmallFont ].filter(value=>value===false).length;




return (
    <Flex gap={'70px'} w={'90%'} m={'auto'}  mt={10} mb={10}>
    <Box w={'60%'} m ='auto'>
    <Text fontSize={'46px'} fontWeight={'700'} color={'blue.400'}>{trueCount+falseCount>=17?'PERFECT':trueCount+falseCount>=12?'NORMAL':'BAD'}</Text>
    </Box>
     <Box>
    <Text fontWeight={'600'} lineHeight={'36px'} color={"#505458"} fontSize={'24px'}>{trueCount+falseCount>=17?'Your website SEO is very perfect!':trueCount+falseCount>=12?'Your website SEO is normal!':'Your website SEO is very bad!'}</Text>
    <Text color={'#797979'} fontSize={'14px'}>
    {trueCount+falseCount>=17?'Congratulations, your SEO efforts are paying off with a strong and active online presence. Search engine visibility is crucial for enhancing customer engagement, building brand recognition, and driving organic traffic to your website. We recommend consistently optimizing your SEO strategies to further expand your online reach.':trueCount+falseCount>=12?'Your current SEO status indicates room for improvement. Enhancing your search engine visibility is essential for better customer engagement, increased brand recognition, and driving more organic traffic to your website. We strongly advise refining your SEO tactics to unlock greater online potential.':'Your current SEO performance suggests significant challenges. Addressing your search engine optimization is crucial to improve customer engagement, boost brand awareness, and attract organic traffic to your website. Its imperative to undertake substantial changes to your SEO approach in order to rectify this situation and achieve better results.'}</Text>
</Box>
</Flex>
  )
}


export default Score