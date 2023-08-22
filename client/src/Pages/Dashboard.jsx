import React, { useState } from 'react'
import {Box,Input,Button,Text, Heading} from '@chakra-ui/react'
import axios from 'axios'


const Dashboard = () => {
    const [url,setUrl]=useState('')
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    // console.log(data,'data')


const handleSubmit=()=>{
    setLoading(true)
    axios.post('http://localhost:3001/admin/seo',{url:url})
    .then((res)=>{
        console.log(res,'result')
        setLoading(false)
        setData([res.data])
    })
}



return (
    <Box background={'#e9e9e9'}>
    <Box  w={'70%'} m={'auto'} pt={1}>
    <Box borderRadius={5} w={'100%'} m={'auto'} p={10} mt={10} background={'white'}>
        <Input placeholder='Enter Your url here' value={url} onChange={(e)=>setUrl(e.target.value)}/>
        <Button onClick={handleSubmit} mt={5}>Submit</Button>
    </Box>
    <Box mt={4} borderRadius={5} h={'850px'} background={'white'}>
        {loading?'Analyzing website please wait.........':data.map((ele)=>{
           return( 
            <Box background={'#e9e9e9'}>
           <Box textAlign={'left'} p={3} fontFamily={'"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif'}>
            <Box background={'white'} h={300} p={3}>
            <Text fontSize={'20px'}>Audit Results for {ele.WebsiteUrl}</Text>
            <Heading mt={10} textAlign={'center'} >Score Here : 82/100</Heading>
            </Box>
            <Box background={'white'} mt={4} borderRadius={5} p={5}>
                <Box>
                    <Text fontSize={'26px'} fontWeight={'600'} color={'grey'}>Recommendations</Text>
                    {/* <Text textAlign={'center'} >OnPage SEO</Text> */}
                </Box>
                <Box fontWeight={'600'} color={'#505458'} borderTop={'1px solid grey'} p={4} mt={3}>
                <Text>SECURE : {ele.sercure}</Text>
                </Box>
                <Box fontWeight={'600'} color={'#505458'} borderTop={'1px solid grey'} p={4} mt={3}>
                <Text> Image without alt : {ele.imagewithoutAlt}</Text>
                </Box>
                <Box fontWeight={'600'} color={'#505458'} borderTop={'1px solid grey'} p={4} mt={3}>
                <Text>H6 Tags : {ele.h6TagCount}</Text>
                </Box>
                <Box fontWeight={'600'} color={'#505458'} borderTop={'1px solid grey'} p={4} mt={3}>
                <Text>H1 Tags : {ele.h1TagCount}</Text>
                </Box>
                <Box fontWeight={'600'} color={'#505458'} borderTop={'1px solid grey'} p={4} mt={3}>
                <Text> Canonical URL : {ele.canonicalUrls}</Text>
                </Box>
                <Box fontWeight={'600'} color={'#505458'} borderTop={'1px solid grey'} p={4} mt={3}>
                <Text> Google Analytics : {ele.googleAnalytics}</Text>
                </Box>
                <Box fontWeight={'600'} color={'#505458'} borderTop={'1px solid grey'} p={4} mt={3}>
                <Text> Google Console : {ele.googleConsole}</Text>
                </Box>
                </Box>
                <Box mt={5} background={'white'} p={5} borderRadius={5}>
                    <Text fontSize={'26px'}>On-Page SEO Results</Text>
                    <Box>
                        <Text fontWeight={'bold'}>Title Tag</Text>
                        <Text>{ele.isTitleInRange}</Text>
                        <Text>{ele.title}</Text>
                        <Text>Length : {ele.title.length}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>Meta Description Tag</Text>
                        <Text>{ele.isMetaDescriptionInRange}</Text>
                        <Text>{ele.metaDescription}</Text>
                        <Text>Length : {ele.metaDescription.length}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>Language</Text>
                        <Text>Declared: English</Text>
                        {/* <Text>{ele.metaDescription}</Text> */}
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>H1 Header Tag Usage</Text>
                        <Text>{ele.h1TagCount>0?'Your page has a H1 Tag.':'Your page dont have H1 Tag.'}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>H2 Header Tag Usage</Text>
                        <Text>{ele.h2TagCount>0?'Your page has a H2 Tag.':'Your page dont have H2 Tag.'}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>H3 Header Tag Usage</Text>
                        <Text>{ele.h3TagCount>0?'Your page has a H3 Tag.':'Your page dont have H3 Tag.'}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>H4 Header Tag Usage</Text>
                        <Text>{ele.h4TagCount>0?'Your page has a H4 Tag.':'Your page dont have H4 Tag.'}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>H5 Header Tag Usage</Text>
                        <Text>{ele.h5TagCount>0?'Your page has a H5 Tag.':'Your page dont have H5 Tag.'}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>H6 Header Tag Usage</Text>
                        <Text>{ele.h6TagCount>0?'Your page has a H6 Tag.':'Your page dont have H6 Tag.'}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>Image Alt Attributes</Text>
                        <Text>{ele.imagewithoutAlt>0?'You have images on your page that are missing Alt attributes':'You dont have images on your page that are missing Alt attributes.'}</Text>
                        <Text>{`We found ${ele.imageCount} images on your page and 1 of them are missing the attribute.`}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>Canonical Tag</Text>
                        <Text>{ele.hasCanonical}</Text>
                        {/* <Text>{`We found ${ele.imageCount} images on your page and 1 of them are missing the attribute.`}</Text> */}
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>Noindex Tag Test</Text>
                        <Text>{ele.hasCanonical}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>SSL Enabled</Text>
                        <Text>{ele.hasCanonical}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>Analytics</Text>
                        <Text>{ele.hasCanonical}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>Schema.org Structured Data</Text>
                        <Text>{ele.hasCanonical}</Text>
                    </Box>
                </Box>
                <Text>Total Images : {ele.imageCount}</Text>
                <Text> Title SEO : {ele.isTitleInRange}</Text>
                <Text>Desc : {ele.isMetaDescriptionInRange}</Text>
                <Text> Robots txt : {ele.hasRobots}</Text>
                <Text> Sitemap : {ele.hasSitemap}</Text>
                <Text> Structure Data : {ele.hasStructuredData}</Text>
                <Text>Social Media :  {ele.socialMediaStatus}</Text>
                <Text> Subpages : {ele.subpages}</Text>
                </Box>
                </Box>
                )
        })}
    </Box>
    </Box>
    </Box>
  )
}

export default Dashboard