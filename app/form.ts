import { createForm } from 'remix-forms'
// For Remix, import it like this
import { Form as FrameworkForm, useActionData, useSubmit, useTransition as useNavigation } from '@remix-run/react'
// For React Router 6.4, like this
import { Form as FrameworkForm, useActionData, useSubmit, useNavigation } from 'react-router-dom'

const Form = createForm({ component: FrameworkForm, useNavigation, useSubmit, useActionData })

export { Form }