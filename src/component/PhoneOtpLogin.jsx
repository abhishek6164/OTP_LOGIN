import React, { useState } from 'react'
import OtpInput from './OtpInput'

const PhoneOtpForm = () => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const [showOtpInput, setShowOtpInput] = useState(false)

    // Handle input field changes
    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value)
    }

    // Handle phone number submit
    const handlePhoneSubmit = (event) => {
        event.preventDefault()

        // Regex to block non-numeric characters
        const regex = /[^0-9]/g;

        // Validate phone number
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            alert("Please enter a valid phone number")
            return; // ❌ yaha extra "+" tha, isliye code toot raha tha
        }

        // If number is valid → Call backend API here to send OTP...

        // Show OTP input field
        setShowOtpInput(true)
    }

    // Callback when OTP is fully entered
    const onOtpSubmit = (otp) => {
        console.log("OTP entered is:", otp)
        // You can verify OTP via backend here...
    }

    return (
        <div>

            {/* If OTP is NOT yet requested */}
            {!showOtpInput ? (
                <form onSubmit={handlePhoneSubmit}>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                        placeholder="Enter phone number"
                    />

                    <button type="submit">Send OTP</button>
                </form>
            ) : (
                // If OTP input screen is active
                <div>
                    <p>Enter OTP sent to {phoneNumber}</p>
                    <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
                </div>
            )}

        </div>
    )
}

export default PhoneOtpForm
