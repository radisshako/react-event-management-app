import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';

// Component that renders the list of projects
const ProjectList = (props) => {
  return (
    <div className="project-list">
      {props.projects.map((project) => (
        <div className="project" key={project.projectIdentifier}>
          {/*Delete button */}
          <div className="delete-button" onClick={() => props.deleteProject(project)}>
            <FaTimes />
          </div>
          {/*Project details */}
          <div className="project-details">
            <h2>{project.projectName}</h2>
            <p>
              Start Date:{' '}
              {/*Format start date */}
              <Moment date={project.start_date} parse="YYYY-MM-DD HH:mm" format="MMM D h:mma" />
            </p>
            <p>
              End Date:{' '}
              {/*Format end date */}
              <Moment date={project.end_date} parse="YYYY-MM-DD HH:mm" format="MMM D h:mma" />
            </p>
            <p className="project-description">
              {project.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;


