import type { PropsOf } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { Join as JoinComponent } from "~/components/buzzer/join";

export const Join = component$(
  ({
    onSubmit$,
  }: {
    onSubmit$: PropsOf<typeof JoinComponent>["onSubmit$"];
  }) => {
    return (
      <div class="flex h-full w-full items-center justify-center">
        <JoinComponent onSubmit$={onSubmit$} />
      </div>
    );
  },
);
