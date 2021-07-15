import React from "react"
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import styles from "./../styles/pages/onboarding.module.css"

import {useUser} from "../utils/auth/userHook"

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListIcon from '@material-ui/icons/List';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import LoyaltyIcon from '@material-ui/icons/Loyalty';


export default function OnboardingPage(props){

// welcome splash with something moving to capture attention
// FORMS
//  1 - name, alias? email form sent to BE, creates user & auto Signup.
//  2 - Basic personal data: DOB, City of residence, contact number, ID number
//  3 - personal preferences: meal type/food restrictions, alergies, 

// user sign up with last name and email as parameters to log in

const router = useRouter()
const [user, { mutate }] =useUser();
const [errorMsg, setErrorMsg] = useState('');

useEffect(()=>{
    if(user){
        setRegisterStep(1)
        let onboardingAnchor = document.getElementById("anchorOne")
            onboardingAnchor.scrollIntoView({behavior: "smooth"})
        if (user.contactData){
            setRegisterStep(2)
            let onboardingAnchor = document.getElementById("anchorOne")
                onboardingAnchor.scrollIntoView({behavior: "smooth"})
        }
    } 
},[user])

const [registerStep, setRegisterStep]= useState(0)
const [userSignupMod, setSignUpMod]=useState(Object)
const onboardingWelcome=()=>{
    return(
        <>
        <div className={styles.splashContainer} onClick={()=>{
            let onboardingAnchor = document.getElementById("anchorOne")
                onboardingAnchor.scrollIntoView({behavior: "smooth"});
        }}>  
            <div className={styles.IMGsplashCont}>
                <Image
                    src={"/assets/yacuma/lodgeIMG.JPG"}
                    alt="Yacuma EcoLodge Panoramic Image"
                    layout="fill"
                    objectFit="cover"
                    className={styles.yacumaCoverIMG}
                />
            </div>
            <div className={styles.introText}>
                WELCOME TO
                <div className={styles.yacuSplashLogo} >
                <Image
                     src={"/assets/icons/fontFacePlusGrn.png"}
                     width={500}
                     height={145}
                     alt="YacumaEcoLdoge Icon Full color"     
                     />
                </div>
            <div className={styles.anArrowIcon}> <ExpandMoreIcon style={{ fontSize: 80 }}/> </div>
            </div>
        </div>
        </>
    )
}

const [formOneSubmition, setFormOneSub]=useState(false)

const formOne=()=>{
    return(
        <>
            <div className={styles.formOneCont}>
                <div className={styles.bromeliaIcon}>
                    <Image
                        src={"/assets/icons/iconColor.png"}
                        width={230}
                        height={350}
                        alt="Yacuma Bromelia- Flower Icon"
                    /></div>
                <div className={styles.formIntroText}> It is a pleasure to invite you to this 
                <br></br><strong>exclusive journey </strong> <br></br> to the heart of the Amazon </div>
                <br></br>
                <i> Jul 16 - Jul 18, 2021 </i>
                <br></br>

                <form className={styles.formOne} onSubmit={async(e)=>{
                    e.preventDefault();
                    setFormOneSub(true)
                        let stringifiedUser= JSON.stringify(userSignupMod)
                        const res = await fetch("/api/auth/userSignUp" ,{
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body: stringifiedUser
                        })
                        if (res.status === 201) {
                            const userObj = await res.json();
                        // writing our user object to the state
                            mutate(userObj);
                            } else { setErrorMsg(await res.text());
                        }                        
                }}>
                <strong> Start here: </strong>
                    <div className={styles.aFormDataInput}>  
                        <label htmlFor="userName" className={styles.formLabel}> Full Name: *</label>
                        <input className={styles.anInput} required type="text" id="userName" placeholder="Full Name" onChange={(e)=>{
                            setSignUpMod({
                                ...userSignupMod,
                                "name": e.target.value
                            })
                        }} />
                    </div>
                    <div className={styles.aFormDataInput}>  
                        <label htmlFor="email" className={styles.formLabel}> Email: *</label>
                        <input className={styles.anInput} required type="email" id="email" placeholder="Email" onChange={(e)=>{
                            setSignUpMod({
                                ...userSignupMod,
                                "email": e.target.value
                            })
                        }} />
                    </div>
                    <div className={styles.aFormDataInput}>  
                        <label htmlFor="password" className={styles.formLabel}> Password: *</label>
                        <input className={styles.anInput} required type="password" id="password" placeholder="Password" onChange={(e)=>{
                            setSignUpMod({
                                ...userSignupMod,
                                "password": e.target.value
                            })
                        }} />
                    </div>
                    <div> {errorMsg} </div>
                    <div> Use this data to log in <br></br> to your Yacuma Dashboard! </div>
                    {formOneSubmition ? <>
                        <CircularProgress />
                    </>:<>
                        <input type="submit" value="Submit" className={styles.submitBTN} />
                    </>}
                </form>
            </div>
        </>
    )
}

const [personalDataMod, setPersonalDataMod] =useState()
const [formTwoSubmition, setFormTwoSub]=useState(false) 
const formTwo=()=>{
    return(
        <>
            <div className={styles.formTwoCont}>
                <div className={styles.userIntroTitle}> Hi {user.name}! </div>
                <div className={styles.dataTableTitle}> Almost there! </div>
                <div> <ListIcon fontSize="large" /> </div>
                <form className={styles.formTwoBox} onSubmit={async(e)=>{
                    e.preventDefault();
                    setFormTwoSub(true)
                    let stringifiedClientData=JSON.stringify(personalDataMod)
                    const res2 = await fetch("/api/onboarding/personalData",{
                        method: "put",
                        body: stringifiedClientData
                    })
                    const editedUser = await res2.json()
                    if(editedUser.lastErrorObject.updatedExisting){
                        console.log("userUpdated updated")
                        setRegisterStep(2)
                        }

                }}> 
                    <h2>Personal Data </h2> 
                    <div className={styles.aFormDataInput}>  
                        <label htmlFor="Date of Birth" className={styles.formTwoLabel}> Date of Birth: *</label>
                        <input className={styles.anInput} required type="date" id="Date of Birth" placeholder="Date of Birth" onChange={(e)=>{
                            setPersonalDataMod({
                                ...personalDataMod,
                                "_id":user._id,
                                "dateOfBirth": e.target.value
                            })
                        }} />
                    </div>
                    <div className={styles.aFormDataInput}>  
                        <label htmlFor="ID / Passport" className={styles.formTwoLabel}> ID / Passport: *</label>
                        <input className={styles.anInput} required type="text" id="ID / Passport" placeholder="Cedula, DNI, etc" onChange={(e)=>{
                            setPersonalDataMod({
                                ...personalDataMod,
                                "idOrPass": e.target.value
                            })
                        }} />
                    </div>
                    <div className={styles.aFormDataInput}>  
                        <label htmlFor="Home Address" className={styles.formTwoLabel}> Home Address: *</label>
                        <input className={styles.anInput} required type="text" id="Home Address" placeholder="Home Address" onChange={(e)=>{
                            setPersonalDataMod({
                                ...personalDataMod,
                                "homeAddress": e.target.value
                            })
                        }} />
                    </div>
                    <div className={styles.aFormDataInput}>  
                        <label htmlFor="Phone Number" className={styles.formTwoLabel}> Phone Number: *</label>
                        <input className={styles.anInput} required type="number" id="Phone Number" placeholder="Phone Number" onChange={(e)=>{
                            setPersonalDataMod({
                                ...personalDataMod,
                                "phoneNumber": e.target.value
                            })
                        }} />
                    </div>

                    <h3> Emergency Contact Info: </h3>
                    <div> (optional) </div>
                    <div className={styles.aFormDataInput}>  
                        <label htmlFor="emergencyContact" className={styles.formTwoLabel}> Contact Name: </label>
                        <input className={styles.anInput} type="text" id="emergencyContact" placeholder="Name" onChange={(e)=>{
                            setPersonalDataMod({
                                ...personalDataMod,
                                "emergencyContName": e.target.value
                            })
                        }} />
                    </div>
                    <div className={styles.aFormDataInput}>  
                        <label htmlFor="emergPhoneNumber" className={styles.formTwoLabel}> Phone: </label>
                        <input className={styles.anInput} type="number" id="emergPhoneNumber" placeholder="Emergency Phone Number" onChange={(e)=>{
                            setPersonalDataMod({
                                ...personalDataMod,
                                "emergencyPhoneNumber": e.target.value
                            })
                        }} />
                    </div>
                    {formTwoSubmition? <>
                        <br></br>
                        <br></br>
                        <CircularProgress />
                        <br></br>
                        <br></br>
                    </>:<>
                        <input type="submit" value="Submit" className={styles.submitBTN} />
                    </>}
                </form>
            </div>
        </>
    )
}

const [preferenceDataMod, setPreferencedata]=useState({
    "preferences":"None, all good"
})
const [formThreeSubmition, setFormThree]=useState(false)
const formThree=()=>{
    return(
        <>
        <div className={styles.formTwoCont}> 
            <h3> We need just a few more details: </h3>
            (optional too!)
            <form onSubmit={async(e)=>{
                e.preventDefault();
                setFormThree(true)
                let stringifiedPreferneces= JSON.stringify(preferenceDataMod);
                const res3 = await fetch("/api/onboarding/personalData",{
                    method: "post",
                    body: stringifiedPreferneces
                })
                const editedUser2 = await res3.json()
                if(editedUser2.lastErrorObject.updatedExisting){
                    console.log("userUpdated updated")
                    window.alert("Fantastic! Please continue to your dashboard!")
                    router.push('/welcome')
                    }                
            }}>
            <div className={styles.aFormDataInput}>  
                <label htmlFor="foodRestictions" className={styles.formTwoLabel}> Food Restictions or requirements:</label>
                <input className={styles.anInput} type="text" id="foodRestictions" placeholder="Veggie, Pescatarian, Vegan or? " onChange={(e)=>{
                    setPreferencedata({
                        ...preferenceDataMod,
                        "food": e.target.value
                    })
                }} />
            </div>
            <div className={styles.aFormDataInput}>  
                <label htmlFor="allergies" className={styles.formTwoLabel}> Alergies or Medical Conditions?</label>
                <input className={styles.anInput} type="text" id="allergies" placeholder="Nuts, eggs, gluten?" onChange={(e)=>{
                    setPreferencedata({
                        ...preferenceDataMod,
                        "allergies": e.target.value
                    })
                }} />
            </div>
            <div className={styles.movieDataInput}>
            <h5>Jungle Book or Tarzan? &nbsp; &nbsp; &nbsp; </h5> 
                <div style={{"display":"flex", "flexDirection": "column"}}>
                    <div style={{"display":"flex"}}>
                        <input value="jungleBook" required type="radio" id="JungleBook" name="movieRadio" onChange={(e)=>{
                            setPreferencedata({
                                ...preferenceDataMod,
                                "_id":user._id,
                                "movie": e.target.value
                            })
                        }} />
                        <label htmlFor="JungleBook"> Jungle Book</label>
                    </div>
                    <div style={{"display":"flex"}}>
                        <input value="tarzan" required type="radio" id="movie" name="movieRadio" onChange={(e)=>{
                            setPreferencedata({
                                ...preferenceDataMod,
                                "_id":user._id,
                                "movie": e.target.value
                            })
                        }} />
                        <label htmlFor="movie"> Tarzan</label>
                    </div>
                </div>
            </div>     
            {formThreeSubmition? <>
                <br></br>
                <br></br>
                Cucu!
                <br></br>
                <br></br>
                <CircularProgress />
                <br></br>
                <br></br>
            </>:<>
                <br></br>
                <CardTravelIcon /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <LoyaltyIcon />
                <br></br>
                <input type="submit" value="Submit" className={styles.submitBTN} />
                <br></br>

            </>}
            </form>
        </div>
        </>
    )
}

console.log(user)

    return(
        <>
            <div className={styles.OnboardYacuPageGenCont}>
            {onboardingWelcome()}
            {registerStep===0? <>
                <div id="anchorOne" />

                {formOne()}

            </>: registerStep===1? <>
                <div id="anchorOne" />
                {formTwo()}

            </>: registerStep===2&& <>
                <div id="anchorOne" />
                {formThree()}
            </>}
            </div>
        </>
    )
}