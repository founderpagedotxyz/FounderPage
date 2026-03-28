import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <img
            src="/logo.svg"
            alt="Founder Page"
            className="w-56 h-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <Card>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none p-8 sm:p-12">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm mb-8">
              Last updated: March 28, 2026
            </p>

            {/* 1. Introduction */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founder Page ("we", "us", "our") is operated by Enmanuel, an individual based in
                Portugal. This Privacy Policy explains how we collect, use, and protect your
                personal data when you use our platform at{" "}
                <a
                  href="https://founderpage.xyz"
                  className="text-primary underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  founderpage.xyz
                </a>
                . We are committed to protecting your privacy in accordance with the General Data
                Protection Regulation (GDPR) and applicable Portuguese and EU data protection laws.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                If you have any questions about this policy, you can reach us at{" "}
                <a
                  href="mailto:founderpage.xyz@gmail.com"
                  className="text-primary underline underline-offset-4"
                >
                  founderpage.xyz@gmail.com
                </a>
                .
              </p>
            </section>

            {/* 2. Data We Collect */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">2. Data We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We collect the following categories of personal data:
              </p>

              <h3 className="text-base font-medium mt-4 mb-2">Account Information</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Email address</li>
                <li>Full name</li>
                <li>Authentication credentials (password hash or OAuth token)</li>
              </ul>

              <h3 className="text-base font-medium mt-4 mb-2">Profile Data</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Biography and personal description</li>
                <li>Profile photo</li>
                <li>Startup information you choose to publish (name, description, links, revenue data)</li>
              </ul>

              <h3 className="text-base font-medium mt-4 mb-2">Usage Data</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Page views and click interactions (collected in anonymized, aggregate form)</li>
                <li>Device type and browser information</li>
                <li>IP address (not stored long-term; used only for security purposes)</li>
              </ul>

              <h3 className="text-base font-medium mt-4 mb-2">Payment Data</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  Payments are processed entirely by{" "}
                  <a
                    href="https://stripe.com/privacy"
                    className="text-primary underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Stripe
                  </a>
                </li>
                <li>We do not store your credit card number, CVV, or full card details</li>
                <li>We may store a Stripe customer ID, subscription status, and transaction history</li>
              </ul>
            </section>

            {/* 3. How We Use Your Data */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Data</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Provide the Service:</strong> To create and maintain your account, display
                  your founder profile, and enable all platform features.
                </li>
                <li>
                  <strong>Analytics:</strong> To understand how our platform is used and improve the
                  user experience. Usage analytics are collected in anonymized form.
                </li>
                <li>
                  <strong>Communication:</strong> To send you essential service-related emails such
                  as account verification, password resets, and important platform updates. We do
                  not send unsolicited marketing emails.
                </li>
                <li>
                  <strong>Security:</strong> To detect fraud, prevent abuse, and protect the
                  integrity of our platform.
                </li>
              </ul>
            </section>

            {/* 4. Legal Basis (GDPR) */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">4. Legal Basis for Processing (GDPR)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Under the GDPR, we process your personal data based on the following legal grounds:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Consent (Art. 6(1)(a)):</strong> When you create an account and agree to
                  this policy, you consent to the processing of your data as described herein. You
                  may withdraw consent at any time.
                </li>
                <li>
                  <strong>Contract Performance (Art. 6(1)(b)):</strong> Processing necessary to
                  provide you with the services you requested, including account management,
                  profile hosting, and payment processing.
                </li>
                <li>
                  <strong>Legitimate Interest (Art. 6(1)(f)):</strong> Processing for purposes such
                  as platform security, fraud prevention, and anonymized usage analytics, where our
                  interests do not override your fundamental rights.
                </li>
              </ul>
            </section>

            {/* 5. Data Sharing */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">5. Data Sharing</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We do not sell your personal data to any third party. We share data only with the
                following service providers, strictly as needed to operate the platform:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Stripe</strong> — Payment processing. Stripe receives payment information
                  directly and operates under its own{" "}
                  <a
                    href="https://stripe.com/privacy"
                    className="text-primary underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    privacy policy
                  </a>
                  .
                </li>
                <li>
                  <strong>Supabase</strong> — Database hosting and authentication infrastructure.
                  Data is stored on Supabase's servers in accordance with their{" "}
                  <a
                    href="https://supabase.com/privacy"
                    className="text-primary underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    privacy policy
                  </a>
                  .
                </li>
                <li>
                  <strong>Google</strong> — If you choose to sign in with Google OAuth, Google
                  receives authentication data as described in{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-primary underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google's privacy policy
                  </a>
                  .
                </li>
              </ul>
            </section>

            {/* 6. Your Rights */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">6. Your Rights Under the GDPR</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                As a data subject, you have the following rights:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Right of Access:</strong> You may request a copy of all personal data we
                  hold about you.
                </li>
                <li>
                  <strong>Right to Rectification:</strong> You may request correction of inaccurate
                  or incomplete data. You can also update most information directly from your
                  dashboard.
                </li>
                <li>
                  <strong>Right to Erasure:</strong> You may request deletion of your account and
                  all associated personal data.
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> You may request your data in a
                  structured, commonly used, machine-readable format.
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> You may withdraw your consent to data
                  processing at any time, without affecting the lawfulness of processing carried
                  out before withdrawal.
                </li>
                <li>
                  <strong>Right to Lodge a Complaint:</strong> You have the right to file a
                  complaint with the Portuguese data protection authority (CNPD) or any other EU
                  supervisory authority.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                To exercise any of these rights, contact us at{" "}
                <a
                  href="mailto:founderpage.xyz@gmail.com"
                  className="text-primary underline underline-offset-4"
                >
                  founderpage.xyz@gmail.com
                </a>
                . We will respond within 30 days.
              </p>
            </section>

            {/* 7. Cookies */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">7. Cookies and Local Storage</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not use tracking cookies or third-party advertising cookies. We use browser
                localStorage solely for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-3">
                <li>
                  <strong>Language preference:</strong> To remember your selected language across
                  sessions.
                </li>
                <li>
                  <strong>Authentication session:</strong> To keep you logged in between visits.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                These are strictly necessary for the functioning of the service and do not require
                separate consent under ePrivacy regulations.
              </p>
            </section>

            {/* 8. Data Retention */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">8. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your account data for as long as your account is active. If you delete
                your account or request erasure, we will remove your personal data within 30 days,
                except where we are legally required to retain certain records (e.g., financial
                transaction records as required by Portuguese tax law).
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Anonymized, aggregated usage data that cannot be linked back to you may be retained
                indefinitely for analytics purposes.
              </p>
            </section>

            {/* 9. Security */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">9. Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We take the security of your data seriously and implement appropriate technical and
                organizational measures, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-3">
                <li>All data transmitted over HTTPS (TLS encryption in transit)</li>
                <li>Encrypted storage at rest via our database provider</li>
                <li>Row-Level Security (RLS) policies ensuring users can only access their own data</li>
                <li>Secure authentication via Supabase Auth with hashed passwords and OAuth</li>
                <li>Regular review of access controls and security practices</li>
              </ul>
            </section>

            {/* 10. Changes to Policy */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">10. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our
                practices or legal requirements. When we make significant changes, we will update
                the "Last updated" date at the top of this page. We encourage you to review this
                policy periodically. Continued use of the service after changes constitutes
                acceptance of the updated policy.
              </p>
            </section>

            {/* 11. Contact */}
            <section>
              <h2 className="text-xl font-semibold mb-3">11. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or
                your personal data, please contact us:
              </p>
              <ul className="list-none pl-0 text-muted-foreground space-y-1 mt-3">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:founderpage.xyz@gmail.com"
                    className="text-primary underline underline-offset-4"
                  >
                    founderpage.xyz@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Operator:</strong> Enmanuel
                </li>
                <li>
                  <strong>Location:</strong> Portugal, European Union
                </li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Privacy;
