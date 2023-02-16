import React, { useState } from "react";
import Head from "next/head";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { Gap, Header, Title } from "@/components";
import { loginUser } from "@/hooks/useUser";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser({ email, password })
      .then((response) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.user._id);
        localStorage.setItem("name", response.user.name);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 2000,
        });
        router.push("/");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };
  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Login - Generated by create next app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header />
        <Gap />
        <Title title="Login User" />
        <Gap />
        <Row className="justify-content-md-center">
          <Col md={5}>
            {validation.message && (
              <div className="alert alert-danger">{validation.message}</div>
            )}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="success">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
