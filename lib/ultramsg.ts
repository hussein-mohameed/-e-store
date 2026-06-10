const ULTRAMSG_API = "https://api.ultramsg.com";

export async function sendWhatsAppOtp(phone: string, code: string): Promise<boolean> {
  const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
  const token = process.env.ULTRAMSG_TOKEN;

  if (!instanceId || !token) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[DEV OTP] Phone: ${phone}, Code: ${code}`);
      return true;
    }
    throw new Error("UltraMsg credentials not configured");
  }

  const message = `Your MegaMart verification code is: ${code}. Valid for 10 minutes.`;

  const response = await fetch(
    `${ULTRAMSG_API}/${instanceId}/messages/chat`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        token,
        to: phone.replace(/\s/g, ""),
        body: message,
      }),
    }
  );

  const data = await response.json();
  return response.ok && !data.error;
}

export function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
