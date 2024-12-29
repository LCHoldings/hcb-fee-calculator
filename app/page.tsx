"use client"

import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import NumberHoverCard from "@/components/numberHoverCard";

import { formatCurrency } from "@/lib/utils";

import Icon from "@hackclub/icons";
import toast, { Toaster } from "react-hot-toast";
import { ThemeToggle } from "@/components/themeToggle";
import Image from "next/image";

export default function DonationCalculator() {
  const { theme, systemTheme } = useTheme()

  const [donationAmount, setDonationAmount] = useState<number | undefined>();
  const [feeCoveredDonation, setFeeCoveredDonation] = useState<number | undefined>();
  const [fee, setFee] = useState<number | undefined>(7);
  
  let notifColor;

  useEffect(() => {
    if (donationAmount) {
      const covered = donationAmount / (1 - ((fee || 0) / 100))
      setFeeCoveredDonation(covered)
    }
  }, [donationAmount, fee]);

  function copyToClipboard(num: number) {
    const convertToTwoDecimal = num.toFixed(2);
      
    notifColor = (theme === "dark" || (theme === "system" && systemTheme === "dark")) ? "hsl(240 11.5% 10.2%)" : "#f9fafb";
    
    navigator.clipboard.writeText(convertToTwoDecimal);

    toast((
      <div className="flex items-center space-x-3">
        <Image src="https://cachet.dunkirk.sh/emojis/blahaj_wave/r" alt="Blahaj waving" width={30} height={30} />
        <span className="dark:text-white">
          Copied <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ${convertToTwoDecimal}
          </span> to your clipboard!
        </span>
      </div>
    ), {
      style: {
        borderRadius: '1rem',
        background: notifColor,
      },
    });
  }

  return (
    <>
      <div><Toaster /></div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
        <Card className="w-full max-w-md shadow-xl border-none">
          <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white rounded-t-xl">
            <CardTitle className="text-2xl font-bold text-center flex flex-col col-span-2 items-center">
              <Icon glyph="bag" size={60} />
              <p>HCB Donation Fee Calculator</p>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="donation-amount" className="text-lg font-medium flex flex-row items-center">
                  <Icon glyph="support" size={30} />
                  Donation Amount
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <Input
                    id="donation-amount"
                    type="number"
                    step={0.01}
                    min={0}
                    placeholder="Enter the donation amount"
                    value={donationAmount || ""}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    className="text-lg border-2 border-gray-300 dark:border-border focus:border-primary dark:focus:border-primary focus:ring-primary pl-6"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fee" className="text-lg font-medium flex flex-row items-center">
                  <Icon glyph="bolt" size={30} />
                  Fee Percentage
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">%</span>
                  <Input
                    id="fee"
                    type="number"
                    step={0.01}
                    min={0}
                    placeholder="Enter the fee percentage. (7% Default)"
                    value={fee}
                    onChange={(e) => setFee(Number(e.target.value))}
                    className="text-lg border-2 border-gray-300 dark:border-border focus:border-primary dark:focus:border-primary focus:ring-primary pl-6"
                  />
                </div>
              </div>
              <div className="space-y-4 bg-gray-50 dark:bg-border p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-700 dark:text-white flex flex-row"><Icon glyph="rep" />Result</h3>
                <div className="space-y-2">
                  <NumberHoverCard
                    labels={{
                      title: `${(fee || 0)}% Fee`,
                      description: "This is the fiscal sponsorship fee percentage for your organization. It's 7% by default."
                    }}
                    value={donationAmount ? formatCurrency((donationAmount || 0) * (fee || 0) / 100) : "$0"}
                  />
                  <NumberHoverCard
                    labels={{
                      title: "Fee-covered Donation",
                      description: `This amount covers the ${fee}% fiscal sponsorship fee of ${formatCurrency((feeCoveredDonation || 0) - (donationAmount || 0))}.`
                    }}
                    value={donationAmount ? formatCurrency(feeCoveredDonation) : "$0"}
                  />
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg rounded-xl hover:scale-105 transition-all transofrm"
                onClick={() => copyToClipboard(feeCoveredDonation || 0)}
              >
                Copy result to clipboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div >
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-gray-500">
        <a className="text-3xl" href="https://github.com/lazylllama">🦙</a>
        <p>This website is not affiliated with The Hack Foundation</p>
      </div>
      <div className="absolute right-0 top-0 p-4">
        <ThemeToggle />
      </div>
    </>
  );
}
