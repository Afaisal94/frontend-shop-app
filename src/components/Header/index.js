import React, { useState, useEffect } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { BsCart } from "react-icons/bs";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getTotalItems } from "@/hooks/useCart";

function Header() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("name");
    const userId = localStorage.getItem("userId");
    if (token) {
      setIsLogin(true);
      setUsername(username);
      setUser(userId);
    }
  }, []);

  const { data: totalItems } = useQuery({
    queryKey: ["totalItems", { user }],
    queryFn: async () => await getTotalItems(user),
  });

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    setIsLogin(false);
    Swal.fire({
      icon: "success",
      title: "Logout Successful",
      showConfirmButton: false,
      timer: 1500,
    });
    router.push("/");
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          >
            Next Shop
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text style={{ marginRight: "30px" }}>
              <Button variant="default" onClick={() => router.push("/cart")}>
                <span className="badge bg-secondary rounded-pill">
                  {totalItems}
                </span>{" "}
                <BsCart color="white" size={25} />
              </Button>
            </Navbar.Text>

            {isLogin ? (
              <>
                {/* if Authenticated */}
                <Navbar.Text className="m-2">
                  Signed in as : {username}
                </Navbar.Text>
                <Button
                  variant="success"
                  size="sm"
                  className="m-1"
                  onClick={() => router.push("/order")}
                >
                  My Order
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="m-1"
                  onClick={() => {
                    logoutUser();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* if Not Authenticated */}
                <Navbar.Text>
                  <Button
                    variant="primary"
                    size="sm"
                    className="m-1"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="m-1"
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </Button>
                </Navbar.Text>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
