// components/HcaptchaForm.tsx

import React, { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

interface HcaptchaFormProps {
  onVerify: (token: string) => void;
}

const HcaptchaForm: React.FC<HcaptchaFormProps> = ({ onVerify }) => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

  const handleVerify = (token: string | null) => {
    if (token) {
      onVerify(token);
    }
  };

  return (
    <div>
      <HCaptcha
        sitekey={siteKey}
        data-size="compact"
        onVerify={handleVerify}
        size="compact"
      />
    </div>
  );
};

export default HcaptchaForm;
