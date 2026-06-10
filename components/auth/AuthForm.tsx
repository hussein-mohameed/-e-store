"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AuthForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStep("otp");
      setMessage(t("otpSent"));
    } catch {
      setMessage(t("error"));
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // In a real app, you would use Supabase here. For demo, we just simulate login success
      setMessage(isAr ? "تم تسجيل الدخول بنجاح! جاري التوجيه..." : "Logged in successfully! Redirecting...");
      
      // Redirect to home page after 1.5 seconds
      setTimeout(() => {
        window.location.href = `/${locale}`;
      }, 1500);
    } catch {
      setMessage(t("error"));
    }
    setLoading(false);
  };

  const isAr = t("title") === "تسجيل الدخول"; // Simple check for language

  return (
    <div className="w-full space-y-8">
      <div className="space-y-2 text-center lg:text-start">
        <h1 className="text-3xl font-black text-gray-900">{t("title")}</h1>
        <p className="text-sm text-gray-500">
          {isAr 
            ? "أدخل رقم هاتفك لتسجيل الدخول بأمان وسرعة عبر واتساب" 
            : "Enter your phone number to sign in securely and quickly via WhatsApp"}
        </p>
      </div>

      <div className="space-y-6">
        {step === "phone" ? (
          <div className="space-y-4">
            <div className="space-y-2 text-start">
              <Label className="text-sm font-bold text-gray-700">{t("phoneLabel")}</Label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center justify-center w-16 border-e border-gray-200 bg-gray-50 rounded-s-xl">
                  <span className="text-gray-500 text-sm font-bold" dir="ltr">+964</span>
                </div>
                <Input
                  placeholder={isAr ? "770 000 0000" : "770 000 0000"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 rounded-xl border-gray-200 ps-20 focus-visible:ring-[#008ECC] focus-visible:ring-offset-0"
                  dir="ltr"
                  type="tel"
                />
              </div>
            </div>
            
            <Button 
              onClick={sendOtp} 
              disabled={loading || !phone} 
              className="h-12 w-full rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {isAr ? "إرسال كود الواتساب" : "Send WhatsApp Code"}
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 text-start">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700">{t("otpLabel")}</Label>
              <Input
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="h-12 rounded-xl border-gray-200 text-center text-xl tracking-[0.5em] focus-visible:ring-[#008ECC] focus-visible:ring-offset-0"
                dir="ltr"
              />
              <p className="text-xs text-gray-500 pt-1">
                {isAr ? `تم إرسال الكود إلى ${phone}` : `Code sent to ${phone}`}
                <button onClick={() => setStep("phone")} className="text-[#008ECC] font-bold mx-2 hover:underline">
                  {isAr ? "تغيير الرقم" : "Change number"}
                </button>
              </p>
              <p className="text-xs text-[#25D366] font-bold mt-2">
                {isAr ? "💡 ملاحظة: للتجربة، يرجى إدخال الرمز 123456" : "💡 Note: For testing, please enter code 123456"}
              </p>
            </div>
            
            <Button 
              onClick={verifyOtp} 
              disabled={loading || otp.length < 6} 
              className="h-12 w-full rounded-xl bg-[#008ECC] hover:bg-[#007AC1] text-white font-bold shadow-md transition-all flex items-center justify-center"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                isAr ? "تأكيد وتسجيل الدخول" : "Verify & Sign In"
              )}
            </Button>
          </div>
        )}

        {message && (
          <div className="rounded-xl bg-gray-50 p-4 text-center">
            <p className="text-sm font-medium text-gray-700">{message}</p>
          </div>
        )}
      </div>
      
      <p className="text-center text-xs text-gray-400">
        {isAr 
          ? "بالتسجيل، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا." 
          : "By signing in, you agree to our Terms of Service and Privacy Policy."}
      </p>
    </div>
  );
}
