import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
function SignUpPage({handleChange , handleSubmit }) {
    const navigate = useNavigate()
    const handleSignUp = async (e)=>{
        e.preventDefault();
        await handleSubmit();
        navigate('/')
    }
  return (
    <div className="d-flex justify-content-center">
      <div className="col-3">
        <Form
          className="my-4 border p-4 rounded shadow-lg bg-light"
          onSubmit={handleSignUp}
        >
          <div className="mb-3 text-center">
            <h3>Sign Up Agent </h3>
          </div>
          <Form.Group controlId="name">
            <Form.Label>Name : </Form.Label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="name"
              required
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="code">
            <Form.Label>code</Form.Label>
            <input
              type="text"
              name="code"
              className="form-control"
              placeholder="Enter Code"
              required
              onChange={handleChange}
            />
          </Form.Group>

          <div>
            <Button variant="primary" type="submit" className="mt-2">
              Submit
            </Button>
          </div>
          <div className="mt-3">
            <p>already have an Account ? <Link to={'/login'}>Login</Link></p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUpPage;
