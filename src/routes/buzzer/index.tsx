import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Finish } from "~/views/buzzer/finish";
import { Join } from "~/views/buzzer/join";
import { Play } from "~/views/buzzer/play";

type Phase =
  | {
      phase: "join";
    }
  | {
      phase: "play";
      name: string;
      code: string;
    }
  | {
      phase: "finished";
      name: string;
      score: number;
    };

export default component$(() => {
  const phase = useSignal<Phase>({ phase: "join" });
  switch (phase.value.phase) {
    case "join":
      return (
        <Join
          onSubmit$={({ name, code }) =>
            (phase.value = { phase: "play", name, code })
          }
        />
      );
    case "play":
      return (
        <Play
          name={phase.value.name}
          code={phase.value.code}
          onBack$={() => (phase.value = { phase: "join" })}
          onFinished$={(name, score) =>
            (phase.value = { phase: "finished", name, score })
          }
        />
      );
    case "finished":
      return <Finish name={phase.value.name} score={phase.value.score} />;
  }
});

export const head: DocumentHead = {
  title: "Buzzer - Jordy",
  meta: [
    {
      name: "description",
      content: "Buzzer for Jordy",
    },
  ],
};
