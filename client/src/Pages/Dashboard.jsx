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
    const [showText4, setShowText4] = useState(false);
    const [showText5, setShowText5] = useState(false);
    const [showText6, setShowText6] = useState(false);
    const [showText7, setShowText7] = useState(false);
    const [showText8, setShowText8] = useState(false);
    const [showText9, setShowText9] = useState(false);
    const [showText10, setShowText10] = useState(false);
    const [showText11, setShowText11] = useState(false);
    const [showText12, setShowText12] = useState(false);
    const [showText13, setShowText13] = useState(false);

    const toggleVisibility = target => {
        if (target === 'text1') {
            setShowText1(prevState => !prevState);
        } else if (target === 'text2') {
            setShowText2(prevState => !prevState);
        } else if(target === 'text3'){
            setShowText3(prevState => !prevState)
        } else if(target === 'text4'){
            setShowText4(prevState => !prevState)
        } else if(target === 'text5'){
            setShowText5(prevState => !prevState)
        } else if(target === 'text6'){
            setShowText6(prevState => !prevState)
        } else if(target === 'text7'){
            setShowText7(prevState=> !prevState)
        } else if(target === 'text8'){
            setShowText8(prevState =>!prevState)
        } else if(target === 'text9'){
            setShowText9(prevState => !prevState )
        } else if(target ==='text10'){
            setShowText10(prevState=>!prevState)
        } else if (target === 'text11'){
            setShowText11(prevState => !prevState)
        } else if (target ==='text12'){
             setShowText12(prevState => !prevState)
        } else if(target ==='text13'){
            setShowText13(prevState => !prevState)
        }
        
    };

    console.log(data,'data')


    // https://fierce-clam-necklace.cyclic.cloud

