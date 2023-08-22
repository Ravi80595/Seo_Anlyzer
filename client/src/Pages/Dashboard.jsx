import React, { useState } from 'react'
import {Box,Input,Button,Text, Heading} from '@chakra-ui/react'
import axios from 'axios'


const Dashboard = () => {
    const [url,setUrl]=useState('')
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    console.log(data,'data')


const handleSubmit=()=>{
    setLoading(true)
    axios.post('https://fierce-clam-necklace.cyclic.cloud/admin/seo',{url:url})
    .then((res)=>{
        console.log(res,'result')
        setLoading(false)
        setData([res.data])
    })
}



return (
    <Box>
    <Box w={'50%'} m={'auto'} border={'2px solid blue'} p={10} mt={20} mb={20}>
        <Input placeholder='Enter Your url here' value={url} onChange={(e)=>setUrl(e.target.value)}/>
        <Button onClick={handleSubmit} mt={5}>Submit</Button>
    </Box>
    <Box>
        {loading?'Analyzing website please wait.........':data.map((ele)=>{
           return( 
           <Box border={'2px solid grey'} w={'60%'} m={'auto'} p={20} textAlign={'left'}>
                <Heading pb={5} textAlign={'center'}>{ele.WebsiteUrl}</Heading>
                <Text>Title : {ele.title}</Text>
                <Text>H1 Tags : {ele.h1TagCount}</Text>
                <Text>H2 Tags : {ele.h2TagCount}</Text>
                <Text>H3 Tags : {ele.h3TagCount}</Text>
                <Text>H4 Tags : {ele.h4TagCount}</Text>
                <Text>H5 Tags : {ele.h5TagCount}</Text>
                <Text>H6 Tags : {ele.h6TagCount}</Text>
                <Text>Total Images : {ele.imageCount}</Text>
                <Text> Image without alt : {ele.imagewithoutAlt}</Text>
                <Text> Title SEO : {ele.isTitleInRange}</Text>
                <Text>Desc : {ele.isMetaDescriptionInRange}</Text>
                <Text>SECURE : {ele.sercure}</Text>
                <Text> Canonical URL : {ele.canonicalUrls}</Text>
                <Text> Google Analytics : {ele.googleAnalytics}</Text>
                <Text> Google Console : {ele.googleConsole}</Text>
                <Text> Robots txt : {ele.hasRobots}</Text>
                <Text> Sitemap : {ele.hasSitemap}</Text>
                <Text> Structure Data : {ele.hasStructuredData}</Text>
                <Text>Social Media :  {ele.socialMediaStatus}</Text>
                <Text> Subpages : {ele.subpages}</Text>
                </Box>
                )
        })}
    </Box>
    </Box>
  )
}

export default Dashboard