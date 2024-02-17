import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const About = () => {


    
return (
    <Box>
      <Flex w={'80%'} m={'auto'} mt={'60px'} gap={'80px'}> 
        <Flex w={'40%'} m={'auto'}>
            <Image src='https://www.seoptimer.com/frontend-new/images/pages/pdf_reports_en.png'/>        
        </Flex>
        <Box w={'48%'}>
            <Text fontSize={'42px'} fontWeight={'700'} p={'28px 0 24px'} fontFamily={'gordita'}>Beautiful, Branded, White Label PDF Reports</Text>
            <Text fontSize={'20px'} lineHeight={'1.85rem'} fontFamily={'sans-serif'}>Search Engines rely on many factors to rank a website. SEOptimer is a Website SEO Checker which reviews these and more to help identify problems that could be holding your site back from it’s potential.</Text> <br />
            <Text fontSize={'20px'} lineHeight={'1.85rem'} fontFamily={'sans-serif'}>Additionally we provide a clear, actionable, prioritised list of recommendations to help improve.</Text>
        </Box>
      </Flex>


      <Flex w={'80%'} m={'auto'} mt={'90px'}>
        <Box w={'48%'}>
            <Text fontSize={'42px'} fontWeight={'700'} p={'28px 0 24px'} fontFamily={'gordita'}>Comprehensive Website Audit</Text>
            <Text fontSize={'20px'} lineHeight={'1.85rem'} fontFamily={'sans-serif'}>Search Engines rely on many factors to rank a website. SEOptimer is a Website SEO Checker which reviews these and more to help identify problems that could be holding your site back from it’s potential.</Text> <br />
            <Text fontSize={'20px'} lineHeight={'1.85rem'} fontFamily={'sans-serif'}>Additionally we provide a clear, actionable, prioritised list of recommendations to help improve.</Text>
        </Box>
        <Flex w={'40%'} m={'auto'}>
            <Image src='https://www.seoptimer.com/frontend-new/images/pages/comprehensive_website_audit_en.png'/>        
        </Flex>
      </Flex>


      <Box background={'#f3e9ff'} pt={'70px'} mt={'50px'} pb={'40px'} >
        <Box w={'70%'} textAlign={'center'} m={'auto'} >
        <Text fontSize={'58px'} lineHeight={'65px'} fontFamily={'gordita'} fontWeight={'700'}>Perfect for Small Business Owners, Digital Agencies</Text>
        <Text mt={'30px'} fontFamily={'sans-serif'}>..SEO Experts, Web Designers or anyone that needs to improve a website!</Text>
        </Box>
<Box textAlign={'center'} p={4} w='90%' m='auto' mt={'50px'} mb={1}>
    <Flex direction={['column','column','row','row']} gap={'40px'} justifyContent={'space-around'}>
            <Box _hover={{transform:'translateY(-15px)',transition:'transform 0.5s'}} p={'20px'} background={'white'}  borderRadius={10}>
            <Box pb={3} w={'15%'} m={'auto'}>
                <Image w={'50px'} src={'https://cdn-icons-png.flaticon.com/512/1451/1451817.png'}/></Box>
            <Text pb={2} fontWeight={600}>Hard-Work</Text>
            <Text color={'gray.600'}>With diligence as our foundation, we pave the path to your property dreams. </Text>
            </Box>
            <Box  _hover={{transform:'translateY(-15px)',transition:'transform 0.5s'}}  p={'20px'} background={'white'}  borderRadius={10}>
            <Box pb={3} w={'20%'} m={'auto'}>
                <Image w={'50px'} src={'https://static.vecteezy.com/system/resources/previews/026/587/916/original/grab-this-beautiful-audit-report-icon-in-trendy-style-ready-to-use-icon-vector.jpg'}/></Box>
            <Text pb={2} fontWeight={600}>Extraordinary</Text>
            <Text color={'gray.600'}>Achieving more than expected, because you deserve nothing less.</Text>
            </Box>
            <Box _hover={{transform:'translateY(-15px)',transition:'transform 0.5s'}}  p={'20px'} background={'white'}  borderRadius={10}>
            <Box pb={3} w={'15%'} m={'auto'}>
                <Image w={'50px'} src={'https://cdn-icons-png.flaticon.com/512/941/941620.png'}/></Box>
            <Text pb={2} fontWeight={600}>Accountable</Text>
            <Text color={'gray.600'}>Taking responsibility every step of the way to ensure your trust is upheld. </Text>
            </Box>
            </Flex>
            </Box>
      </Box>




      
    </Box>
  )
}

export default About
