"use client";
import React, { use, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { SignUp, SignIn } from "@clerk/nextjs";

const menuItems = [
  {
    title: "Home",
    path: "/",
  },

  {
    title: "About",
    path: "/about",
  },

  {
    title: "Contact",
    path: "/contact",
  },
];

function HomepageContent() {
  const [openSheet, setOpenSheet] = React.useState(false);
  const searchparams = useSearchParams();
  const formType = searchparams.get("formType");
  
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="flex justify-between items-center px-20 py-5"
        style={{ backgroundColor: "#CD5FF8" }}
      >
        <h1 className="text-white text-2xl ">
          S . <b className="text-[#FFB600]">K</b> . T
        </h1>
        <div className="flex justify-end gap-5 items-center">
          {menuItems.map((item) => (
            <span key={item.title} className="text-sm font-bold text-white">
              {item.title}
            </span>
          ))}

          <Button onClick={() => setOpenSheet(true)}>Sign-in</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-10 h-[70vh] px-20">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-primary">
            SHIBAKRAFT-<b className="text-[#FE4E59]">PORTFOLIO</b>-BUILDER
          </h1>
          <p className="text-gray-600 mt-2 text-sm font-semibold">
            Build Your Portfolio in Minutes with ShibKraft Showcase your
            projects, skills, and experience effortlessly. Fast, customizable,
            and code-free — your personal brand, made simple.
          </p>
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-vector/choice-worker-concept-illustrated_52683-44076.jpg?semt=ais_hybrid&w=740&q=80"
            alt="hero"
          />
        </div>
      </div>

      {openSheet && (
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetContent className="min-w-[500px] flex justify-center items-center py-8">
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>

            {formType === "sign-in" ? (
              <SignIn routing="hash" signUpUrl="/?formType=sign-up" fallbackRedirectUrl="/account" />
            ) : (
              <SignUp routing="hash" signInUrl="/?formType=sign-in" fallbackRedirectUrl="/account"/>
            )}
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

function Homepage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <HomepageContent />
    </Suspense>
  );
}

export default Homepage;


