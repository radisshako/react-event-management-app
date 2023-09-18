import React, { useState } from 'react';

const AddProject = (props) => {
  //State to store the form inputs
  const [state, setState] = useState({
    projectName: '',
    projectIdentifier: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  //Deals with form submission
  const handleAdd = (e) => {
    e.preventDefault();

    //Makes sure inputs are there 
    if(state.projectName.trim() === '' ||  state.projectIdentifier.trim() === '' ||state.startDate.trim() === '' || state.endDate.trim() === '' || state.description.trim() === '' ){
      alert('Enter all values before submitting');
      return;
    }

    //Create project object
    const project = {
      projectName: state.projectName,
      projectIdentifier: state.projectIdentifier,
      start_date: state.startDate,
      end_date: state.endDate,
      description: state.description,
    };

    //Add project to the list
    props.addProject(project);

    //Reset form inputs
    setState({
      projectName: '',
      projectIdentifier: '',
      startDate: '',
      endDate: '',
      description: '',
    });

    //Toggle the AddProject form display
    props.toggleForm();
  };

  //Deals with form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

    return (
      <div className="">
        <div className="card-body">
            {/* AddProject form */}
          <form id="projectForm" noValidate onSubmit={handleAdd}>
            <div className="form-group">
                {/*Project Name textbox and label */}
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                className="form-control"
                id="projectName"
                name="projectName"
                placeholder="Enter project name"
                value={state.projectName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
                {/*Project Identifier textbox and label */}
              <label htmlFor="projectIdentifier">Project Identifier</label>
              <input
                type="text"
                className="form-control"
                id="projectIdentifier"
                name="projectIdentifier"
                placeholder="Enter project identifier"
                value={state.projectIdentifier}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
                {/*Start Time input and label */}
              <label htmlFor="startDate">Start Date and Time</label>
              <input
                type="datetime-local"
                className="form-control"
                id="startDate"
                name="startDate"
                value={state.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
                {/*End Time input and label */}
              <label htmlFor="endDate">End Date and Time</label>
              <input
                type="datetime-local"
                className="form-control"
                id="endDate"
                name="endDate"
                value={state.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
                 {/*Description text area and label */}
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="7"
                cols="75"
                placeholder="Type in project description"
                value={state.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
                 {/*Submit button */}
              <button type="submit" className="button-submit">
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddProject;
