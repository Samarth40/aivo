import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'

/**
 * Handles the OAuth redirect callback from providers like Google.
 * Clerk's AuthenticateWithRedirectCallback processes the token exchange
 * and completes the sign-in/sign-up flow automatically, then redirects.
 *
 * - afterSignInUrl: existing users → dashboard
 * - afterSignUpUrl: new users → onboarding
 */
export default function SSOCallback() {
    return (
        <AuthenticateWithRedirectCallback
            afterSignInUrl="/dashboard"
            afterSignUpUrl="/onboarding"
        />
    )
}
