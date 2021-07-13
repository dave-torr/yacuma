import React from 'react';
import { useEffect, useState } from "react"
import Image from 'next/image'

import englishContent from "./../../data/englishContent.json"
import spanishContent from "./../../data/spanishContent.json"
import yacumaDepDates from "./../../data/yacumaDepDates.json"
import prices from "./../../data/prices.json"

import Dialog from '@material-ui/core/Dialog';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import styles from "../../styles/pages/yacumaBooking.module.css"

export default function YacumaBooking(props){
    const [language, setLanguage]=useState(englishContent[0])
    const [selectedYear, setSelcYear]=useState(2021)
    const [yacumaResModel, setYacuResModel]=useState({
        "selectedItinerary": "Yaku | 3 Days, 2 Nights",
    })
    const [depDates, setDepDates]=useState(yacumaDepDates[0].Yaku);
    useEffect(()=>{
        if(selectedYear===2021){
            if(yacumaResModel.selectedItinerary==="Yaku | 3 Days, 2 Nights"){
                setDepDates(yacumaDepDates[0].Yaku)
            } else if (yacumaResModel.selectedItinerary==="Bromelia | 4 Days, 3 Nights"){
                setDepDates(yacumaDepDates[0].Bromelia)
            } else if (yacumaResModel.selectedItinerary==="Killa | 5 Days, 4 Nights"){
                setDepDates(yacumaDepDates[0].Killa)
            }
        } 
        // else if (selectedYear===2022){
        //     if(yacumaResModel.selectedItinerary==="Yaku | 3 Days, 2 Nights"){

        //     } else if (yacumaResModel.selectedItinerary==="Bromelia | 4 Days, 3 Nights"){

        //     } else if (yacumaResModel.selectedItinerary==="Killa | 5 Days, 4 Nights"){

        //     }
        // }
    },[yacumaResModel])

    const languageController=()=>{
        return(<>
        <div style={{"width": "100%"}}> 
            <div className={styles.languaCont} onClick={()=>{
                    if(language===englishContent[0]){
                        setLanguage(spanishContent[0])
                    } else { setLanguage(englishContent[0]) } }}> 
            {language===spanishContent[0]? <> 
                <Image src='https://www.countryflags.io/gb/flat/64.png' height={40} width={40} alt="Great Britain Flag - System in English" /> &nbsp; - English
            </>:<> 
                <Image src='https://www.countryflags.io/es/flat/64.png' height={40} width={40} alt="Great Britain Flag - System in English" /> &nbsp; - Español
            </>} 
            </div>
        </div>
        </>)
    }
    const bookingPageIntro=()=>{
        return(
            <>
                <div className={styles.bookingPageIntro}>
                    <div className={styles.YacumaLogo}> 
                        <Image src="/assets/icons/fullLogo.png" width={390} height={90} alt="Yacuma EcoLodge Logo" />
                    </div>
                    <div className={styles.generalTitle}>
                        {language.generalTitle}
                    </div>
                </div>
            </>
        )
    }


    const formOne=()=>{
    // TOUR DEPARTURE DATE AND ITINERARY
        let todate= new Date()
        let tripOptions=language.ItineraryOptions.map((elem, i)=><option key={i} value={elem}> {elem} </option>)

        let depDateOptions= depDates.map((elem, i)=>{ 
            let compareDate= new Date(elem);
                if(compareDate > todate){
                    return <option value={elem} key={i}> {elem} </option>}})

        return(
            <>
                <div className={styles.formContainer}> 

                    <div className={styles.formSectionTitle}> 
                        {language.userInputs.itinSelectTitle}</div>
                        <div className={styles.formSectionInput}>
                            <select className={styles.anInput} onChange={(e)=>{
                                setYacuResModel({
                                    ...yacumaResModel,
                                    "selectedItinerary": e.target.value
                                    }) }}> 
                                {tripOptions} </select></div>

                    <div className={styles.formSectionTitle}>
                        {language.userInputs.tourTypeSelectTitle} </div>
                        <form className={styles.formSectionInput} onChange={(e)=>setYacuResModel({
                            ...yacumaResModel,
                            "depType": e.target.value
                        })}>
                            <div><input type="radio" value={language.privateTourOption} name="depTypeRadio" id="privateRadio" />
                                <label htmlFor="privateRadio"> {language.privateTourOption}  </label></div>
                            <div><input type="radio" value={language.shatedTourOption} name="depTypeRadio" id="sharedRadio" />
                                <label htmlFor="sharedRadio"> {language.shatedTourOption}  </label></div>
                                </form>
                    {yacumaResModel.depType==="Private Departure"?<>
                    <div className={styles.formSectionTitle}> 
                        {language.userInputs.dateSelectTitle} </div>
                        <div className={styles.formSectionInput}>
                            <input type="date" className={styles.anInput} min={todate} onChange={(e)=>{
                                setYacuResModel({
                                    ...yacumaResModel,
                                    "depDate": e.target.value
                                })
                            }} />
                            </div>
                    </>: yacumaResModel.depType==="Shared Departure Tour"? <>
                    <div className={styles.formSectionTitle}> 
                        {language.userInputs.dateSelectTitle} </div>
                        <div className={styles.formSectionInput}> 
                            <select onChange={(e)=>{ 
                                setYacuResModel({
                                    ...yacumaResModel,
                                    "depDate": e.target.value
                                })
                            }} className={styles.anInput}>
                                <option> Please select a Date </option>   
                                {depDateOptions}
                            </select>
                            </div>
                    </>:<> </>}
                    {yacumaResModel.depDate&&<>
                        <div className={styles.formBtnsCont}>
                            <div className={styles.formBTN} onClick={()=>{
                                setBookingStep(bookingStep + 1)
                            }}> Next Step <ArrowForwardIosIcon /> </div>
                        </div>
                    </>}
                </div>
            </>
        )
    }
    const formTwo=()=>{
    // USER DATA
        return(<>
            <div className={styles.formContainer}>
                <div className={styles.userdataInputs}> 
                    <div className={styles.anInputCont}>
                        <label htmlFor="nameInput" className={styles.userInputLabels}> {language.userInputs.nameInput} * </label> 
                        <input className={styles.anInput} type="text" id="nameInput" required onChange={(e)=>{
                            setYacuResModel({
                                ...yacumaResModel,
                                "clientName":e.target.value
                            })
                        }} /> 
                    </div>
                    <div className={styles.anInputCont}>
                        <label htmlFor="nationInput" className={styles.userInputLabels}> {language.userInputs.nationInput} * </label> 
                        <input className={styles.anInput} type="text" id="nationInput" required onChange={(e)=>{
                            setYacuResModel({
                                ...yacumaResModel,
                                "clientNationality":e.target.value
                            })
                        }} /> 
                    </div>
                    <div className={styles.anInputCont}>
                        <label htmlFor="emailInput" className={styles.userInputLabels}> {language.userInputs.emailInput} * </label> 
                        <input className={styles.anInput} type="email" id="emailInput" required onChange={(e)=>{
                            setYacuResModel({
                                ...yacumaResModel,
                                "email":e.target.value
                            })
                        }} /> 
                    </div>
                    <div className={styles.anInputCont}>
                        <label htmlFor="passportInput" className={styles.userInputLabels}> {language.userInputs.passportInput} * </label> 
                        <input className={styles.anInput} type="text" id="passportInput" required onChange={(e)=>{
                            setYacuResModel({
                                ...yacumaResModel,
                                "passport":e.target.value
                            })
                        }} /> 
                    </div>
                    <div className={styles.anInputCont}>
                        <label htmlFor="phoneNumbInput" className={styles.userInputLabels}> {language.userInputs.phoneNumbInput} * </label> 
                        <input className={styles.anInput} type="text" id="phoneNumbInput" required onChange={(e)=>{
                            setYacuResModel({
                                ...yacumaResModel,
                                "phoneNumber":e.target.value
                            })
                        }} /> 
                    </div>
                    <div className={styles.anInputCont}>
                        <label htmlFor="dobInput" className={styles.userInputLabels}> {language.userInputs.dobInput} * </label> 
                        <input className={styles.anInput} type="date" id="dobInput" required onChange={(e)=>{
                            setYacuResModel({
                                ...yacumaResModel,
                                "dateOfBirth":e.target.value
                            })
                        }} /> 
                    </div>
                </div>
            </div>
        </>)
    }


    const [bookingStep, setBookingStep]=useState(0)
    const bookingInputs=()=>{
        return(
            <>
                <div className={styles.inputContainer}> 
                    {bookingStep===0? <>
                        {formOne()}
                    </>: bookingStep===1? <>
                        {formTwo()}
                    </>: bookingStep===2? <>
                    </>: <> </>}
                </div>
            </>
        )
    }
    const bookingSummary=()=>{
        return(
            <>
                <div className={styles.summaryData}>
                    Summary Page
                </div>
            </>
        )
    }
    const [summDialogCont, setSummDialog]= useState(false)
    const tourSummaryDialog=()=>{
        return(
            <>
                <Dialog open={summDialogCont} fullScreen onClose={()=>setSummDialog(false)} >
                <div className={styles.closeDialBTN} onClick={()=>setSummDialog(false)}> x | - close </div>
                    {bookingSummary()}
                </Dialog>
                <div className={styles.summDialogBTN} onClick={()=>setSummDialog(true)}> Tour Summary </div>
            </>
        )
    }

    return(
        <>
            <div className={styles.genPageCont}>
            {languageController()}
            {bookingPageIntro()}
            {tourSummaryDialog()}
                <div className={styles.inputAndsumContainer}>
                    {bookingInputs()}
                    <div className={styles.summaryContainer}> 
                    {bookingSummary()}
                    </div>
                </div>
            </div>
        </>
    )
}