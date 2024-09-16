import * as React from 'react';

interface EmailTemplateProps {
    verifyCode: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  verifyCode,
}) => (
  <div>
    <h1>Hello 🙌, <br />
    This is your email verification code for CHATGOAT.
    <br />
    dont share it with anyone? 👀
    <br />
        <span className='font-bold'>
         {verifyCode}
        </span>
         </h1>
  </div>
);
