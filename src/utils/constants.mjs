export const registerEmailTemplate = (verificationCode) =>
    `<div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #2E3440; padding: 20px; text-align: center;">
        <div style="max-width: 600px; margin: auto; background: #3B4252; border-radius: 8px; box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2); overflow: hidden;">
            <div style="padding: 20px;">
                <h1 style="color: #ECEFF4; font-size: 28px;">Welcome to Our Service!</h1>
                <p style="color: #D8DEE9; font-size: 16px; line-height: 1.5;">Thank you for registering! To complete your registration, please verify your email address using the code below:</p>
                <h2 style="background-color: #4C566A; color: #ECEFF4; padding: 15px; border-radius: 5px; display: inline-block; font-size: 24px;">${verificationCode}</h2>
                <p style="color: #D8DEE9; font-size: 16px; line-height: 1.5;">If you did not create an account, please ignore this email.</p>
            </div>
            <div style="background: #5E81AC; color: white; padding: 15px; border-top: 1px solid #4C566A;">
                <p style="margin: 0; font-size: 16px;">Best regards,<br>Team A.B.Y.X</p>
            </div>
        </div>
    </div>`

export const verificationCodeTemplate = (verificationCode) =>
    `<div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #2E3440; padding: 20px; text-align: center;">
            <div style="max-width: 600px; margin: auto; background: #3B4252; border-radius: 8px; box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2); overflow: hidden;">
                <div style="padding: 20px;">
                    <h1 style="color: #ECEFF4; font-size: 28px;">Email Verification Code</h1>
                    <p style="color: #D8DEE9; font-size: 16px; line-height: 1.5;">To complete your registration, please use the verification code below:</p>
                    <h2 style="background-color: #4C566A; color: #ECEFF4; padding: 15px; border-radius: 5px; display: inline-block; font-size: 24px;">${verificationCode}</h2>
                    <p style="color: #D8DEE9; font-size: 16px; line-height: 1.5;">If you did not request this, please disregard this email.</p>
                </div>
                <div style="background: #5E81AC; color: white; padding: 15px; border-top: 1px solid #4C566A;">
                    <p style="margin: 0; font-size: 16px;">Thank you,<br>Team A.B.Y.X</p>
                </div>
            </div>
        </div>`

export const forgotPasswordTemplate = (resetCode) =>
    `<div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #2E3440; padding: 20px; text-align: center;">
                <div style="max-width: 600px; margin: auto; background: #3B4252; border-radius: 8px; box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2); overflow: hidden;">
                    <div style="padding: 20px;">
                        <h1 style="color: #ECEFF4; font-size: 28px;">Reset Your Password</h1>
                        <p style="color: #D8DEE9; font-size: 16px; line-height: 1.5;">We received a request to reset your password. Use the code below to proceed:</p>
                        <h2 style="background-color: #4C566A; color: #ECEFF4; padding: 15px; border-radius: 5px; display: inline-block; font-size: 24px;">${resetCode}</h2>
                        <p style="color: #D8DEE9; font-size: 16px; line-height: 1.5;">If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                    </div>
                    <div style="background: #5E81AC; color: white; padding: 15px; border-top: 1px solid #4C566A;">
                        <p style="margin: 0; font-size: 16px;">Best regards,<br>Team A.B.Y.X</p>
                    </div>
                </div>
            </div>`
