import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import SignOutButton from "@/components/functional/sign-out-button";
import { getCurrentUser } from "@/actions/users";


async function AccountPage() {
  
  const loggedInUser = await currentUser();
  console.log(loggedInUser);

  const supabaseUserResponse = await getCurrentUser();

  console.log(supabaseUserResponse);
  return (
    <div className="flex flex-col gap-5 p-5">
      <h1>Account Page</h1>
      <h1>Clerk User ID : {loggedInUser?.id}</h1>
      <h1>First Name : {loggedInUser?.firstName}</h1>
      <h1>Last Name: {loggedInUser?.lastName}</h1>
      <h1>Email: {loggedInUser?.emailAddresses[0].emailAddress}</h1>
      <UserButton />
      <SignOutButton />
    </div>
  );
}

export default AccountPage;
