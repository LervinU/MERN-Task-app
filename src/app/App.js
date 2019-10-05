import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      tasks: [],
      _id: ""
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  addTask(e) {
    e.preventDefault();
    if (this.state._id) {
      fetch(`/api/task/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          M.toast({ html: "Task Updated" });
          this.setState({
            title: "",
            description: "",
            _id: ""
          });
          this.fetchTask();
        });
    } else {
      fetch("/api/task", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          M.toast({ html: "Task Saved" });
          this.setState({ title: "", description: "" });
          this.fetchTask();
        })
        .catch(err => console.error(err));
    }
  }
  componentDidMount() {
    this.fetchTask();
  }
  fetchTask() {
    fetch("/api/task")
      .then(res => res.json())
      .then(json => {
        this.setState({ tasks: json });
        console.log(this.state.tasks);
      });
  }

  deleteTask(id) {
    if (confirm("Are you sure you want to delete the Task?")) {
      fetch(`/api/task/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          M.toast({ html: "Task Deleted" });
          this.fetchTask();
        });
    }
  }

  editTask(id) {
    fetch(`/api/task/${id}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          title: json.title,
          description: json.description,
          _id: json._id
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <div>
        {/*NAVIGATION*/}
        <nav className="light-blue darken-4">
          <div className="container">
            <a href="/" className="brand-logo">
              MERN Stack 2
            </a>
          </div>
        </nav>
        <div className="container mt-2">
          <div className="row">
            <div className="col s5">
              <h4>Add Task!</h4>
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          type="text"
                          placeholder="Task Title"
                          value={this.state.title}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          name="description"
                          placeholder="Task description"
                          className="materialize-textarea"
                          value={this.state.description}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <h4>Your tasks!</h4>
              <table className="striped">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map(task => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button
                            className="btn light-blue darken-4"
                            onClick={() => {
                              this.deleteTask(task._id);
                            }}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                          <button
                            onClick={() => this.editTask(task._id)}
                            className="btn light-blue darken-4"
                            style={{ margin: "4px" }}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
