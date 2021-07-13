import React from "react"
import Image from 'next/image'
import { useState, useEffect } from 'react'

import styles from "./../../styles/pages/onboarding.module.css"

import {useUser} from "./../../utils/auth/userHook"

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListIcon from '@material-ui/icons/List';
import { CircularProgress } from '@material-ui/core';


export default function OnboardingPage(props){

// welcome splash with something moving to capture attention
// FORMS
//  1 - name, alias? email form sent to BE, creates user & auto Signup.
//  2 - Basic personal data: DOB, City of residence, contact number, ID number
//  3 - personal preferences: meal type/food restrictions, alergies, 

// user sign up with last name and email as parameters to log in


const [user, { mutate }] =useUser();
const [errorMsg, setErrorMsg] = useState('');

useEffect(()=>{
    if(user){
        setRegisterStep(1)
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
                <div className={styles.dataTableTitle}> We need just a few more details: </div>
                <div> <ListIcon fontSize="large" /> </div>
                <form className={styles.formTwoBox} onSubmit={async(e)=>{
                    e.preventDefault();
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
                                "dateOfBirth": e.target.value
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
                        <label htmlFor="Emergency Contact" className={styles.formTwoLabel}> Emergency Contact: </label>
                        <input className={styles.anInput} required type="number" id="Emergency Contact" placeholder="Name" onChange={(e)=>{
                            setPersonalDataMod({
                                ...personalDataMod,
                                "phoneNumber": e.target.value
                            })
                        }} />
                    </div>
                    <div className={styles.aFormDataInput}>  
                        <label htmlFor="Emerg Phone Number" className={styles.formTwoLabel}> Emergency Phone: </label>
                        <input className={styles.anInput} type="number" id="Emerg Phone Number" placeholder="Emergency Phone Number" onChange={(e)=>{
                            setPersonalDataMod({
                                ...personalDataMod,
                                "emergencyPhoneNumber": e.target.value
                            })
                        }} />
                    </div>
                    {formTwoSubmition? <>
                        <CircularProgress />
                    </>:<>
                        <input type="submit" value="Submit" className={styles.submitBTN} />
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

            </>}
            </div>
        </>
    )
}