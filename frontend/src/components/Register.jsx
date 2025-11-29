import React, { useState, useRef } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'danger'
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage("Please select an image");
      setMessageType("danger");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/product/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage("Product created successfully!");
      setMessageType("success");
      setName("");
      setPrice("");
      setImage(null);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong");
      setMessageType("danger");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center py-4">
              <h2 className="mb-0">
                <i className="bi bi-box-seam me-2"></i>
                Create New Product
              </h2>
            </div>
            <div className="card-body p-4">
              {message && (
                <div
                  className={`alert alert-${messageType} alert-dismissible fade show d-flex align-items-center`}
                  role="alert"
                >
                  <i
                    className={`bi ${
                      messageType === "success"
                        ? "bi-check-circle-fill"
                        : "bi-exclamation-triangle-fill"
                    } me-2`}
                  ></i>
                  <div>{message}</div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setMessage("");
                      setMessageType("");
                    }}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="productName"
                    className="form-label fw-semibold"
                  >
                    <i className="bi bi-tag me-2 text-primary"></i>
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="productName"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="productPrice"
                    className="form-label fw-semibold"
                  >
                    <i className="bi bi-currency-rupee me-2 text-primary"></i>
                    Price
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-currency-rupee"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="productPrice"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="productImage"
                    className="form-label fw-semibold"
                  >
                    <i className="bi bi-image me-2 text-primary"></i>
                    Product Image
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    id="productImage"
                    name="image"
                    accept="image/png, image/jpeg, image/jpg"
                    ref={fileInputRef}
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                  <div className="form-text">
                    <i className="bi bi-info-circle me-1"></i>
                    Supported formats: PNG, JPEG, JPG
                  </div>
                  {image && (
                    <div className="mt-2">
                      <small className="text-muted">
                        <i className="bi bi-check-circle text-success me-1"></i>
                        Selected: {image.name}
                      </small>
                    </div>
                  )}
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-circle me-2"></i>
                        Create Product
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer bg-light text-center py-3">
              <small className="text-muted">
                <i className="bi bi-cloud-upload me-1"></i>
                Powered by Cloudinary
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
