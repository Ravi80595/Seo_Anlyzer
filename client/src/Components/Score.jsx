import { Box,Flex,Text} from '@chakra-ui/react'
import React from 'react'


const Score = ({data}) => {


    const { isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots,backlinks,externalLinks,internalLinks,hasUnfriendlyLinks,hasFlash, hasIframes, hasFavicon, hasSmallFont  } = data;

    const trueCount = [isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots,backlinks,externalLinks,internalLinks,hasUnfriendlyLinks ].filter(value => value === true).length;

    const falseCount=[ hasFlash, hasIframes, hasFavicon, hasSmallFont ].filter(value=>value===false).length;


console.log(data,'data')
console.log(trueCount)
console.log(falseCount,'false')


// 12345



return (
        // Score Goes here {}

    <Flex gap={'70px'} w={'90%'} m={'auto'}  mt={10} mb={10}>
    <Box w={'60%'} m ='auto'>
    <Text fontSize={'46px'} fontWeight={'700'} color={'blue.400'}>{trueCount+falseCount>=17?'PERFECT':trueCount+falseCount>=12?'NORMAL':'BAD'}</Text>
    </Box>
     <Box>
    <Text fontWeight={'600'} lineHeight={'36px'} color={"#505458"} fontSize={'24px'}>{trueCount+falseCount>=4?'Your Usability is very perfect!':trueCount+falseCount>=2?'Your usability is very normal!':'Your usability is very bad!'}</Text>
    <Text color={'#797979'} fontSize={'14px'}>Congratulations, your social presence is strong and active. Social activity is important for customer communication, brand awareness and as a marketing channel to bring more visitors to your website. We recommend continued use of social campaigns to grow this further.</Text>
</Box>
</Flex>
  )
}


export default Score