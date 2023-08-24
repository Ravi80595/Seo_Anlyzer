import { Box } from '@chakra-ui/react'
import React from 'react'










const Score = ({data}) => {


    const { isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots,backlinks,externalLinks,internalLinks,hasUnfriendlyLinks } = data;

    const trueCount = [isTitleInRange,isMetaDescriptionInRange,language,h1Tag,imageAlt,hasCanonicalUrls,hasHreflangAttribute,hasNoindexTag,sercure,googleAnalytics,hasRobots,backlinks,externalLinks,internalLinks,hasUnfriendlyLinks ].filter(value => value === true).length;
console.log(data,'data')
console.log(trueCount)


// 12345



return (
    <Box>
        Score Goes here {trueCount}
    </Box>
  )
}


export default Score