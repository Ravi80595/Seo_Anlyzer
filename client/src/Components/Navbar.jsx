import { Box,Button,Flex,Image, Text} from '@chakra-ui/react'
import React from 'react'
import logo from '../Images/logo.jpg'
import { Link } from 'react-router-dom'

const Navbar = () => {



return (
  <Box>
   <Box top={0} position={'fixed'} w={'100%'} p={'15px'} zIndex={99999} background={'white'} boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
    <Flex justifyContent={'space-between'}>
      <Flex w={'60%'}>
        <Image w={'150px'} src={logo}/>
      </Flex>
    <Flex mt={'10px'} fontSize={'18px'} fontWeight={'600'} justifyContent={'space-around'} w={'30%'}>
          <Link to='/'>
          <Text _hover={{color:'blue'}}>Home</Text>
          </Link>
          <Link to={'/about'}>
          <Text _hover={{color:'blue'}}>About</Text>
          </Link>
          <Link to={'/contact'}>
          <Text _hover={{color:'blue'}}>Contact us</Text>
          </Link>
          <Button
                    mt={'-5px'}
                    background="white"
                    color="black"
                    minH="2.5rem"
                    p=".4375rem 1.5rem .5625rem"
                    borderRadius="6.25rem"
                    border={'2px solid black'}
                    _hover={{
                      background: 'linear-gradient(58.32deg, #5e6cfe 19.11%, #f598e9 94.65%)',
                      color: 'white',
                      boxShadow:
                        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      transition: 'background 0.3s ease-in-out, color 0.3s ease-in-out',
                    }}
                  >
                    Join now
                  </Button>
        </Flex>
    </Flex>
   </Box>
  </Box>
  )
}

export default Navbar