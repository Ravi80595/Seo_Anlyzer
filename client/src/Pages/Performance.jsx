import { Box,Text,Flex} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {FaCheck} from 'react-icons/fa'
import {RxCross2} from 'react-icons/rx'




const Performance = ({url}) => {
    const [loadingTime, setLoadingTime] = useState(null);
    const [pageSize, setPageSize] = useState(null);
    const [isHttp2Used, setIsHttp2Used] = useState(null);
    const [hasInlineStyles, setHasInlineStyles] = useState(null);
    const [isMinified, setIsMinified] = useState(null);
    const [count, setCount] = useState(0);



useEffect(() => {
        measurePageSpeed();
        fetchPageSize();
        checkHttp2Usage();
        checkInlineStyles()
        checkMinification()
    }, [url]);


useEffect(() => {
    // Logic to increase count based on conditions
    if (
      loadingTime < 5000 &&
      pageSize < 2000 &&
      isHttp2Used === true &&
      hasInlineStyles === false &&
      isMinified === true
    ) {
      setCount((prevCount) => prevCount + 1);
    }
}, [loadingTime, pageSize, isHttp2Used, hasInlineStyles, isMinified]);

console.log(count,'count')


// ******************************************   Page Speed checking logic ***************************************


const measurePageSpeed = async () => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';

    iframe.onload = () => {
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    setLoadingTime(loadTime);

    document.body.removeChild(iframe);
    };

    const startTime = performance.now();
    iframe.src = url;
    document.body.appendChild(iframe);
};


const fetchPageSize = async () => {
    try {
      const response = await fetch(url);
      const contentLength = response.headers.get('Content-Length');
      setPageSize(contentLength);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };





const checkHttp2Usage = async () => {
try {
    const response = await fetch(url, { method: 'GET' });
    const protocol = response.httpVersion;

    setIsHttp2Used(protocol === '2.0');
} catch (error) {
    console.error('Error:', error);
    setIsHttp2Used(false);
}
};




const checkInlineStyles = async () => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const elementsWithInlineStyles = doc.querySelectorAll('[style]');

      setHasInlineStyles(elementsWithInlineStyles.length > 0);
    } catch (error) {
      console.error('Error:', error);
      setHasInlineStyles(false);
    }
  };


const checkMinification = async () => {
    try {
      const response = await fetch(url);
      const headers = response.headers;

      const contentEncodingHeader = headers.get('content-encoding');
      const xContentEncodingHeader = headers.get('x-content-encoding');

      setIsMinified(
        contentEncodingHeader === 'gzip' ||
        xContentEncodingHeader === 'gzip'
      );
    } catch (error) {
      console.error('Error:', error);
      setIsMinified(false);
    }
  };


return (
    <Box mt={5} background={'white'} p={5} pl={8} borderRadius={5}>
    <Text fontSize={'26px'} ml={-5}>Performance</Text>
   



        <Flex gap={'70px'} w={'90%'} m={'auto'}  mt={10} mb={10}>
            <Box w={'60%'} m ='auto'>
            <Text fontSize={'46px'} fontWeight={'700'} color={'blue.400'}>PERFECT</Text>
            </Box>
        <Box>
            <Text fontWeight={'600'} lineHeight={'36px'} color={"#505458"} fontSize={'24px'}>Your social is very good!</Text>
            <Text color={'#797979'} fontSize={'14px'}>Congratulations, your social presence is strong and active. Social activity is important for customer communication, brand awareness and as a marketing channel to bring more visitors to your website. We recommend continued use of social campaigns to grow this further.</Text>
        </Box>
        </Flex>

        {/* <PageSpeedChecker/> */}
        <div>
        <Box>
            {
      loadingTime &&
      <Flex justifyContent={'space-between'}>
      <Box>
          <Box lineHeight={'30px'} mt={5}>
          <Text fontWeight={'bold'}>Page Speed</Text>
          <Text color={'#797979'} fontSize={'14px'}>Page Loaded in : {loadingTime.toFixed(2)} milliseconds</Text>
        </Box>
      </Box>
       <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
       {
           loadingTime.toFixed(2)>50000?<RxCross2 color='red'/>:<FaCheck color='green'/>
       }
       </Flex>
       </Flex>}
    </Box>
    </div>






        {/* <PageSizeChecker/>    */}
<Box>
            <Text mt={5} fontWeight={'bold'}>Page Size</Text>
            {
        pageSize !==null?(
        <Flex justifyContent={'space-between'}>
        <Box>
        <Box lineHeight={'30px'} mt={5}>
        <Text color={'#797979'} fontSize={'14px'}>Page Size in : {formatBytes(pageSize)} milliseconds</Text>
        </Box>
        </Box>
        <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
        {
        formatBytes(pageSize)>5000?<RxCross2 color='red'/>:<FaCheck color='green'/>
        }
        </Flex>
        </Flex>
        ):(
            <Text color={'#797979'} fontSize={'14px'}>Loading...</Text>
        )}
</Box>




        {/* <Http2UsageChecker/> */}
<div>
        <Text mt={9} fontWeight={'bold'}>HTTP/2 Usage Checker</Text>
    <Flex justifyContent={'space-between'}>
        {
        isHttp2Used === null ? (
        <Flex justifyContent={'space-between'}>
        <Box>
            <Box lineHeight={'30px'} mt={5}>
            <Text color={'#797979'} fontSize={'14px'}>Website is {isHttp2Used ? 'using' : 'not using'} HTTP/2.</Text>
            </Box>
        </Box>
        <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
        <FaCheck color='green'/>
        </Flex>
        </Flex>):(
            <>
            <Text color={'#797979'} fontSize={'14px'}>
            Website is {isHttp2Used ? 'using' : 'not using'} HTTP/2.
            </Text>
            <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
            <RxCross2 color='red'/>
        </Flex>
        </>
    )}
</Flex>
</div>




        {/* <InlineStylesChecker/> */}
<div>
    <Text mt={12} fontWeight={'bold'}>Inline Styles Checker</Text>
     <Flex justifyContent={'space-between'}>
         {
   hasInlineStyles === null ?(
   <Flex justifyContent={'space-between'}>
   <Box>
       <Box lineHeight={'30px'} mt={5}>
       <Text color={'#797979'} fontSize={'14px'}>Website {hasInlineStyles ? 'is using' : 'is not using'} inline styles.</Text>
     </Box>
   </Box>
    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
    <RxCross2 color='red'/>
    </Flex>
    </Flex>): (
        <>
        <Text color={'#797979'} fontSize={'14px'}>
          Website {hasInlineStyles ? 'is using' : 'is not using'} inline styles.
        </Text>
        <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
        <FaCheck color='green'/>
        </Flex>
        </>
      )}
 </Flex>
 </div>



        {/* <MinificationChecker/> */}
<div>
    <Text mt={9} fontWeight={'bold'}>Minification Checker</Text>
     <Flex justifyContent={'space-between'}>
         {
   isMinified === null ?(
   <Flex justifyContent={'space-between'}>
   <Box>
       <Box lineHeight={'30px'} mt={5}>
       <Text color={'#797979'} fontSize={'14px'}>Files on the website {isMinified ? 'are minified.' : 'are not minified.'}</Text>
     </Box>
   </Box>
    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
    <RxCross2 color='red'/>
    </Flex>
    </Flex>):(
        <>
        <Text color={'#797979'} fontSize={'14px'}>Files on the website {isMinified ? 'are minified.' : 'are not minified.'}</Text>
        <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
            <FaCheck color='green'/>
            </Flex>
            </>
      )}
 </Flex>
 </div>
    </Box>
  )
}

function formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

export default Performance