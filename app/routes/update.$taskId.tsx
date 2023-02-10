import { Form, useLoaderData } from "@remix-run/react";
import { ActionArgs, json, redirect } from "@remix-run/node"
import { getXataClient, Tasks } from "../lib/xata";
import type { LoaderArgs } from "@remix-run/node"

const xata = getXataClient();

export async function loader({ params }: LoaderArgs) {
  const  taskId = params.taskId
  if(taskId){
    const record = await xata.db.tasks.read(taskId);
    return json(record)
  }
  console.log(taskId)   
  return {}
};
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const taskName = formData.get('name')
  const taskId = formData.get('taskId')
  console.log(taskName, taskId)
  const record = await xata.db.tasks.update(String(taskId), {
    name:String(taskName),
  });
  return redirect('/');
};



export default function Index() {
  const task = useLoaderData()
  return (
    <>
    <Form method="post">
      <input type="text" name="name" value={task.name}/>
      <input type="hidden" name="taskId" value={task.id}/>
      <button type="submit">Update</button>
    </Form>
    </>
  );
}
