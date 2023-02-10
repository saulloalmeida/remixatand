import { Form, useLoaderData } from "@remix-run/react";
import { ActionArgs, json, redirect } from "@remix-run/node"
import { getXataClient, Tasks } from "../lib/xata";

const xata = getXataClient();

export async function loader() {
  const records = await xata.db.tasks.getAll();
  return json(records);
}
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get('action')
  if(action ==='new'){
    const taskName = formData.get('name')
    
    const record = await xata.db.tasks.create({
      name: String(taskName),
    });
  }
  if(action==='delete'){
    const taskId = formData.get('taskId')
    const record = await xata.db.tasks.delete(String(taskId));
  }
  if(action==='query'){
    const taskName = formData.get('name')
  //   const results = await xata.search.all("mouse", {
  //     tables: ["tasks"]
  // })
  return redirect(`/search/${taskName}`);
  }
  return redirect(`/`);
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
    <Form method="post" >
      <input type="text" name="name" />
      <button type="submit" name="action" value="new">New task</button>
      <button type="submit" name="action" value="query">Buscar</button>
    </Form>
    </>
  );
}
