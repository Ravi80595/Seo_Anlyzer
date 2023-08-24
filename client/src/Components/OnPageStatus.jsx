import React from 'react'
import { Box,Flex,Text} from '@chakra-ui/react'



const OnPageStatus = ({data}) => {
    const { isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots } = data;

    const trueCount = [isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots].filter(value => value === true).length;


return (
    <Flex gap={'70px'} w={'90%'} m={'auto'}  mt={10} mb={10}>
    <Box w={'60%'} m ='auto'>
    <Text fontSize={'46px'} fontWeight={'700'} color={'blue.400'}>{trueCount>=10?'PERFECT':trueCount>=5?'GOOD':'BAD'}</Text>
    </Box>
    <Box>
    <Text fontWeight={'600'} lineHeight={'36px'} color={"#505458"} fontSize={'24px'}>{trueCount>=10?'Your Usability is very perfect!':trueCount>=6?'Your usability is very normal!':'Your usability is very bad!'}</Text>
    <Text color={'#797979'} fontSize={'14px'}>Congratulations, your social presence is strong and active. Social activity is important for customer communication, brand awareness and as a marketing channel to bring more visitors to your website. We recommend continued use of social campaigns to grow this further.</Text>
    </Box>
</Flex>
  )
}

export default OnPageStatus