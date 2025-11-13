import React from "react";
import { Table, Button, Card } from "react-bootstrap";

const TaskListView = ({ tasks, deleteTask }) => {
  return (
    <>
      <h2>My Tasks</h2>
      {tasks.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Card body>No tasks to show. Add one!</Card>
      )}
    </>
  );
};

export default TaskListView;