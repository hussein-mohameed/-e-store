"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, CreditCard, Wallet, Truck, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckoutClient() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { items, mounted, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
      </div>
    );
  }

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2rem] border border-gray-100 bg-white py-32 text-center shadow-xl shadow-black/5">
        <h2 className="mb-2 text-2xl font-black text-gray-900">
          {isAr ? "عربة التسوق فارغة" : "Your cart is empty"}
        </h2>
        <p className="mb-8 text-gray-500 font-medium">
          {isAr ? "لا يمكنك إتمام الدفع بدون منتجات." : "You cannot checkout without products."}
        </p>
        <Link href={`/${locale}`}>
          <Button className="h-14 rounded-xl px-10 bg-black hover:bg-gray-800 text-white font-bold transition-all hover:-translate-y-1">
            {isAr ? "العودة للتسوق" : "Return to Shopping"}
          </Button>
        </Link>
      </div>
    );
  }

  const shippingEstimate = totalPrice > 1000 ? 0 : 50;
  const finalTotal = totalPrice + shippingEstimate;

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-2xl flex flex-col items-center justify-center rounded-[2rem] border border-gray-100 bg-white py-20 px-8 text-center shadow-xl shadow-black/5 animate-in zoom-in-95 duration-500">
        <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
          <CheckCircle className="h-14 w-14" />
        </div>
        <h2 className="mb-3 text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          {isAr ? "تم تأكيد طلبك بنجاح!" : "Order Confirmed!"}
        </h2>
        <p className="mb-10 text-lg text-gray-500 font-medium">
          {isAr ? "رقم الطلب: " : "Order ID: "}
          <span className="font-bold text-black bg-[var(--bg-surface)] px-3 py-1 rounded-md mx-2">#MM-84920</span>
          <br className="hidden md:block" />
          <span className="mt-2 inline-block">
            {isAr ? "سنقوم بالتواصل معك قريباً لتأكيد موعد التوصيل عبر الواتساب." : "We will contact you soon to confirm delivery via WhatsApp."}
          </span>
        </p>
        
        <div className="w-full max-w-sm bg-[var(--bg-surface)] rounded-2xl p-6 mb-10 text-start">
          <h3 className="font-black text-gray-900 mb-4">{isAr ? "تفاصيل الدفع" : "Payment Details"}</h3>
          <div className="space-y-3 text-sm font-bold">
            <div className="flex justify-between">
              <span className="text-gray-500">{isAr ? "المبلغ المدفوع:" : "Amount Paid:"}</span>
              <span className="text-black" dir="ltr">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(finalTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{isAr ? "طريقة الدفع:" : "Payment Method:"}</span>
              <span className="text-black">{paymentMethod === "card" ? (isAr ? "البطاقة الائتمانية" : "Credit Card") : (isAr ? "الدفع عند الاستلام" : "Cash on Delivery")}</span>
            </div>
          </div>
        </div>

        <Link href={`/${locale}`}>
          <Button className="h-14 rounded-2xl px-12 font-bold shadow-lg shadow-black/10 bg-black hover:bg-gray-800 text-white transition-all hover:scale-105 active:scale-95">
            {isAr ? "العودة للرئيسية" : "Return to Home"}
          </Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-start">
      {/* Checkout Form */}
      <div className="flex-1 space-y-8">
        <form onSubmit={handleCheckout} className="space-y-8">
          
          {/* Contact Information */}
          <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-xl shadow-black/5 md:p-8">
            <h2 className="mb-6 text-xl font-black text-gray-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-sm">1</span>
              {isAr ? "معلومات الاتصال" : "Contact Information"}
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-gray-700 font-bold ms-1">{isAr ? "الاسم الأول" : "First Name"}</Label>
                <Input required className="h-14 rounded-xl bg-[var(--bg-surface)] border-transparent focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-colors px-4 font-medium" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-bold ms-1">{isAr ? "اسم العائلة" : "Last Name"}</Label>
                <Input required className="h-14 rounded-xl bg-[var(--bg-surface)] border-transparent focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-colors px-4 font-medium" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-700 font-bold ms-1">{isAr ? "البريد الإلكتروني" : "Email Address"}</Label>
                <Input required type="email" className="h-14 rounded-xl bg-[var(--bg-surface)] border-transparent focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-colors px-4 font-medium" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-700 font-bold ms-1">{isAr ? "رقم الجوال" : "Phone Number"}</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center justify-center w-16 border-e border-gray-200 text-gray-500 font-bold text-sm">
                    <span dir="ltr">+964</span>
                  </div>
                  <Input required type="tel" className="h-14 rounded-xl bg-[var(--bg-surface)] border-transparent focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-colors ps-20 font-medium" dir="ltr" placeholder="770 000 0000" />
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-xl shadow-black/5 md:p-8">
            <h2 className="mb-6 text-xl font-black text-gray-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-sm">2</span>
              {isAr ? "عنوان التوصيل" : "Shipping Address"}
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-700 font-bold ms-1">{isAr ? "العنوان بالتفصيل" : "Street Address"}</Label>
                <Input required className="h-14 rounded-xl bg-[var(--bg-surface)] border-transparent focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-colors px-4 font-medium" placeholder={isAr ? "اسم الشارع، رقم المبنى..." : "Street name, building number..."} />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-bold ms-1">{isAr ? "المدينة" : "City"}</Label>
                <Input required className="h-14 rounded-xl bg-[var(--bg-surface)] border-transparent focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-colors px-4 font-medium" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-bold ms-1">{isAr ? "الرمز البريدي" : "Zip Code"}</Label>
                <Input className="h-14 rounded-xl bg-[var(--bg-surface)] border-transparent focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-colors px-4 font-medium" />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-xl shadow-black/5 md:p-8">
            <h2 className="mb-6 text-xl font-black text-gray-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-sm">3</span>
              {isAr ? "طريقة الدفع" : "Payment Method"}
            </h2>
            
            <div className="space-y-4">
              <label className={cn(
                "flex cursor-pointer items-center justify-between rounded-2xl border-2 p-5 transition-all duration-300",
                paymentMethod === "card" ? "border-black bg-[var(--bg-surface)]" : "border-gray-100 hover:border-gray-300"
              )}>
                <div className="flex items-center gap-4">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card" 
                    checked={paymentMethod === "card"} 
                    onChange={() => setPaymentMethod("card")}
                    className="h-5 w-5 text-black focus:ring-black accent-black" 
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-base">{isAr ? "البطاقة الائتمانية" : "Credit Card"}</span>
                    <span className="text-sm font-medium text-gray-500">{isAr ? "دفع إلكتروني آمن ومريح" : "Safe and secure online payment"}</span>
                  </div>
                </div>
                <CreditCard className={cn("h-8 w-8 transition-colors", paymentMethod === "card" ? "text-black" : "text-gray-300")} />
              </label>

              <label className={cn(
                "flex cursor-pointer items-center justify-between rounded-2xl border-2 p-5 transition-all duration-300",
                paymentMethod === "cod" ? "border-black bg-[var(--bg-surface)]" : "border-gray-100 hover:border-gray-300"
              )}>
                <div className="flex items-center gap-4">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={paymentMethod === "cod"} 
                    onChange={() => setPaymentMethod("cod")}
                    className="h-5 w-5 text-black focus:ring-black accent-black" 
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-base">{isAr ? "الدفع عند الاستلام" : "Cash on Delivery"}</span>
                    <span className="text-sm font-medium text-gray-500">{isAr ? "ادفع نقداً للمندوب عند استلام طلبك" : "Pay in cash to the courier when order arrives"}</span>
                  </div>
                </div>
                <Wallet className={cn("h-8 w-8 transition-colors", paymentMethod === "cod" ? "text-black" : "text-gray-300")} />
              </label>
            </div>

            {/* Credit Card Details (Conditional) */}
            {paymentMethod === "card" && (
              <div className="mt-6 space-y-5 rounded-2xl bg-[var(--bg-surface)] p-6 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-bold ms-1">{isAr ? "رقم البطاقة" : "Card Number"}</Label>
                  <Input required placeholder="0000 0000 0000 0000" className="h-14 rounded-xl bg-white border-transparent focus-visible:ring-2 focus-visible:ring-black font-medium text-lg tracking-widest" dir="ltr" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-bold ms-1">{isAr ? "تاريخ الانتهاء" : "Expiry Date"}</Label>
                    <Input required placeholder="MM/YY" className="h-14 rounded-xl bg-white border-transparent focus-visible:ring-2 focus-visible:ring-black font-medium text-lg tracking-widest text-center" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-bold ms-1">CVC</Label>
                    <Input required placeholder="123" type="password" maxLength={3} className="h-14 rounded-xl bg-white border-transparent focus-visible:ring-2 focus-visible:ring-black font-medium text-lg tracking-widest text-center" dir="ltr" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button type="submit" disabled={isProcessing} className="h-16 w-full rounded-2xl bg-black hover:bg-gray-800 text-white text-lg font-bold shadow-xl shadow-black/10 transition-all active:scale-95 flex items-center justify-center gap-3">
            {isProcessing ? (
              <span className="h-6 w-6 animate-spin rounded-full border-4 border-white/20 border-t-white" />
            ) : (
              <>
                <Lock className="h-5 w-5" />
                {isAr ? "تأكيد الطلب والدفع" : "Confirm Order & Pay"}
                <span className="bg-white/20 px-3 py-1 rounded-lg text-sm tracking-widest" dir="ltr">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(finalTotal)}
                </span>
              </>
            )}
          </Button>

        </form>
      </div>

      {/* Order Summary Sidebar */}
      <div className="w-full lg:w-96 shrink-0 space-y-6">
        <div className="rounded-[2rem] bg-white border border-gray-100 shadow-xl shadow-black/5 p-6 md:p-8 sticky top-24">
          <h2 className="mb-6 text-xl font-black text-gray-900">
            {isAr ? "مراجعة المنتجات" : "Review Items"}
          </h2>

          <div className="space-y-4 border-b border-gray-100 pb-6 max-h-[300px] overflow-y-auto scrollbar-hide pr-2">
            {items.map((item) => {
              const name = locale === "ar" && item.nameAr ? item.nameAr : item.name;
              return (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[var(--bg-surface)] p-1">
                    <Image src={item.image} alt={name} fill className="object-contain" unoptimized />
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white z-10 shadow-sm">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="line-clamp-2 text-sm font-bold text-gray-900 leading-tight">{name}</h4>
                    <p className="mt-1 text-sm font-bold text-gray-500" dir="ltr">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-5 py-6 text-sm font-medium text-gray-600 border-b border-gray-100">
            <div className="flex justify-between items-start gap-4">
              <span className="pt-1">{isAr ? "المجموع الفرعي" : "Subtotal"}</span>
              <div className="flex flex-col items-end gap-1 font-bold text-gray-900">
                <span dir="ltr">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalPrice)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span>{isAr ? "رسوم الشحن" : "Shipping"}</span>
              <span className="font-bold text-gray-900">
                {shippingEstimate === 0 
                  ? <span className="text-[#25D366] bg-[#25D366]/10 px-3 py-1 rounded-full text-xs">{isAr ? "مجاني" : "Free"}</span> 
                  : <span dir="ltr">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(shippingEstimate)}</span>}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between gap-4">
            <span className="text-xl font-bold text-gray-900">{isAr ? "الإجمالي" : "Total"}</span>
            <div className="flex flex-col items-end gap-1">
              <span className="text-3xl font-black text-gray-900 leading-none" dir="ltr">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(finalTotal)}
              </span>
              <span className="text-sm font-bold text-gray-500" dir="rtl">
                {new Intl.NumberFormat(isAr ? 'ar-IQ' : 'en-IQ', { style: 'currency', currency: 'IQD', maximumFractionDigits: 0 }).format(finalTotal * 1500)}
              </span>
            </div>
          </div>
          
          <div className="mt-8 rounded-2xl bg-[#25D366]/10 p-4 border border-[#25D366]/20 flex items-center justify-center">
            <p className="flex items-center gap-2 text-sm font-bold text-[#128C7E]">
              <Truck className="h-5 w-5" />
              {isAr ? "التوصيل المتوقع: خلال 24 ساعة" : "Expected Delivery: 24 Hours"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
