import React from "react";
import { Button, Table } from "react-bootstrap";
import {
  BsFillPlusCircleFill,
  BsFillDashCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { numberWithCommas } from "@/utils/utils";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { incrementQty, decrementQty, deleteCart } from "@/hooks/useCart";

const ShoppingCart = (props) => {
  const { user, carts, totalPrice } = props;
  const queryClient = useQueryClient();

  const { mutate: mutateIncrement } = useMutation({
    mutationFn: async ({ id, quantity }) => {
      await incrementQty({ id, quantity });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["carts"] });
      await queryClient.invalidateQueries({ queryKey: ["totalItems"] });
      await queryClient.invalidateQueries({ queryKey: ["totalPrice"] });
    },
  });

  const { mutate: mutateDecrement } = useMutation({
    mutationFn: async ({ id, quantity }) => {
      await decrementQty({ id, quantity });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["carts"] });
      await queryClient.invalidateQueries({ queryKey: ["totalItems"] });
      await queryClient.invalidateQueries({ queryKey: ["totalPrice"] });
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async (id) => {
      await deleteCart(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["carts"] });
      await queryClient.invalidateQueries({ queryKey: ["totalItems"] });
      await queryClient.invalidateQueries({ queryKey: ["totalPrice"] });
    },
  });

  const handleIncrement = async (id, quantity) => {
    mutateIncrement({ id, quantity });
  };

  const handleDecrement = async (id, quantity) => {
    if (quantity > 1) {
      mutateDecrement({ id, quantity });
    }
  };

  const handleDelete = async (id) => {
    mutateDelete(id);
  };
  return (
    <div>
      <Table bordered striped>
        <thead>
          <tr>
            <td>
              <p style={{ textAlign: "center" }}>No</p>
            </td>
            <td colSpan={2}>
              <p style={{ textAlign: "center" }}>Product Item</p>
            </td>
            <td>
              <p style={{ textAlign: "center" }}>Quantity</p>
            </td>
            <td>
              <p style={{ textAlign: "center" }}>Subtotal</p>
            </td>
            <td>
              <p style={{ textAlign: "center" }}>Action</p>
            </td>
          </tr>
        </thead>
        <tbody>
          {carts?.map((cart, index) => (
            <>
              <tr key={cart._id}>
                <td style={{ verticalAlign: "middle" }}>
                  <p style={{ textAlign: "center" }}>{index + 1}</p>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <center>
                    <img
                      src={cart.product.imageUrl}
                      style={{ width: "100px" }}
                      alt={cart.product.name}
                    />
                  </center>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <p style={{ textAlign: "center" }}>{cart.product.name}</p>
                  <p style={{ textAlign: "center" }}>
                    Rp {numberWithCommas(cart.product.price)}
                  </p>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <center>
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          handleIncrement(cart._id, cart.quantity);
                        }}
                      >
                        <BsFillPlusCircleFill size={20} />
                      </button>
                      <button type="button" className="btn btn-secondary">
                        {cart.quantity}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          handleDecrement(cart._id, cart.quantity);
                        }}
                      >
                        <BsFillDashCircleFill size={20} />
                      </button>
                    </div>
                  </center>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <p style={{ textAlign: "center" }}>
                    Rp {numberWithCommas(cart.product.price * cart.quantity)}
                  </p>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <center>
                    <Button
                      variant="danger"
                      size="sm"
                      title="Delete"
                      onClick={() => {
                        handleDelete(cart._id);
                      }}
                    >
                      <BsFillTrashFill />
                    </Button>
                  </center>
                </td>
              </tr>
            </>
          ))}

          <tr>
            <td colSpan={4}>
              <p style={{ textAlign: "center" }}>Total</p>
            </td>
            <td colSpan={2}>
              <p style={{ textAlign: "center" }}>
                Rp {numberWithCommas(parseInt(totalPrice))}
              </p>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ShoppingCart;
