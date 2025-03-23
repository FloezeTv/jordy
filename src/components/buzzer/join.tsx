import type { QRL } from "@builder.io/qwik";
import { component$, useId, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export const Join = component$(
  ({
    onSubmit$,
  }: {
    /**
     * The data the user submitted
     */
    onSubmit$: QRL<(props: { name: string; code: string }) => unknown>;
  }) => {
    const id = useId();

    const location = useLocation();

    const name = useSignal<string>("");
    const code = useSignal<string>(location.url.searchParams.get("code") ?? "");

    return (
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">Join Jordy game</legend>

        {/* Code */}
        <label for={`${id}-code`} class="fieldset-label">
          Code
        </label>
        <input
          id={`${id}-code`}
          type="text"
          class="input"
          bind:value={code}
          disabled={location.url.searchParams.has("code")}
        />

        {/* Team Name */}
        <label for={`${id}-name`} class="fieldset-label">
          Team name
        </label>
        <input id={`${id}-name`} type="text" class="input" bind:value={name} />

        {/* Submit-Button */}
        <button
          onClick$={() => onSubmit$({ name: name.value, code: code.value })}
          class="btn btn-neutral mt-4"
        >
          Join
        </button>
      </fieldset>
    );
  },
);
