function DeliveryMethod() {
  return (
    <div>
      <div className="grid grid-rows-2 gap-4">
        <label
          className="border-gray-300 relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none justify-between"
          htmlFor="shipping1"
        >
          <p>Standard</p>
          <input type="radio" id="shipping1" name="shipping"></input>
        </label>
        <label
          className="border-gray-300 relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none justify-between"
          htmlFor="shipping2"
        >
          <p>Express</p>
          <input type="radio" id="shipping2" name="shipping"></input>
        </label>
      </div>
    </div>
  );
}

export default DeliveryMethod;
