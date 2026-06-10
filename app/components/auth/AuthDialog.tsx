"use client"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"

export function AuthDialog() {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      if (res.ok) {
        setStep("otp")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      })
      if (res.ok) {
        setIsOpen(false)
        alert("Successfully signed in!")
      } else {
        alert("Invalid OTP")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center gap-2 text-gray-700 hover:text-[#008ECC] transition-colors group">
        <User className="h-5 w-5 group-hover:fill-[#008ECC]" />
        <span className="hidden md:inline font-medium text-sm">Sign Up/Sign In</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background border-none shadow-float rounded-3xl p-6 sm:p-8">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-3xl font-black text-foreground tracking-tight">
            {step === "phone" ? "Welcome to MegaMart" : "Verify your number"}
          </DialogTitle>
          <DialogDescription className="text-text-secondary text-base">
            {step === "phone" 
              ? "Enter your WhatsApp number to Sign In or Sign Up." 
              : `We sent a 4-digit code to ${phone}.`}
          </DialogDescription>
        </DialogHeader>
        
        {step === "phone" ? (
          <form onSubmit={handleSendOtp} className="space-y-8 pt-6">
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-foreground font-semibold text-sm tracking-wide">WhatsApp Number</Label>
              <Input 
                id="phone" 
                placeholder="+1234567890" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="h-14 bg-surface border-transparent focus:border-border-focus focus:ring-1 focus:ring-border-focus focus:bg-background rounded-xl px-4 transition-all text-base font-medium text-foreground"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary-hover active:bg-primary-active text-white shadow-soft hover:shadow-float rounded-xl h-14 text-lg font-bold transition-all" disabled={loading}>
              {loading ? "Sending..." : "Continue"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-8 pt-6">
            <div className="space-y-3">
              <Label htmlFor="otp" className="text-foreground font-semibold text-sm tracking-wide">4-Digit OTP</Label>
              <Input 
                id="otp" 
                placeholder="1234" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={4}
                className="h-16 bg-surface border-transparent focus:border-border-focus focus:ring-1 focus:ring-border-focus focus:bg-background rounded-xl px-4 transition-all text-center text-3xl font-black tracking-[0.5em] text-foreground"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary-hover active:bg-primary-active text-white shadow-soft hover:shadow-float rounded-xl h-14 text-lg font-bold transition-all" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Sign In"}
            </Button>
            <Button type="button" variant="ghost" className="w-full text-text-secondary hover:text-foreground hover:bg-surface rounded-xl h-12 font-medium transition-colors" onClick={() => setStep("phone")}>
              Use a different number
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
