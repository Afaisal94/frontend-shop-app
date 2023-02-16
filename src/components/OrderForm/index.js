import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { BsArrowRightCircle } from "react-icons/bs";
import { createOrder } from "@/hooks/useOrder";
import { deleteCartByUserId } from "@/hooks/useCart";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const OrderForm = (props) => {
  const { user, carts, totalPrice } = props;
  const router = useRouter();
  const [recipient, setRecipient] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [note, setNote] = useState("");

  const handleOrder = (event) => {
    const status = "Waiting Payment";
    event.preventDefault();
    createOrder({
      user,
      status,
      recipient,
      totalPrice,
      deliveryAddress,
      carts,
      note,
    })
      .then((response) => {
        deleteCartByUserId(user);
        Swal.fire({
          icon: "success",
          title: "Your Order Created Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        router.push("/order");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Card>
        <Card.Header>
          <h3>Order Form</h3>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <Form onSubmit={handleOrder}>
              <Form.Group className="mb-3">
                <Form.Label>Recipient's Name</Form.Label>
                <Form.Control
                  type="text"
                  name="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Delivery Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  style={{ height: "80px" }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  name="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{ height: "80px" }}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Order Now <BsArrowRightCircle size={20} />
                </Button>
              </div>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderForm;
