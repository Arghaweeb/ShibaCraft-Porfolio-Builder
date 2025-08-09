import React from "react";

interface IProjectFormProps {
    formType ? : 'add' | 'edit';
    initialValues ? : any;
}

function ProjectForm({formType='add', initialValues=[]}: IProjectFormProps) {
    return <div>ProjectForm</div>;
}    

export default ProjectForm