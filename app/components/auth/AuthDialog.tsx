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
      <DialogContent className="sm:max-w-[425px] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {step === "phone" ? "Welcome to MegaMart" : "Verify your number"}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            {step === "phone" 
              ? "Enter your WhatsApp number to Sign In or Sign Up." 
              : `We sent a 4-digit code to ${phone}.`}
          </DialogDescription>
        </DialogHeader>
        
        {step === "phone" ? (
          <form onSubmit={handleSendOtp} className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium">WhatsApp Number</Label>
              <Input 
                id="phone" 
                placeholder="+1234567890" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="border-gray-200 focus:border-[#008ECC] focus:ring-[#008ECC]"
              />
            </div>
            <Button type="submit" className="w-full bg-[#008ECC] hover:bg-[#008ECC]/90 text-white rounded-lg py-6 text-lg font-semibold" disabled={loading}>
              {loading ? "Sending..." : "Continue"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-gray-700 font-medium">4-Digit OTP</Label>
              <Input 
                id="otp" 
                placeholder="1234" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={4}
                className="border-gray-200 focus:border-[#008ECC] focus:ring-[#008ECC] text-center text-2xl tracking-widest"
              />
            </div>
            <Button type="submit" className="w-full bg-[#008ECC] hover:bg-[#008ECC]/90 text-white rounded-lg py-6 text-lg font-semibold" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Sign In"}
            </Button>
            <Button type="button" variant="ghost" className="w-full text-gray-500 hover:text-gray-800" onClick={() => setStep("phone")}>
              Use a different number
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
