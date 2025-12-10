import React, { useState } from 'react'
import OtpInput from './OtpInput'
const PhoneOtpForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showOtpInput, setShowOtpInput] = useState(false)


    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value)

    }
    const handlePhoneSubmit = (event) => {
        event.preventDefault()
        // phone validation logic here

        const regex = /[^0-9]/g;
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            alert("Please enter a valid phone number")
            return;
        }+
        // call Backend API to send OTP to the phone number
        // show otp field here
        setShowOtpInput(true)
    }

    const onOtpSubmit = (otp) => {
        console.log("OTP entered is: ", otp)
    }
    return (
        <div>
            {!showOtpInput ? (<form onSubmit={handlePhoneSubmit}>
                <input type="text" value={phoneNumber}
                    onChange={handlePhoneNumber} placeholder="Enter phone number" />

                <button type="submit" >Send OTP</button>
            </form>) : (<div>
                <p>Enter OTP sent to {phoneNumber}</p>
                <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
            </div>)}

        </div>
    )
}

export default PhoneOtpForm
