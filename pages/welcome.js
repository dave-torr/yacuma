import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from "next/image"

// Material ui Imports
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GetAppIcon from '@material-ui/icons/GetApp';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import ListIcon from '@material-ui/icons/List';

import AllOutIcon from '@material-ui/icons/AllOut';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';

import { Dialog } from "@material-ui/core";

import {useUser} from "../utils/auth/userHook"


import styles from "../styles/pages/YacumaPage.module.css"


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
export default function WelcomeGuestPage(props){
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

const [user, { mutate }] =useUser();

/////////////////////////////////////////////////////////
// STATE
    const [mapVisController, setMapVis] = useState(false)
    const [birdVisContr, setBirdVisCont] =useState(false)
    const [koriotoVisContr, setKoriotoVisCont] =useState(true)
    const [dialogController, setDialogCont] = useState(false)
    const [imageDialogContent, setImgDialogCont] = useState(null)
    const [mediaDisplayer, setMediaDisplayer] = useState()
    const [packingListTrigg, setPackingListTrig]=useState(true)
    const [userMenuTrigger, setUserMenuTrig]=useState(false)    
    const [packingListObj, setPackingList]=useState({
        "3 T-shirts":false ,
        "3 Comfortable Pants":false ,
        "2 or 3 sets of Underwear":false ,
        "5 Pairs of Socks":false ,
        "Waterproof Jacket":false ,
        "25L - 30L Backpack":false ,
        "Mosquito Repelent":false ,
        "Personal Toiletries":false ,
        "ID / Passport":false ,
        "Camera / Binoculars":false ,
        "Flashlight":false ,
        "Hiking Shoes":false ,
        "Sandals": false
    })

// /////////////////////////////////////////////////////
// useEffects

// packing list checked or not:
useEffect(()=>{
    if(user){
        if(user.packingList){
            setPackingList({...user.packingList})
        }
    }
},[user])
// Packing list auto update
useEffect(()=>{
    if(user){
    const interval = setInterval(async() => {
        let usersPL = JSON.stringify(user.packingList)
        let companisonPL = JSON.stringify(packingListObj)
        let payload= JSON.stringify( {"_id":user._id, "updatePL": companisonPL} )
        if(usersPL ===  companisonPL){
            // console.log("Same")
        } else {
            const res = await fetch("/api/onboarding/packingList ",{
                method: "put",
                body: payload
            })
            const editedUser = await res.json()
            if(editedUser.lastErrorObject.updatedExisting){
                console.log("Packing List Updated")
            }
        }
    }, 5000);
    return () => clearInterval(interval);
    }
})

///////////
// Utils
const dialogImageFunc=()=>{
    if(imageDialogContent){
        return(
            <>
                <div className={styles.aPostCardImg} >
                    <div style={{"padding": "9px", "cursor": "pointer"}} onClick={()=>{
                        setDialogCont(false)
                        setImgDialogCont(null)
                    }}> x | close </div>
                    <Image 
                        src={imageDialogContent.imgSRC}
                        width={imageDialogContent.IMGwidth}
                        height={imageDialogContent.IMGheight}
                        alt={imageDialogContent.IMGalt}
                    />
                    <div style={{"padding": "9px", "fontSize": "1.2em"}}> {imageDialogContent.IMGalt} </div>
                </div>
            </>
        )
    }
}

////////////
// Display
const WelcomeAndUserIntro=()=>{ 
    return(
        <> 
            <div className={styles.welcomeSplash}>
                <Image
                    src={"/assets/yacuma/welcomeSplash.png"}
                    layout="fill" objectFit="cover"
                    alt="Warax Concerts Image - Saxophone player with Band"
                />
            <div className={styles.splashText}>
                {user&&<>
                    Hi {user.name}! 
                    <br></br>
                    <strong> &nbsp; Welcome to: </strong>
                    <br></br>
                    <br></br>
                </>}
                    <Image
                        src={"/assets/icons/fontFaceBlk.png"}
                        width={400}
                        height={70}
                        alt="Yacuma FontFace Black"

                    />
                    <div className={styles.planetIconCont}> 
                        <img  src={"/assets/icons/creditPlanet.svg"} className={styles.planetIcon}/>
                    </div>
                </div>
            </div> 
        </>
    ) 
}




const aboutYacuma=()=>{ return(<> <div> short history, photos, and 'about cabins' </div> </>) }
const itineraries=()=>{ return(<> <div> Itineraries with day by day </div> </>) }
const selectedPlaylists=()=>{ return(<> <div> Recommended Travelling Playlists, trip playlist,  </div> </>) }


/////////////////////////////////////////////////////////
// Data Sections
const locationAndMap=()=>{
// Check different sizes, and size options.
// Add google maps link immediatly below
//  Share to BTN?
    return(
        <>
        <div className={styles.aYacumaSection}>
        {mapVisController? <>
            <h1 className={styles.aSectionTitle} onClick={()=>{
                if(mapVisController){
                    setMapVis(false)
                } else { setMapVis(true) }
            }}> Location & Map <Brightness5Icon /> </h1>
            <div className={styles.aSectionRow}>
                <div className={styles.aboutLocationText}>
                    <h3 >
                        Yacuma EcoLodge is located in the Ecuadorian Amazon Rainforest. <br /> <br></br>
                        In 2001 the forest was declared Private Biodiversity Reserve by the Ministry of the Environment, and today protects more than 270 hectares of primary rainforest.
                    </h3>
                    <div className={styles.dataRow}> 
                        <div className={styles.dataKey}>Altitude: </div>
                        <div className={styles.dataValue}> 520 m (1,700 ft) </div>
                    </div>
                    <div className={styles.dataRow}> 
                        <div className={styles.dataKey}>Province: </div>
                        <div className={styles.dataValue}> Napo </div>
                    </div>
                    <div className={styles.dataRow}> 
                        <div className={styles.dataKey}>Capital: </div>
                        <div className={styles.dataValue}> Tena </div>
                    </div>
                </div>

                <div className={styles.aMapContainer}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1241.590466497753!2d-77.45092663234595!3d-0.9445026551131407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf5cf8e57576c6f81!2sYacuma%20EcoLodge!5e1!3m2!1sen!2sec!4v1624324413878!5m2!1sen!2sec" width="400" height="300" loading="lazy"></iframe>
                </div>
            </div>

        <a className={styles.gMapsBTN} target="_blank" rel="noopener" href="https://goo.gl/maps/CziaPHy63CKSTRMcA"> Open In Google Maps <LocationOnIcon /> </a>
        </>:<> 
        <h1 className={styles.aSectionTitleCLOSED} onClick={()=>{
            if(mapVisController){
                setMapVis(false)
            } else { setMapVis(true) }
        }}> Location & Map <Brightness3Icon /> </h1>
                </>}
            </div>
        </>
    )
}
const birdPics=(imgSRC, IMGheight, IMGwidth, IMGalt, IMGStyle)=>{
    return(
        <>
            <div className={IMGStyle} onClick={()=>{
                setImgDialogCont({
                    "imgSRC": imgSRC,
                    "IMGheight": IMGheight,
                    "IMGwidth": IMGwidth,
                    "IMGalt": IMGalt,
                })
                setDialogCont(true)
            }}> 
                <Image
                    src={imgSRC}
                    height={IMGheight}
                    width={IMGwidth}
                    alt={IMGalt}
                />
            </div>
        </>
    )
}
const birdIMGSection=()=>{
    return(
        <>
        <div className={styles.aYacumaSection}>
            {birdVisContr? <>
            <h1 className={styles.aSectionTitle} onClick={()=>{
                if(birdVisContr){
                    setBirdVisCont(false)
                } else { setBirdVisCont(true) }
            }}> Birdwatching in Yacuma <Brightness5Icon /> </h1>        
            <div className={styles.birdImgCont}> 
                {birdPics("/assets/yacuma/kingfisher.jpg", 425, 640, "Amazon Kingfisher", styles.birdImgKing)}
                {birdPics("/assets/yacuma/channelBilledToucan.jpg", 630, 448, "Channel Billed Toucan", styles.birdImgTou)}
                {birdPics("/assets/yacuma/hoatzin.jpg", 533, 800, "Hoatzin", styles.birdImgHua)}
            </div>
            <div className={styles.birdTextContainer}>
                <h2 > There are over </h2>
                <h1 style={{"fontWeight": "600", "fontSize": "2.8em" }}> 240 </h1>
                <h1> Registered Species </h1>
                <h2> of birds within the Yacuma Reserve </h2>
                <a href="/assets/docs/yacumaBirdLists.pdf" download> Download a full PDF list here! <GetAppIcon /> </a>
            </div>
            </>:<>
                <h1 className={styles.aSectionTitleCLOSED} onClick={()=>{
                    if(birdVisContr){
                        setBirdVisCont(false)
                    } else { setBirdVisCont(true) }
                }}> Birdwatching in Yacuma  <Brightness3Icon /> </h1>
            </>}
        </div>
        </>
    )
}

const koriotoSection=()=>{ 
    let iconCopper = "/assets/korioto/iconCopper.png"
    let iconTransparency = "/assets/korioto/iconTransparency20pcBlk.png"
    let fontWhite = "/assets/korioto/fontFaceWht.png"
    return(<>
    <div className={styles.aYacumaSection}>
    {koriotoVisContr? <>
        <h1 className={styles.aSectionTitle} onClick={()=>{
            if(koriotoVisContr){
                setKoriotoVisCont(false)
            } else { setKoriotoVisCont(true) }
        }}> Yacuma x Korioto <Brightness5Icon /> </h1> 
        <div className={styles.koriotoSection}>
            <div className={styles.KoriotoIMG}>  
                <Image
                    src={"https://images.unsplash.com/photo-1572451529660-997dd93da816?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"}
                    width={1080}
                    height={600}
                    alt="Amazon Jungle"
                />
            </div>
            <div className={styles.koriotoSpinners}>
                <img src={iconCopper} className={styles.Appicon} alt="korioto-logo" />
                <img src={iconTransparency} className={styles.Appicon2} alt="korioto-logo2" />
                <img src={fontWhite} className={styles.appfontface} alt="korioto-fontface" />
            </div>
            <div className={styles.koriotoIntro}>
                <div className={styles.koriotoLineDeco} />
                YACUMA by Korioto is a unique blend of traditional Ecuadorian music with modern sounds and technology
                <div className={styles.koriotoLineDeco} />
            </div>
            <div className={styles.yacumaXKoriotoTxt}> Yacuma X Korioto </div>
            <div className={styles.koriotoMediaCont}>  
                <div className={styles.mediaSwitcherCont}> 
                    <div className={styles.aMediaIcon} onClick={()=>{
                        setMediaDisplayer("spotify")
                    }}> <Image src={"/assets/korioto/spotify.png"} width={60} height={60} alt="Spotify icon"/> </div>
                    <div className={styles.aMediaIcon} onClick={()=>{
                        setMediaDisplayer("youTube")
                    }}> <Image src={"/assets/korioto/youtube.png"} width={60} height={60} alt="YouTube icon"/> </div>
                </div>

                {mediaDisplayer==="youTube"? <>
                    <div className={styles.largeYoutubePlayer}>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLFSQuJvkl7dSNx-pmsf8g8qpI_U9yJcWV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className={styles.smallYoutubePlayer}>
                        <iframe width="300" height="180" src="https://www.youtube.com/embed/videoseries?list=PLFSQuJvkl7dSNx-pmsf8g8qpI_U9yJcWV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </> : mediaDisplayer==="spotify"&&<>
                    <iframe src="https://open.spotify.com/embed/album/31TQOxCHjX7LMtKhRDYq61" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                </>}
            </div>

        </div>
        </>:<> 
        <h1 className={styles.aSectionTitleCLOSED} onClick={()=>{
            if(koriotoVisContr){
                setKoriotoVisCont(false)
            } else { setKoriotoVisCont(true) }
        }}> Yacuma x Korioto  <Brightness3Icon /> </h1>
        </>} 
    </div>
    </>) 
}




////////////////////////////////
// AUTH elements

const userMenu=()=>{
    return(
        <>
            <Dialog fullScreen open={userMenuTrigger} onClose={()=>setUserMenuTrig(false)}>
                <div className={styles.userMenuCont}>  
                    <div className={styles.closeMenuBTN} onClick={()=>setUserMenuTrig(false)}> close | X </div>

                    <div className={styles.menuOptionCont}> 
                        {/* <div className={styles.aUserMenuOption}> edit my data </div> */}
                        <div className={styles.aUserMenuOption}> <a href="mailto:info@yacuma.travel?subject=Yacuma Ecolodge Information"> contact the yacuma team </a> </div>
                        <br></br>
                        <br></br>
                        <div className={styles.aUserMenuOption} 
                        onClick={async()=>{
                            await fetch('/api/auth/auth', {
                            method: 'DELETE',
                            });
                        mutate(null);
                        }}> log out </div>
                    </div>

                    <div className={styles.menuLogoDiv}>
                        <Image src={"/assets/icons/fontFacePlusGrn.png"} width={280} height={75} alt="Yacuma Logo Green"/>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
const packingList=()=>{ 
    let checkboxItems=[
        "3 T-shirts",
        "3 Comfortable Pants",
        "2 or 3 sets of Underwear",
        "5 Pairs of Socks",
        "Waterproof Jacket",
        "25L - 30L Backpack",
        "Mosquito Repelent",
        "Personal Toiletries",
        "ID / Passport",
        "Camera / Binoculars",
        "Flashlight",
        "Hiking Shoes",
        "Sandals"
    ]

    let eachPackingItem=checkboxItems.map((elem, i)=><React.Fragment key={i}>
        <div className={styles.aCheckboxContainer}> 
            <input type="checkbox" id={`checkBX${i}`} checked={packingListObj[elem]}
            onChange={(e)=>{
                setPackingList({
                    ...packingListObj,
                    [elem]:e.target.checked
                })
            }} />
            <label htmlFor={`checkBX${i}`} className={styles.aCheckboxLabel}> {elem} </label>
        </div>
    </React.Fragment>)

    return(
        <>
            <div className={styles.aYacumaSection}> 
            {packingListTrigg? <>
                <h1 className={styles.aSectionTitle} onClick={()=>{
                    if(packingListTrigg){
                        setPackingListTrig(false)
                    } else { setPackingListTrig(true) }
                }}> Packing List <Brightness5Icon /> </h1>
                <h3> Make sure you have everything before leaving! </h3>
                <div className={styles.packingListIcons}> 
                    <div>
                    <AllOutIcon/> 
                    </div>
                    <div>
                    <AssignmentTurnedInIcon />
                    </div>
                    <div>
                    <FilterHdrIcon />
                    </div>
                </div>
                <div className={styles.checkboxContainer}>
                    {eachPackingItem}
                </div>
            </>:<> 
                <h1 className={styles.aSectionTitleCLOSED} onClick={()=>{
                    if(packingListTrigg){
                        setPackingListTrig(false)
                    } else { setPackingListTrig(true) }
                }}> Packing List  <Brightness3Icon /> </h1>
            </>}
            </div>
        </>
    )
}
const ourItinerary=()=>{ }
const yourData=()=>{ }




/////////////////////////////////////////////////////////
// Footers
const [aHomeLikeController, setHomeLike]=useState(false)
const socialFooterBar=()=>{
    return(
        <>  
            <div className={styles.socialFootCont}>
                <div className={styles.heartContainer}>
                    <div style={{"display":"flex"}} className={styles.aHomeLikeCont}
                        onClick={()=>{
                            if(aHomeLikeController){setHomeLike(false)}
                            else{setHomeLike(true)}
                        }}>
                            {aHomeLikeController? 
                            <> 
                            <div className={styles.aHomeLikeIcon}> <FavoriteIcon />  </div>
                            </>:<>
                            <div className={styles.aHomeLikeIcon}> <FavoriteBorderIcon />  </div>
                            </>}
                            <div className={styles.likeIconText}> Yacuma EcoLodge </div>
                        </div>
                </div>

                <div style={{"display": "flex", "alignItems": "center"}}> 
                    <div className={styles.socialBtnsCont}>
                        <a target="_blank" rel="noopener" href="https://www.instagram.com/yacumaecolodge/">
                            <InstagramIcon fontSize="inherit" />
                        </a>

                        <a target="_blank" rel="noopener" href="https://www.facebook.com/Yacumaecolodge/">
                            <FacebookIcon />
                        </a>

                        <a target="_blank" rel="noopener" href="https://www.yacuma.travel/en/home/">
                            <HomeIcon />
                        </a>

                        <a target="_blank" rel="noopener" href="https://goo.gl/maps/CziaPHy63CKSTRMcA">
                            <MapIcon />
                        </a>
                    </div>
                {user&&<>
                    <div className={styles.userMenu} onClick={()=>setUserMenuTrig(true)}> <ListIcon/> </div>
                </>}
                </div>
            </div>
        </>
    )
}
const YacumaFooter=()=>{
    let creditsArr = [
        "2021 - Yacuma EcoLodge",
        "Chontayacu, Napo - Ecuador",
        "made with <3 by Dave"
    ];
    let eachFooterCredit = creditsArr.map((elem, i)=><React.Fragment key={i}>
        <div> {elem} </div>
    </React.Fragment>)
    return(
        <>
            <div className={styles.yacumaFooter}>
                <div className={styles.creditDisp} >
                    {eachFooterCredit}
                </div>
                <div className={styles.socialBtnsCont2}>
                    <a target="_blank" rel="noopener" href="https://www.instagram.com/yacumaecolodge/">
                        <InstagramIcon fontSize="inherit" />
                    </a>

                    <a target="_blank" rel="noopener" href="https://www.facebook.com/Yacumaecolodge/">
                        <FacebookIcon />
                    </a>

                    <a target="_blank" rel="noopener" href="https://www.yacuma.travel/en/home/">
                        <HomeIcon />
                    </a>

                    <a target="_blank" rel="noopener" href="https://goo.gl/maps/CziaPHy63CKSTRMcA">
                        <MapIcon />
                    </a>
                </div>
                <div className={styles.yacumaLogo}>
                    <Image 
                        src="/assets/icons/fontFacePlusGrn.png"
                        width={600}
                        height={180}

                    />
                </div> 
            </div>
        </>
    )
}

    return (
        <>
            <div className={styles.YacumaPageCont}>
                {WelcomeAndUserIntro()}
                {socialFooterBar()}
                {/* {aboutYacuma()} */}
                {/* {itineraries()} */}
                {/* {selectedPlaylists()} */}
                {user&&<>
                    {packingList()}</>}
                {locationAndMap()}
                {birdIMGSection()}
                {koriotoSection()}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            </div>
            {YacumaFooter()}
            {userMenu()}
            <Dialog open={dialogController} onClose={()=>{
                setDialogCont(false)
                setImgDialogCont(null)
                }} maxWidth="md" >
                {dialogImageFunc()}
            </Dialog>
        </>
    )
}