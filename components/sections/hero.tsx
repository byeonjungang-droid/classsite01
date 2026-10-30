import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { siteConfig } from "@/site.config";
import { getHeroTexts } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* 첫 화면(히어로).
   - 글자는 관리자 페이지(/admin → 히어로 글자)에서 바꿉니다.
     관리자에서 바꾸지 않은 글자는 site.config.ts 의 hero 에 적힌 기본 글자가 보입니다.
   - 배경 사진은 site.config.ts 의 hero.backgroundImage 에서 바꿉니다.
     사진 위에서는 글자가 잘 읽히도록 어두운 막을 깔고 글자를 흰색으로 바꿉니다.
   - 21st.dev 의 멋진 히어로로 바꾸고 싶다면: 그 컴포넌트를 components/ui 에 넣고,
     이 파일의 <section> 안쪽을 그 컴포넌트로 감싸면 됩니다. (Claude에게 /add-component 로 요청) */
export async function Hero() {
  const { hero } = siteConfig;
  const texts = await getHeroTexts();
  const hasImage = Boolean(hero.backgroundImage);

  return (
    <section id="top" className={cn("relative isolate overflow-hidden", hasImage && "text-white")}>
      {hasImage ? (
        <>
          <Image src={hero.backgroundImage} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-black/45" />
        </>
      ) : null}
      <Container className="relative flex min-h-[80svh] flex-col justify-center py-24">
        <p
          className={cn(
            "text-sm font-medium uppercase tracking-[0.2em]",
            hasImage ? "text-white/80" : "text-muted-foreground",
          )}
        >
          {texts["hero.eyebrow"]}
        </p>
        <h1 className="mt-5 max-w-4xl whitespace-pre-line text-5xl font-semibold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          {texts["hero.title"]}
        </h1>
        <p
          className={cn(
            "mt-6 max-w-xl whitespace-pre-line text-lg leading-relaxed",
            hasImage ? "text-white/90" : "text-muted-foreground",
          )}
        >
          {texts["hero.description"]}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-mint text-mint-foreground hover:bg-mint/90">
            <a href={hero.primaryCta.href}>
              {texts["hero.primaryCta.label"]}
              <ArrowRight />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-foreground">
            <a href={hero.secondaryCta.href}>{texts["hero.secondaryCta.label"]}</a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
