import { Box,Flex,Text} from '@chakra-ui/react'
import React from 'react'




const LinksStatus = ({data}) => {
    const { backlinks,externalLinks,internalLinks,hasUnfriendlyLinks } = data;

    const trueCount = [backlinks,externalLinks,internalLinks,hasUnfriendlyLinks].filter(value => value === true).length;

return(
    <Flex gap={'70px'} w={'90%'} m={'auto'}  mt={10} mb={10}>
            <Box w={'60%'} m ='auto'>
            <Text fontSize={'46px'} fontWeight={'700'} color={'blue.400'}>{trueCount>=4?'PERFECT':trueCount>=2?'GOOD':'BAD'}</Text>
            </Box>
            <Box>
            <Text fontWeight={'600'} lineHeight={'36px'} color={"#505458"} fontSize={'24px'}>{trueCount>=4?'Your Links is perfect!':trueCount>=2?'Your links is normal!':'Your links is bad!'}</Text>
            <Text color={'#797979'} fontSize={'14px'}>
            {trueCount>=4?'Your website boasts a meticulous and strategic approach to linking. By curating and maintaining perfect links, youre enhancing user experience, bolstering SEO, and ensuring seamless navigation. Your commitment to precision in linking is driving positive results across the board. Keep up the excellent work to continue reaping these benefits.':trueCount>=2?'Your website linking strategy is in line with common practices. Links are integral for navigation and SEO. While your approach is standard, consider optimizing link placement and relevance to further enhance user experience and search engine visibility.':'Your website linking strategy appears to have shortcomings. Inadequate link placement and relevance can hinder user navigation and SEO effectiveness. Its important to address these issues promptly, reevaluating and restructuring your links for an improved user experience and enhanced search engine ranking potential.'}

              

              
              Congratulations, your social presence is strong and active. Social activity is important for customer communication, brand awareness and as a marketing channel to bring more visitors to your website. We recommend continued use of social campaigns to grow this further.</Text>
            </Box>
    </Flex>
  )
}

export default LinksStatus