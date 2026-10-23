import { siteConfig } from "@/site.config";

/* 관리자 페이지에서 바꿀 수 있는 첫 화면(히어로) 글자 목록.
   - key       : 데이터베이스(site_texts 표)에 저장되는 이름
   - label     : 관리자 페이지에 보이는 이름
   - multiline : true 면 여러 줄 입력 칸 (줄바꿈이 그대로 화면에 보임) */
export const heroTextFields = [
  { key: "hero.eyebrow", label: "제목 위 작은 글씨", multiline: false },
  { key: "hero.title", label: "제목", multiline: true },
  { key: "hero.description", label: "소개 문장", multiline: true },
  { key: "hero.primaryCta.label", label: "첫 번째 버튼 글자", multiline: false },
  { key: "hero.secondaryCta.label", label: "두 번째 버튼 글자", multiline: false },
] as const;

export type HeroTextKey = (typeof heroTextFields)[number]["key"];
export type HeroTexts = Record<HeroTextKey, string>;

/** 데이터베이스에 아무것도 없을 때 보여줄 기본 글자 (site.config.ts 의 hero) */
export function defaultHeroTexts(): HeroTexts {
  const { hero } = siteConfig;
  return {
    "hero.eyebrow": hero.eyebrow,
    "hero.title": hero.title,
    "hero.description": hero.description,
    "hero.primaryCta.label": hero.primaryCta.label,
    "hero.secondaryCta.label": hero.secondaryCta.label,
  };
}

/** 데이터베이스에서 읽은 줄들을 기본 글자 위에 덮어씀 */
export function mergeHeroTexts(rows: { key: string; value: string }[] | null): HeroTexts {
  const texts = defaultHeroTexts();
  for (const row of rows ?? []) {
    if (row.key in texts && row.value.trim()) texts[row.key as HeroTextKey] = row.value;
  }
  return texts;
}
