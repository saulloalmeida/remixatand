import { ActionFunction } from "@remix-run/node";
import { useActionData, useFetcher } from "@remix-run/react";
import { getBankInfo, schema } from "~/domains/banks";
import { Form } from "~/form";
import { formAction } from "~/form-action.server";

export const action: ActionFunction = async ({ request }) =>
  formAction({ request, schema, mutation: getBankInfo });

export default function Index() {
  const data = useActionData<typeof action>();
  return (
    <div className="bg-slate-500">
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : null}
      <Form
        schema={schema}
        onTransition={({ setFocus, reset, formState,}) => {
          if(formState.isSubmitted){
            setFocus("bankCode");
            reset();
          }
        }}
      />
    </div>
  );
}
