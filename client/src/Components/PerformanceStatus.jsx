import React from 'react'
import { Box,Flex,Text} from '@chakra-ui/react'


const PerformanceStatus = ({data}) => {

    const { isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots,} = data;

    const trueCount = [isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots].filter(value => value === true).length;


    let count = 0;

    if (data.pageSize > 20) {
        count++;
    }

    if (data.isHttp2Used) {
        count++;
    }

    if (!data.inlineStyles) {
        count++;
    }

    if (data.isMinified) {
        count++;
    }

    console.log(count)

return (
    <Flex gap={'70px'} w={'90%'} m={'auto'}  mt={10} mb={10}>
    <Box w={'60%'} m ='auto'>
    <Text fontSize={'46px'} fontWeight={'700'} color={'blue.400'}>{count>=4?'PERFECT':count>=2?'NORMAL':'BAD'}</Text>
    </Box>
    <Box>
    <Text fontWeight={'600'} lineHeight={'36px'} color={"#505458"} fontSize={'24px'}>{count>=4?'Your page Performance is perfect!':count>=2?'Your page Performance is normal!':'Your page Performance is bad!'}</Text>
    <Text color={'#797979'} fontSize={'14px'}>
    {count>=4?'Your page performance is strong and effective. Performance optimization plays a vital role in enhancing user experience, improving search engine rankings, and driving targeted organic traffic to your website. We recommend maintaining and refining your current performance strategies to continue reaping these benefits and further enhance your online presence.':count>=2?'Your page  performance is commendable. Your focus on performance optimization is contributing to an improved user experience, higher search engine rankings, and the generation of valuable organic traffic to your website. To sustain and build upon this success, its advisable to consistently uphold your current performance practices.':'Your current performance situation requires attention. Substantial improvements are necessary to enhance user experience, elevate search engine rankings, and attract meaningful organic traffic to your website. Its imperative to implement significant changes to your page performance approach in order to rectify these issues and achieve more favorable outcomes.'}
    </Text>
    </Box>
</Flex>
  )
}

export default PerformanceStatus