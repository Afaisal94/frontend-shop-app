import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { numberWithCommas } from "@/utils/utils";
import { addToCart, checkCart, updateCart } from "@/hooks/useCart";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Content = (props) => {
  const queryClient = useQueryClient();
  const { products } = props;
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token) {
      setIsLogin(true);
      setUser(userId);
    }
  }, []);

  const { mutate: mutateUpdateCart } = useMutation({
    mutationFn: async ({ id, quantity }) => {
      await updateCart({ id, quantity });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["totalItems"] });
    },
  });

  const { mutate: mutateAddToCart } = useMutation({
    mutationFn: async ({ user, product }) => {
      await addToCart({ user, product });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["totalItems"] });
    },
  });

  const handleAddToCart = async (user, product) => {
    checkCart(user, product)
      .then((response) => {
        if (response.length !== 0) {
          console.log("Sudah Ada di Cart");
          const id = response[0]._id;
          const quantity = parseInt(response[0].quantity) + 1;
          mutateUpdateCart({ id, quantity });
          Swal.fire({
            icon: "success",
            title: "Add to Cart Successful",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          console.log("Belum Ada di Cart");
          mutateAddToCart({ user, product });
          Swal.fire({
            icon: "success",
            title: "Add to Cart Successful",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleLock = () => {
    Swal.fire({
      icon: "warning",
      title: "Login first before adding to cart ",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products?.map((product) => (
          <div className="col" key={product._id}>
            <div className="card h-100">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body" style={{ textAlign: "center" }}>
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  Rp {numberWithCommas(product.price)}
                </p>
                {isLogin ? (
                  <Button
                    className="btn-sm"
                    onClick={() => {
                      handleAddToCart(user, product._id);
                    }}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    className="btn-sm"
                    onClick={() => {
                      handleLock();
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
