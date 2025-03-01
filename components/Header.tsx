'use client'
import {SignedIn, SignedOut, SignInButton, useUser, UserButton} from "@clerk/nextjs";
import Breacrumb from "@/components/Breacrumb";



function Header(){
    const { user } = useUser();
    return(
        <div className="flex items-center justify-between p-5">
            {user && (
                <h1 className="text-2xl">{user?.firstName} Space</h1>
            )}
            <Breacrumb/>
        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton/>
            </SignedIn>
        </div>
        </div>
    )
}
export default Header;