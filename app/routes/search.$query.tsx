import { json, LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getXataClient, Tasks } from "~/lib/xata";
const xata = getXataClient();

export async function loader({ params }: LoaderArgs) {
  const  query = params.query
  const records = await xata.db.tasks.filter({
    name: { $contains: String(query) },
}).getMany(); 
  return json(records)
};

export default function Index() {
  const data:Tasks[] = useLoaderData<typeof loader>();
  return (
    <>
    <ul>
      {data.map(task=>(
        <>
        <li key={task.id}>{task.name}</li>
        <Form method="get" action={`/update/${task.id}`}>
          {/* <input type="hidden" name="taskId" value={task.id} /> */}
          <button type="submit">Update</button>
        </Form>
        <Form method="post">
          <input type="hidden" name="taskId" value={task.id} />
          <button type="submit" name="action" value="delete">Delete</button>
        </Form>
        </>
      ))}
    </ul>
    </>
  );
}