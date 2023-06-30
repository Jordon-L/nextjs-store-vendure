function ShippingForm() {
  return (
    <form id="form" method="post">
      <div>
        <label htmlFor="email">Email</label>
        <div className="input-box">
          <input
            id="email"
            aria-label="email"
            className="border border-black"
            name="email"
            type="text"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <div className="input-box">
          <input
            id="name"
            aria-label="name"
            className="border border-black"
            name="name"
            type="text"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <div className="input-box">
          <input
            id="address"
            aria-label="address"
            className="border border-black"
            name="address"
            type="text"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="city">City</label>
        <div className="input-box">
          <input
            id="city"
            aria-label="city"
            className="border border-black"
            name="city"
            type="text"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <div className="input-box">
          <input
            id="country"
            aria-label="country"
            className="border border-black"
            name="country"
            type="text"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="state">State/Province</label>
        <div className="input-box">
          <input
            id="state"
            aria-label="state"
            className="border border-black"
            name="state"
            type="text"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="postalCode">Postal Code</label>
        <div className="input-box">
          <input
            id="postalCode"
            aria-label="postalCode"
            className="border border-black"
            name="postalCode"
            type="text"
            required
          />
        </div>
      </div>
    </form>
  );
}

export default ShippingForm;
