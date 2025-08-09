import React from 'react'
import ProjectForm from '../_components/project-form'

function AddProjectPage() {
  return (
    <div>
         <h1 className="text-xl font-bold">Add Project</h1>
         {<ProjectForm formType='add' />}
    </div>
  )
}

export default AddProjectPage