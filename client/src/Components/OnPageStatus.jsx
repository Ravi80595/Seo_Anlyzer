import React from 'react'
import { Box,Flex,Text} from '@chakra-ui/react'



const OnPageStatus = ({data}) => {
    const { isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots } = data;

    const trueCount = [isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots].filter(value => value === true).length;


return (
    <Flex gap={'70px'} w={'90%'} m={'auto'}  mt={10} mb={10}>
    <Box w={'60%'} m ='auto'>
    <Text fontSize={'46px'} fontWeight={'700'} color={'blue.400'}>{trueCount>=10?'PERFECT':trueCount>=5?'NORMAL':'BAD'}</Text>
    </Box>
    <Box>
    <Text fontWeight={'600'} lineHeight={'36px'} color={"#505458"} fontSize={'24px'}>{trueCount>=10?'Your OnPage is perfect!':trueCount>=5?'Your OnPage is normal!':'Your OnPage is bad!'}</Text>
    <Text color={'#797979'} fontSize={'14px'}>
    {trueCount>=10?'Your on-page SEO optimization is strong and effective. On-page optimization plays a vital role in enhancing user experience, improving search engine rankings, and driving targeted organic traffic to your website. We recommend maintaining and refining your current on-page SEO strategies to continue reaping these benefits and further enhance your online presence.':trueCount>=5?'Your on-page SEO performance is commendable. Your focus on on-page optimization is contributing to an improved user experience, higher search engine rankings, and the generation of valuable organic traffic to your website. To sustain and build upon this success, its advisable to consistently uphold your current on-page SEO practices.':'Your current on-page SEO situation requires attention. Substantial improvements are necessary to enhance user experience, elevate search engine rankings, and attract meaningful organic traffic to your website. Its imperative to implement significant changes to your on-page SEO approach in order to rectify these issues and achieve more favorable outcomes.'}
    </Text>
    </Box>
</Flex>
  )
}

export default OnPageStatus