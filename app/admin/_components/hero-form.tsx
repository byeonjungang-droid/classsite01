"use client";

import { useActionState } from "react";

import { saveHeroTexts, type ActionState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { heroTextFields, type HeroTexts } from "@/lib/hero-texts";

const fieldClass =
  "w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50";

/** 첫 화면(히어로) 글자 수정 칸. 칸을 비우고 저장하면 기본 글자(site.config.ts)로 돌아갑니다. */
export function HeroForm({ texts }: { texts: HeroTexts }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveHeroTexts, {});

  return (
    <form action={action} className="grid gap-4">
      {heroTextFields.map((field) => (
        <label key={field.key} className="grid gap-1.5 text-sm">
          <span className="font-medium">{field.label}</span>
          {field.multiline ? (
            <textarea
              name={field.key}
              rows={3}
              defaultValue={texts[field.key]}
              className={`${fieldClass} py-2`}
            />
          ) : (
            <input name={field.key} defaultValue={texts[field.key]} className={`${fieldClass} h-10`} />
          )}
        </label>
      ))}

      <p className="text-xs text-muted-foreground">
        제목과 소개 문장은 Enter 로 줄을 바꾸면 사이트에서도 줄이 바뀝니다. 칸을 비우고 저장하면 처음
        글자로 돌아갑니다.
      </p>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "저장 중..." : "저장"}
        </Button>
        {state.message ? (
          <p className={state.ok ? "text-sm text-muted-foreground" : "text-sm text-destructive"}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
