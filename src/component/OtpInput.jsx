import { useEffect, useRef, useState } from "react";
import "../App.css";

const OtpInput = ({ length = 4, onOtpSubmit = () => { } }) => {
    // State to store OTP digits
    const [otp, setOtp] = useState(new Array(length).fill(""));

    // Reference for all input boxes
    const inputRefs = useRef([]);

    // Auto focus on first input on load
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    // Handle input changes
    const handleChange = (index, e) => {
        const value = e.target.value;

        // Block non-numeric input
        if (isNaN(value)) return;

        const newOtp = [...otp];

        // Allow only one character in each box
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Combine OTP for submit
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

        // Move cursor to next field automatically
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Fix cursor click behavior
    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        // Optional: move to the first empty input if previous ones are empty
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    // Handle keyboard actions
    const handleKeyDown = (index, e) => {
        // On Backspace → move to previous box if empty
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Component UI
    return (
        <div>
            {otp.map((value, index) => (
                <input
                    key={index}
                    ref={(input) => (inputRefs.current[index] = input)}
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(index, e)}
                    onClick={() => handleClick(index)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="otpInput"
                />
            ))}
        </div>
    );
};

export default OtpInput;