const handleSubmit=()=>{
    setLoading(true)
    axios.post('https://long-cow-woolens.cyclic.app/admin/seo',{url:url})
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
    <Box mt={4} borderRadius={5} h={'auto'} minHeight={'900px'} background={'white'}>
        {loading?'Analyzing website please wait.........':data.length===0?<Text mt={'20px'}>Please Enter website url and click on submit</Text>:data.map((ele)=>{
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
                    <Flex onClick={() => toggleVisibility('text4')} cursor='pointer' p={2} _hover={{backgroundColor:'#fafafa'}}  justifyContent={'space-between'}>
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
                    {showText4 && (
                        <div className="hidden-text">
                           The h1 tag in a website serves as the top-level heading, showcasing the main title or topic. It enhances content organization, aids users in quickly grasping page relevance, assists accessibility tools, and contributes to search engine optimization (SEO) by providing a clear hierarchy of content. Properly utilizing h1 tags improves user experience and ensures better understanding of page context for both humans and search engines, ultimately leading to a more effectively designed and discoverable website.
                        </div>
                    )}  
                    <Flex onClick={() => toggleVisibility('text5')} cursor='pointer' p={2} _hover={{backgroundColor:'#fafafa'}} justifyContent={'space-between'}>
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
                    {showText5 && (
                        <div className="hidden-text">
                            Heading tags h2 to h6 are used for various levels of subheadings in a webpage. They structure content, aid readability, and provide hierarchy, enhancing user experience and SEO. Each tag represents a decreasing level of importance, with h2 being a subheading of h1, and so on. These tags help break down content into manageable sections, making it easier for visitors to scan and comprehend information. Just like h1, proper usage of subheading tags contributes to better accessibility, content organization, and search engine rankings.
                        </div>
                    )}
                    <Flex onClick={() => toggleVisibility('text6')} cursor='pointer' p={2} _hover={{backgroundColor:'#fafafa'}} justifyContent={'space-between'}>
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
                      {showText6 && (
                        <div className="hidden-text">
                            Image alt attributes provide textual descriptions for images on a webpage. They aid accessibility, assisting visually impaired users and search engines in understanding image content. Alt attributes should be concise, descriptive, and relevant, conveying the image's purpose or context. This enhances usability, SEO, and ensures a more inclusive browsing experience for all users.
                        </div>
                    )}
                    <Flex onClick={() => toggleVisibility('text7')} cursor='pointer' p={2} _hover={{backgroundColor:'#fafafa'}} justifyContent={'space-between'}>
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
                      {showText7 && (
                        <div className="hidden-text">
                            The canonical tag is an HTML element that signals search engines about the preferred version of a webpage when multiple similar versions exist. It prevents duplicate content issues, consolidates page authority, and improves SEO. It's particularly useful when duplicate content arises from various URLs pointing to the same or similar content. The canonical tag helps search engines index the right page and avoids diluting the site's search ranking.
                        </div>
                    )}
                      <Flex onClick={() => toggleVisibility('text8')} cursor='pointer' p={2} _hover={{backgroundColor:'#fafafa'}} justifyContent={'space-between'}>
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
                      {showText8 && (
                        <div className="hidden-text">
                            
                        The hreflang tag is a code snippet placed in a webpage's HTML that informs search engines about alternate language or regional versions of the same content. It enhances user experience by directing visitors to the version of the content that matches their language or region. This tag helps prevent content duplication issues, boosts SEO for multilingual websites, and ensures that the right audience is directed to the right content variant.
                        </div>
                    )}
                    <Flex onClick={() => toggleVisibility('text9')} cursor='pointer' p={2} _hover={{backgroundColor:'#fafafa'}} justifyContent={'space-between'}>
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
                      {showText9 && (
                        <div className="hidden-text">
                          
The noindex tag is an HTML attribute used to instruct search engines not to index a specific webpage or its content. It's employed when you want to keep certain pages hidden from search engine results. This tag is useful for private or sensitive pages, duplicate content, or temporary pages that you don't want to appear in search engine listings. Implementing the noindex tag prevents these pages from affecting your site's SEO and ensures that only relevant and valuable content is indexed and displayed in search results.
                        </div>
                    )}
                    <Flex onClick={() => toggleVisibility('text10')} cursor='pointer' p={2} _hover={{backgroundColor:'#fafafa'}} justifyContent={'space-between'}>
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
                      {showText10 && (
                        <div className="hidden-text">
                            SSL (Secure Sockets Layer) enabled means that a website has implemented a security protocol to establish an encrypted and secure connection between the user's browser and the website's server. This encryption ensures that data transferred between the user and the server remains private and protected from potential eavesdropping or tampering. SSL-enabled websites are indicated by "https://" in the URL and a padlock icon in the browser's address bar. This security measure enhances user trust, safeguards sensitive information (like passwords and payment details), and positively impacts SEO rankings as search engines prioritize secure websites.
                        </div>
                    )}
                    <Flex onClick={() => toggleVisibility('text11')} cursor='pointer' p={2} _hover={{backgroundColor:'#fafafa'}} justifyContent={'space-between'}>
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
                      {showText11 && (
                        <div className="hidden-text">
                            
Google Analytics is a web analytics service by Google that tracks and reports website traffic and user behavior. It provides valuable insights into how visitors interact with a website, including pageviews, user demographics, session duration, referral sources, and more. By analyzing these metrics, website owners can make informed decisions to improve user experience, content, and marketing strategies. Google Analytics offers data visualization, conversion tracking, and goal setting to measure site performance. It's an essential tool for understanding audience preferences, optimizing website performance, and enhancing digital marketing efforts.
                        </div>
                    )}
                    <Flex onClick={() => toggleVisibility('text12')} cursor='pointer' p={2} _hover={{backgroundColor:'#fafafa'}} justifyContent={'space-between'}>
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
                      {showText12 && (
                        <div className="hidden-text">
                           Schema.org structured data is a standardized markup language used to provide context and meaning to content on web pages. It uses specific tags to help search engines understand the type of content and its attributes, such as events, products, reviews, and more. Implementing structured data enhances search results by enabling rich snippets, which display additional information like ratings, prices, and dates directly in search listings. This markup improves the visibility and relevance of content in search engines, resulting in better user engagement and increased click-through rates.
                        </div>
                    )}
                    <Box lineHeight={'30px'} mt={5}>
                        <Text fontWeight={'bold'}>SubPages</Text>
                        <Text color={'#797979'} fontSize={'14px'}>{`Your website have ${ele.subpages} subpages`}</Text>
                    </Box>
                    <Flex onClick={() => toggleVisibility('text13')} cursor='pointer' p={2} _hover={{backgroundColor:'#fafafa'}}justifyContent={'space-between'}>
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
                      {showText13 && (
                        <div className="hidden-text">
                        The robots.txt file is a text file placed on a website's server to communicate with web crawlers and search engines. It provides instructions on which parts of the site should be crawled and indexed and which parts should not. By specifying rules for user agents (crawlers), the robots.txt file controls access to specific pages or directories. This file is crucial for managing search engine bots' behavior and ensuring that sensitive or private content isn't indexed. Properly configuring the robots.txt file can enhance website security, prevent duplicate content issues, and improve overall SEO performance.
                        </div>
                    )}
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