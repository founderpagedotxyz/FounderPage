import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
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
            <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
            <p className="text-muted-foreground text-sm mb-8">
              Last updated: March 28, 2026
            </p>

            {/* 1. Acceptance of Terms */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using Founder Page at{" "}
                <a
                  href="https://founderpage.xyz"
                  className="text-primary underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  founderpage.xyz
                </a>{" "}
                ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you
                do not agree to these Terms, you must not use the Service. These Terms constitute a
                legally binding agreement between you and Enmanuel, the operator of Founder Page,
                based in Portugal.
              </p>
            </section>

            {/* 2. Description of Service */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founder Page is a portfolio platform for founders. It allows users to create a
                public profile showcasing themselves and their startups, including descriptions,
                links, and revenue data. The Service may include free and paid features, which may
                change over time.
              </p>
            </section>

            {/* 3. Account Registration */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">3. Account Registration</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                To use certain features of the Service, you must create an account. By registering,
                you agree to the following:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Age Requirement:</strong> You must be at least 16 years old to create an
                  account, in accordance with EU data protection regulations.
                </li>
                <li>
                  <strong>Accurate Information:</strong> You must provide truthful and accurate
                  information during registration and keep it up to date.
                </li>
                <li>
                  <strong>Account Security:</strong> You are responsible for maintaining the
                  confidentiality of your login credentials. You are liable for all activity that
                  occurs under your account. Notify us immediately if you suspect unauthorized
                  access.
                </li>
                <li>
                  <strong>One Account Per Person:</strong> Each individual may maintain only one
                  account.
                </li>
              </ul>
            </section>

            {/* 4. User Content */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">4. User Content</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You retain ownership of all content you submit to the Service ("User Content"),
                including profile information, startup descriptions, images, and links.
              </p>

              <h3 className="text-base font-medium mt-4 mb-2">License Grant</h3>
              <p className="text-muted-foreground leading-relaxed">
                By submitting User Content, you grant Founder Page a worldwide, non-exclusive,
                royalty-free license to display, distribute, and make your content available through
                the Service. This license exists solely to operate and promote the platform and
                terminates when you delete your content or account.
              </p>

              <h3 className="text-base font-medium mt-4 mb-2">Prohibited Content</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                You may not submit content that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Is illegal, harmful, threatening, abusive, defamatory, or obscene</li>
                <li>Infringes on any third party's intellectual property or privacy rights</li>
                <li>Constitutes spam, phishing, or unsolicited advertising</li>
                <li>Impersonates another person, founder, or organization</li>
                <li>Contains malware, viruses, or any malicious code</li>
                <li>Is intentionally false or misleading (e.g., fabricated revenue data)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We reserve the right to remove any content that violates these Terms without prior
                notice.
              </p>
            </section>

            {/* 5. Payments */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">5. Payments</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Payment Processor:</strong> All payments are processed securely by{" "}
                  <a
                    href="https://stripe.com"
                    className="text-primary underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Stripe
                  </a>
                  . We do not directly handle or store your payment card information.
                </li>
                <li>
                  <strong>Currency:</strong> Prices are displayed in EUR and/or USD as indicated at
                  the point of purchase.
                </li>
                <li>
                  <strong>Subscriptions:</strong> Paid features may be offered on a recurring
                  subscription basis. You may cancel your subscription at any time from your
                  dashboard; access continues until the end of the current billing period.
                </li>
                <li>
                  <strong>Refund Policy:</strong> We offer a 30-day money-back guarantee on paid
                  plans. If you are unsatisfied with the Service within 30 days of your purchase,
                  contact us at{" "}
                  <a
                    href="mailto:founderpage.xyz@gmail.com"
                    className="text-primary underline underline-offset-4"
                  >
                    founderpage.xyz@gmail.com
                  </a>{" "}
                  for a full refund. Refunds requested after 30 days are handled on a case-by-case
                  basis.
                </li>
              </ul>
            </section>

            {/* 6. Acceptable Use */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">6. Acceptable Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>
                  Scrape, crawl, or use automated means to extract data from the Service without
                  prior written permission
                </li>
                <li>
                  Attempt to gain unauthorized access to any part of the Service, other users'
                  accounts, or our systems
                </li>
                <li>
                  Interfere with or disrupt the Service's infrastructure, availability, or
                  performance
                </li>
                <li>Use the Service for any unlawful purpose or in violation of any applicable law</li>
                <li>
                  Abuse the platform by creating fake accounts, inflating metrics, or engaging in
                  fraudulent activity
                </li>
                <li>
                  Reverse-engineer, decompile, or disassemble any part of the Service
                </li>
              </ul>
            </section>

            {/* 7. Intellectual Property */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">7. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Founder Page name, logo, branding, design, and underlying code are the property
                of Enmanuel and are protected by applicable intellectual property laws. You may not
                copy, modify, or redistribute any part of the Service's branding or code without
                explicit written permission.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                User Content remains the property of the respective users. We claim no intellectual
                property rights over the content you create and publish on the platform.
              </p>
            </section>

            {/* 8. Termination */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">8. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may delete your account at any time. Upon deletion, your personal data will be
                removed in accordance with our{" "}
                <a
                  href="/privacy"
                  className="text-primary underline underline-offset-4"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/privacy");
                  }}
                >
                  Privacy Policy
                </a>
                .
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We reserve the right to suspend or terminate your account, without prior notice, if
                you violate these Terms or engage in conduct that we determine to be harmful to the
                Service or other users. In the case of a paid account termination due to a Terms
                violation, refunds are not guaranteed.
              </p>
            </section>

            {/* 9. Limitation of Liability */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service is provided on an "as-is" and "as-available" basis without warranties
                of any kind, whether express or implied, including but not limited to warranties of
                merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                To the maximum extent permitted by applicable law, Enmanuel and Founder Page shall
                not be liable for any indirect, incidental, special, consequential, or punitive
                damages, including but not limited to loss of profits, data, or business
                opportunities, arising out of or in connection with your use of the Service.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Nothing in these Terms excludes or limits liability for death or personal injury
                caused by negligence, fraud, or any other liability that cannot be excluded under
                applicable law.
              </p>
            </section>

            {/* 10. Governing Law */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of Portugal
                and applicable European Union regulations. Any disputes arising from these Terms or
                your use of the Service shall be subject to the exclusive jurisdiction of the
                courts of Portugal.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                If you are a consumer residing in the EU, you also benefit from any mandatory
                provisions of the consumer protection law of your country of residence, and you may
                bring proceedings in the courts of that country.
              </p>
            </section>

            {/* 11. Changes to Terms */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3">11. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may modify these Terms at any time. When we make significant changes, we will
                update the "Last updated" date at the top of this page. Continued use of the
                Service after changes are published constitutes acceptance of the revised Terms. If
                you do not agree with the updated Terms, you should stop using the Service and
                delete your account.
              </p>
            </section>

            {/* 12. Contact */}
            <section>
              <h2 className="text-xl font-semibold mb-3">12. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms, please contact us:
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

export default Terms;
