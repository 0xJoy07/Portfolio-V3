"use client";

import ShutterGlyphFooter from "@/components/ui/shutter-glyph-footer";
import { subscribeAction } from "@/actions/subscribe";

export function SiteFooter() {
  return (
    <div className="w-full">
      <ShutterGlyphFooter
        brand="JOY"
        company="Joy Sengupta"
        since={2022}
        background="#09090b"
        ink="#fafafa"
        signupLabel="Drop me a message or connect via social"
        placeholder="Email address"
        socials={[
          { label: "GitHub", href: "https://github.com/0xJoy07" },
          { label: "LinkedIn", href: "https://linkedin.com/in/beinggojo" },
          { label: "X (Twitter)", href: "https://x.com/_being_gojo_" },
        ]}
        legal={[
          { label: "WhatsApp", href: "https://wa.me/+917003480325" },
          { label: "Email", href: "mailto:joysengupta521@gmail.com" },
          { label: "Resume", href: "/Joy_Resume.pdf" },
        ]}
        onSubscribe={async (email) => {
          const res = await subscribeAction(email);
          return res.success;
        }}
      />
    </div>
  );
}
