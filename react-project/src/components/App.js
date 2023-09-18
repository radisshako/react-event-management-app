import React, { useState, useEffect } from 'react';
import ProjectList from './ProjectList';
import AddProject from './AddProject';
import '../css/App.css';
import{ without } from 'lodash'

const App = () => {
  //Contains the list of projects
  const [myProjects, setMyProjects] = useState([]); 
  //Manages the visibility of the AddProject form
  const [formDisplay, setFormDisplay] = useState(false);
  //Maintains the selected sort option
  const [sortOption, setSortOption] = useState('projectNameAsc'); 
  //The search term entered
  const [searchTerm, setSearchTerm] = useState(''); 

  //Toggles the display of the AddProject form
  const toggleForm = () => {
    setFormDisplay((prevDisplay) => !prevDisplay);
  };

  //Adds a new project to the list
  const addProject = (project) => {
    project.projectIdentifier = myProjects.length + 1;
    setMyProjects((prevProjects) => [project, ...prevProjects]);
  };

  //Deletes a project from the list
  const deleteProject = (proj) => {
    const tempProjs = without(myProjects, proj);
    setMyProjects(tempProjs);
 };


  //Deals with the change of the sort option
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  //Deals with the change of the search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  //Fetches the project data from data.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./data.json');
        const data = await response.json();
        setMyProjects(data);
      } catch (error) {
        console.error('There was an error with fetching the json:', error);
      }
    };

    fetchData();
  }, []);

  //Sorts the projects based on the selected sort option
  const sortedProjects = myProjects.sort((a, b) => {
    if (sortOption === 'projectNameAsc'){
      return a.projectName.localeCompare(b.projectName);
    } 
    else if(sortOption === 'projectNameDesc'){
      return b.projectName.localeCompare(a.projectName);
    } 
    else if(sortOption === 'startDateAsc'){
      return new Date(a.start_date) - new Date(b.start_date);
    } 
    else if(sortOption === 'startDateDesc'){
      return new Date(b.start_date) - new Date(a.start_date);
    }
    else{
      return 0;
    }
  });

  //Filters the projects based on the search term
  const filteredProjects = sortedProjects.filter((project) =>
    project.projectName.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <main className="page" id="project-list">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              {/*AddProject form */}
              {formDisplay && <AddProject addProject={addProject} toggleForm={toggleForm} />}
              {/*Page Heading*/}
              <h1>Projects</h1>

              {/*Dropdown menu for sorting */}
              <select className="form" value={sortOption} onChange={handleSortChange}>
                <option value="projectNameAsc">Project Name Ascending</option>
                <option value="projectNameDesc">Project Name Descending</option>
                <option value="startDateAsc">Start Date Ascending</option>
                <option value="startDateDesc">Start Date Descending</option>
              </select>

              {/*Search bar */}
              <input
                type="text"
                placeholder="Search project by name"
                value={searchTerm}
                onChange={handleSearch}
              />

              {/*Button to toggle the AddProject form */}
              <button className="button" id="create_button" onClick={toggleForm}>
                Create New Project
              </button>

              {/*Generate the list of projects */}
              <ProjectList projects={filteredProjects} deleteProject={deleteProject} onClick={toggleForm} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;