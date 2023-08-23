import { Box,Flex,Image} from '@chakra-ui/react'
import React from 'react'

const Navbar = () => {



return (
   <Box h={'70px'} zIndex={99999} background={'white'} position={'fixed'} width={'100%'}>
    <Flex p={2}>
        <Image w={'150px'} src='https://www.laudco.com/wp-content/uploads/2021/10/cropped-NkqJmjVfVYE9cegFgw0V-2.png'/>
    </Flex>
   </Box>
  )
}

export default Navbar