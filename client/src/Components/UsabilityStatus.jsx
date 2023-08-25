import { Flex,Box,Text} from '@chakra-ui/react';
import React from 'react';

const UsabilityStatus = ({ data }) => {
    const { hasFlash, hasIframes, hasFavicon, hasSmallFont } = data;

    const trueCount = [hasFlash, hasIframes, hasFavicon, hasSmallFont].filter(value => value === false).length;


return (
        <Flex gap={'70px'} w={'90%'} m={'auto'}  mt={10} mb={10}>
            <Box w={'60%'} m ='auto'>
            <Text fontSize={'46px'} fontWeight={'700'} color={'blue.400'}>{trueCount>=4?'PERFECT':trueCount>=2?'NORMAL':'BAD'}</Text>
            </Box>
             <Box>
            <Text fontWeight={'600'} lineHeight={'36px'} color={"#505458"} fontSize={'24px'}>{trueCount>=4?'Your Usability is  perfect!':trueCount>=2?'Your usability is normal!':'Your usability is bad!'}</Text>
            <Text color={'#797979'} fontSize={'14px'}>
            {trueCount>=4?'Usability excellence defines your website. Its intuitive navigation, responsive design, and smooth interactions collectively create an exceptional user experience. This commitment to perfection drives prolonged user engagement, encourages return visits, and garners positive user sentiments. By prioritizing usability, you have established a digital space that effortlessly serves its audience, fostering satisfaction and loyalty.':trueCount>=2?'Your website demonstrates a satisfactory level of usability. Navigational elements and interactions are generally effective, providing users with a reasonable browsing experience. To enhance this, consider refining navigation and optimizing user flows for smoother interactions. By focusing on improving usability, you can ensure a more seamless experience for your visitors.':'Usability on your website seems to be lacking. Navigational challenges and unclear interactions could be discouraging for users. Enhancing usability is crucial – restructuring navigation, simplifying processes, and making content more accessible can lead to better user experiences. Addressing these concerns is essential to improve user satisfaction and overall website performance.'}</Text>
        </Box>
    </Flex>
    );
};

export default UsabilityStatus;
