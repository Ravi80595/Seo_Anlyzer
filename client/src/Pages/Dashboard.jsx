import React, { useState } from 'react'
import {Box,Input,Button,Text, Heading, Flex, Image} from '@chakra-ui/react'
import axios from 'axios'
import {FaCheck} from 'react-icons/fa'
import {RxCross2} from 'react-icons/rx'
import UsabilityStatus from '../Components/UsabilityStatus'
import LinksStatus from '../Components/LinksStatus'
import OnPageStatus from '../Components/OnPageStatus'
import Score from '../Components/Score'
import '../CSS/Dashboard.css'




const Dashboard = () => {
    const [url,setUrl]=useState('')
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)

    const [showText1, setShowText1] = useState(false);
    const [showText2, setShowText2] = useState(false);
    const [showText3, setShowText3] = useState(false);

    const toggleVisibility = target => {
        if (target === 'text1') {
            setShowText1(prevState => !prevState);
        } else if (target === 'text2') {
            setShowText2(prevState => !prevState);
        } else if(target === 'text3'){
            setShowText3(prevState => !prevState)
        }
    };

    console.log(data,'data')


    // https://fierce-clam-necklace.cyclic.cloud

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
    <Box background={'#e9e9e9'} pt={'80px'}>
    <Box  w={'70%'} m={'auto'} pt={1}>
    <Box borderRadius={5} w={'100%'} m={'auto'} p={10} mt={10} background={'white'}>
        <Input placeholder='Enter Your url here' value={url} onChange={(e)=>setUrl(e.target.value)}/>
        <Button onClick={handleSubmit} mt={5}>Submit</Button>
    </Box>
    <Box mt={4} borderRadius={5} h={'auto'} background={'white'}>
        {loading?'Analyzing website please wait.........':data.map((ele)=>{
           return( 
            <Box background={'#e9e9e9'} key={ele.title}>
           <Box textAlign={'left'} p={3} fontFamily={'"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif'}>
            <Box background={'white'} h={'auto'} p={3}>
            <Text fontSize={'20px'}>Audit Results for -  {ele.WebsiteUrl}</Text>           
            <Score data={ele}/>
            </Box>
            <Box background={'white'} mt={4} borderRadius={5} p={5}>
                <Box>
                    <Text fontSize={'26px'} fontWeight={'600'} color={'grey'}>Recommendations</Text>
                </Box>
                {ele.isTitleInRange==false? <Text borderTop={'2px solid grey'} fontSize={'18px'} fontFamily={'"Source Sans Pro","Helvetica Neue",Helvetica,Arial,sans-serif'} fontWeight={'600'} color={'#797979'} p={4} mt={3}>Your website title is not in proper Range. Make the length of title in between 60 -90 Charcters.</Text> :''}
                {ele.isMetaDescriptionInRange==false? <Text borderTop={'2px solid grey'} fontSize={'18px'} fontFamily={'"Source Sans Pro","Helvetica Neue",Helvetica,Arial,sans-serif'} fontWeight={'600'} color={'#797979'} p={4} mt={2}>Your website meta description is not in proper Range. Make the length of title in between 160 - 300 Charcters. </Text> :''}
                {ele.sercure==false?<Text borderTop={'2px solid grey'} fontSize={'18px'} fontFamily={'"Source Sans Pro","Helvetica Neue",Helvetica,Arial,sans-serif'} fontWeight={'600'} color={'#797979'} p={4} mt={3}>Your Website is not Secured. Add SSL/HTTPS Certificate to your website. </Text>:''}
                {ele.h1TagCount==false? <Text borderTop={'2px solid grey'} fontSize={'18px'} fontFamily={'"Source Sans Pro","Helvetica Neue",Helvetica,Arial,sans-serif'} fontWeight={'600'} color={'#797979'} p={4} mt={2}>Your Website don't have H1 tag. </Text> :''}
                {ele.imagewithoutAlt>0?<Text borderTop={'2px solid grey'} fontSize={'18px'} fontFamily={'"Source Sans Pro","Helvetica Neue",Helvetica,Arial,sans-serif'} fontWeight={'600'} color={'#797979'} p={4} mt={2}>Some of your images don't have alt attribute. </Text> :''}
                {ele.hasCanonicalUrls==true? <Text borderTop={'2px solid grey'} fontSize={'18px'} fontFamily={'"Source Sans Pro","Helvetica Neue",Helvetica,Arial,sans-serif'} fontWeight={'600'} color={'#797979'} p={4} mt={2}>Your website have canonical urls. </Text> :''}
                {ele.googleAnalytics==false? <Text borderBottom={'2px solid grey'} borderTop={'2px solid grey'} fontSize={'18px'} fontFamily={'"Source Sans Pro","Helvetica Neue",Helvetica,Arial,sans-serif'} fontWeight={'600'} color={'#797979'} p={4} mt={2}>Your website don't have google analytics. </Text> :''}
                </Box>






                <Box mt={5} background={'white'} p={5} pl={8} borderRadius={5}>
                    <Text fontSize={'26px'}>On-Page SEO Results</Text>
                    <OnPageStatus data={ele}/>
                    <Flex cursor='pointer' p={2} _hover={{backgroundColor:'#fafafa'}} justifyContent={'space-between'}>
                    <Box onClick={() => toggleVisibility('text1')} lineHeight={'30px'} mt={3}>
                        <Text fontWeight={'bold'}>Title Tag</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.isTitleInRange?'You have a title tag of optimal length (between 10 and 70 characters).':'Title charcters not have legth of 60 to 90 charcters'}</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.title}</Text>
                        <Text color={'#797979'} fontSize={'14px'}>Length : {ele.title.length}</Text>
                       
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                    {
                        ele.isTitleInRange?<FaCheck color='green'/>:<RxCross2 color='red'/>
                    }
                    </Flex>
                    </Flex>
                    {showText1 && (
                        <div className="hidden-text">
                         The Title Tag is an important HTML element that tells users and Search Engines what the topic of the webpage is and the type of keywords the page should rank for. The Title will appear in the Header Bar of a user's browser. It is also one of the most important (and easiest to improve) On-Page SEO factors.
                        <br />
                        We recommend setting a keyword rich Title between 10–70 characters. This is often simple to enter into your CMS system or may need to be manually set in the header section of the HTML code.
                        </div>
                         )}

                    <Flex onClick={() => toggleVisibility('text2')} cursor='pointer' p={2} _hover={{backgroundColor:'#fafafa'}} justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Meta Description Tag</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.isMetaDescriptionInRange?'Your page has a meta description of optimal length (between 70 and 160 characters).':'Description charcters not have legth of 160 to 300 charcters'}</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.metaDescription}</Text>
                        <Text color={'#797979'} fontSize={'14px'}>Length : {ele.metaDescription.length}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                    {
                        ele.isTitleInRange?<FaCheck color='green'/>:<RxCross2 color='red'/>
                    }
                    </Flex>
                    </Flex>
                    {showText2 && (
                        <div className="hidden-text">
                            Meta Description is another important HTML element that explains more descriptively to Search Engines what your page is about. Meta Descriptions are often used as the text snippets used in Search Engine results (though Search Engines are inceasingly generating these themselves) and can help further signal to Search Engines what keywords your page should rank for.
                            <br />
                            Make sure your page has a Meta Description included, and is at an optimum length (between 70 and 160 characters). Make your Meta Description text interesting and easy to comprehend. Use phrases and keywords relevant to the page and user that you would like to rank for. Meta Description is normally available to be updated in your CMS.
                        </div>
                    )}
                    <Flex onClick={() => toggleVisibility('text3')} cursor='pointer' p={2} _hover={{backgroundColor:'#fafafa'}}  justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Language</Text>
                        <Text color={'#797979'} fontSize={'14px'}>Declared: English</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                    {
                        ele.language?<FaCheck color='green'/>:<RxCross2 color='red'/>
                    }
                    </Flex>
                    </Flex>
                    {showText3 && (
                        <div className="hidden-text">
                            Meta Description is another important HTML element that explains more descriptively to Search Engines what your page is about. Meta Descriptions are often used as the text snippets used in Search Engine results (though Search Engines are inceasingly generating these themselves) and can help further signal to Search Engines what keywords your page should rank for.
                            <br />
                            Make sure your page has a Meta Description included, and is at an optimum length (between 70 and 160 characters). Make your Meta Description text interesting and easy to comprehend. Use phrases and keywords relevant to the page and user that you would like to rank for. Meta Description is normally available to be updated in your CMS.
                        </div>
                    )}
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>H1 Header Tag Usage</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.h1TagCount>0?'Your page has a H1 Tag.':'Your page dont have H1 Tag.'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                    {
                        ele.h1TagCount>0?<FaCheck color='green'/>:<RxCross2 color='red'/>
                    }
                    </Flex>
                    </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>H2-H6 Tags Usage</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.h2TagCount>0?`Your page has  ${ele.h2TagCount} H2 Tag.`:'Your page dont have H2 Tag.'}</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.h2TagCount>0?`Your page has ${ele.h3TagCount} H3 Tag.`:'Your page dont have H3 Tag.'}</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.h2TagCount>0?`Your page has ${ele.h4TagCount} H4 Tag.`:'Your page dont have H4 Tag.'}</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.h2TagCount>0?`Your page has ${ele.h5TagCount} H5 Tag.`:'Your page dont have H5 Tag.'}</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.h2TagCount>0?`Your page has ${ele.h6TagCount} H6 Tag.`:'Your page dont have H6 Tag.'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                    {
                        ele.h2TagCount>0?<FaCheck color='green'/>:<RxCross2 color='red'/>
                    }
                    </Flex>
                    </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Image Alt Attributes</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.imagewithoutAlt>0?'You have images on your page that are missing Alt attributes':'You dont have images on your page that are missing Alt attributes.'}</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{`We found ${ele.imageCount} images on your page and ${ele.imagewithoutAlt} of them are missing the attribute.`}</Text>
                    </Box>
                      <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.imagewithoutAlt>0?<RxCross2 color='red'/>:<FaCheck color='green'/>
                      }
                      </Flex>
                      </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Canonical Tag</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.hasCanonical}</Text>
                        {/* <Text>{`We found ${ele.imageCount} images on your page and 1 of them are missing the attribute.`}</Text> */}
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.hasCanonicalUrls?<FaCheck color='green'/>:<RxCross2 color='red'/>
                      }
                      </Flex>
                      </Flex>
                      <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Hreflang Usage</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.hasHreflangAttribute?'Your page is making use of Hreflang attributes.':'Your page is not making use of Hreflang attributes.'}</Text>
                        {/* <Text>{`We found ${ele.imageCount} images on your page and 1 of them are missing the attribute.`}</Text> */}
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.hasCanonical>0?<FaCheck color='green'/>:<RxCross2 color='red'/>
                      }
                      </Flex>
                      </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Noindex Tag Test</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.hasNoIndexTag?'Your page is using the Noindex Tag which prevents indexing.':'Your page is not using the Noindex Tag which prevents indexing.'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.hasNoIndexTag>0?<FaCheck color='green'/>:<RxCross2 color='red'/>
                      }
                      </Flex>
                      </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>SSL Enabled</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.sercure?'Website have SSL/HTTPS Certificate, SECURED':'Website is not secured'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.sercure>0?<FaCheck color='green'/>:<RxCross2 color='red'/>
                      }
                      </Flex>
                      </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Analytics</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.googleAnalytics?"Google Anylatics Present":"Google Anylatics is not present in the website"}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.googleAnalytics>0?<FaCheck color='green'/>:<RxCross2 color='red'/>
                      }
                      </Flex>
                      </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Schema.org Structured Data</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.hasStructuredData.length > 0?"Website have structure data":'website dont have structured data'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.hasStructuredData.length>0?<FaCheck color='green'/>:<RxCross2 color='red'/>
                      }
                      </Flex>
                      </Flex>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>SubPages</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{`Your website have ${ele.subpages} subpages`}</Text>
                    </Box>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Robots.txt</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.hasRobots?'Website have robots.txt file':'Website dont have robots.txt file'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.hasRobots?<FaCheck color='green'/>:<RxCross2 color='red'/>
                      }
                      </Flex>
                      </Flex>
                </Box>





                <Box mt={5} background={'white'} p={5} pl={8} borderRadius={5}>
                <Text fontSize={'26px'}>Links</Text>
                <LinksStatus data={ele}/>
                <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>BackLinks</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.backlinks?'Your website have backlinks':'Your website dont have backlinks.'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.backlinks?<FaCheck color='green'/>:<RxCross2 color='red'/>
                      }
                      </Flex>
                      </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>External Links</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.externalLinks?'Your website have good External Linking':'Your website dont have good External Linking.'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.externalLinks?<FaCheck color='green'/>:<RxCross2 color='red'/>
                      }
                      </Flex>
                      </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Internal Links</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.internalLinks?'Your website have good Internal Linking':'Your website dont have good Internal Linking.'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.internalLinks?<FaCheck color='green'/>:<RxCross2 color='red'/>
                      }
                      </Flex>
                      </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Friendly Links</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.hasUnfriendlyLinks?'Your website have good friendly Links.':'Some of your link URLs do not appear friendly to humans or search engines.'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.hasUnfriendlyLinks?<FaCheck color='green'/>:<RxCross2 color='red'/>
                      }
                      </Flex>
                      </Flex>
                </Box>



                <Box mt={5} background={'white'} p={5} pl={8} borderRadius={5}>
                <Text fontSize={'26px'}>Usability</Text>
                <UsabilityStatus data={ele}/>
              
                <Flex justifyContent={'space-between'}>
                <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Flash Used?</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.hasFlash?'Flash content has been used in your page':'No Flash content has been identified on your page.'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.hasFlash?<RxCross2 color='red'/>:<FaCheck color='green'/>
                      }
                      </Flex>
                      </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>iFrames Used?</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.hasIframes?'There are iFrames detected on your page.':'There are no iFrames detected on your page.'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.hasIframes?<RxCross2 color='red'/>:<FaCheck color='green'/>
                      }
                      </Flex>
                      </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Favicon</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.hasFavicon?'Your page dont have a favicon.':'Your page has specified a favicon.'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.hasFavicon?<RxCross2 color='red'/>:<FaCheck color='green'/>
                      }
                      </Flex>
                      </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Legible Font Sizes</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{ele.hasSmallFont?'There is some text on your page that is small and may not be legible enough for particular users.':'Font Size of your page looks good'}</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.hasSmallFont?<RxCross2 color='red'/>:<FaCheck color='green'/>
                      }
                      </Flex>
                      </Flex>
                </Box>




                <Box mt={5} background={'white'} p={5} pl={8} borderRadius={5}>
                <Text fontSize={'26px'} ml={-5}>Social Results</Text>
                {
                 ele.socialMediaStatus ? (
                    <>
                    <Flex gap={'70px'} w={'90%'} m={'auto'}  mt={10} mb={10}>
                        <Box w={'60%'} m ='auto'>
                        <Text fontSize={'46px'} fontWeight={'700'} color={'blue.400'}>PERFECT</Text>
                        </Box>
                    <Box>
                        <Text fontWeight={'600'} lineHeight={'36px'} color={"#505458"} fontSize={'24px'}>Your social is very good!</Text>
                        <Text color={'#797979'} fontSize={'14px'}>Congratulations, your social presence is strong and active. Social activity is important for customer communication, brand awareness and as a marketing channel to bring more visitors to your website. We recommend continued use of social campaigns to grow this further.</Text>
                    </Box>
                    </Flex>
                    <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                      <Text fontWeight={'bold'}>Facebook Connected</Text>
                      <Text color={'#797979'} fontSize={'14px'}>Your page has a link to a Facebook Page.</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.hasSmallFont?<RxCross2 color='red'/>:<FaCheck color='green'/>
                      }
                      </Flex>
                      </Flex>
                      <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                      <Text fontWeight={'bold'}>Instagram Connected</Text>
                      <Text color={'#797979'} fontSize={'14px'}>Your page has a link to a Instagram Page.</Text>
                    </Box>
                    <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                      {
                          ele.hasSmallFont?<RxCross2 color='red'/>:<FaCheck color='green'/>
                      }
                      </Flex>
                      </Flex>
                      <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Twitter Connected</Text>
                       <Text color={'#797979'} fontSize={'14px'}>Your page has a link to a Twitter Page.</Text>
                    </Box>
                     <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                     {
                         ele.hasSmallFont?<RxCross2 color='red'/>:<FaCheck color='green'/>
                     }
                     </Flex>
                     </Flex>
                     <Flex justifyContent={'space-between'}>
                    <Box lineHeight={'30px'} mt={5}>
                     <Text fontWeight={'bold'}>Linkedin Connected</Text>
                     <Text color={'#797979'} fontSize={'14px'}>Your page has a link to a Linkedin Page.</Text>
                </Box>
                 <Flex fontSize={'36px'}  mr={'40px'} justifyContent={'center'} alignItems={'center'}>
                 {
                     ele.hasSmallFont?<RxCross2 color='red'/>:<FaCheck color='green'/>
                 }
                 </Flex>
                 </Flex>
                </>
                      ) : (
                        <>
                        <Flex gap={'70px'} w={'90%'} m={'auto'}  mt={10} mb={10}>
                        <Box w={'60%'} m ='auto'>
                        <Text fontSize={'46px'} fontWeight={'700'} color={'blue.400'}> NOT PERFECT</Text>
                        </Box>
                    <Box>
                        <Text fontWeight={'600'} lineHeight={'36px'} color={"#505458"} fontSize={'24px'}>Your social is not very good!</Text>
                        <Text color={'#797979'} fontSize={'14px'}>Your social media presence demonstrates a reasonable level of activity. To maximize its impact, consider refining content, posting consistently, and engaging with your audience. Social media offers valuable channels for customer interaction, brand exposure, and marketing. With strategic efforts, you can harness its potential to achieve more significant online visibility and engagement.</Text>
                    </Box>
                    </Flex>
                        <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>Missing Social Media Platforms:</Text>
                        {ele.missingPlatforms.map((platform, index) => (
                            <Text key={index} color={'red'} fontSize={'14px'}>
                                {platform}
                            </Text>
                        ))}
                    </Box>
                    </>
                  )
                }
                </Box>
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