import { gql, useMutation } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useRouter } from "next/navigation";

const query = gql`
  query GetCountries {
    availableCountries {
      name
      code
    }
  }
`;

const mutation = gql`
  mutation setShippingInfo(
    $fullName: String
    $address: String!
    $city: String
    $province: String
    $postalCode: String
    $country: String!
  ) {
    setOrderShippingAddress(
      input: {
        fullName: $fullName
        streetLine1: $address
        city: $city
        province: $province
        postalCode: $postalCode
        countryCode: $country
      }
    ) {
      ... on Order {
        id
      }

      ... on NoActiveOrderError {
        errorCode
        message
      }
    }
  }
`;

function ShippingForm() {
  const router = useRouter();
  const countries = useSuspenseQuery<any>(query);
  const [setShippingInfo, { data, loading, error }] = useMutation(mutation);

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    await setShippingInfo({
      variables: {
        fullName: formJson.name.toString(),
        address: formJson.address.toString(),
        city: formJson.city.toString(),
        province: formJson.province.toString(),
        postalCode: formJson.postalCode.toString(),
        country: formJson.country.toString(),
      },
    });

    if (!loading && error == undefined) {
      console.log("done");
      router.push("/payment");
    }
  };

  return (
    <form onSubmit={onSubmit} id="form" method="post" className="space-y-4">
      <h2 className="text-2xl mb-4 font-semibold">Shipping Information</h2>
      <div>
        <label htmlFor="email">Email</label>
        <div className="input-box">
          <input
            id="email"
            aria-label="email"
            className="border border-black w-full"
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
            className="border border-black w-full"
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
            className="border border-black w-full"
            name="address"
            type="text"
            required
          />
        </div>
      </div>
      <div className="flex flex-row justify-between space-x-4">
        <div className="w-1/2">
          <label htmlFor="city">City</label>
          <div className="input-box">
            <input
              id="city"
              aria-label="city"
              className="border border-black w-full"
              name="city"
              type="text"
              required
            />
          </div>
        </div>
        <div className="w-1/2">
          <label htmlFor="country">Country</label>
          <div className="input-box">
            <select
              id="country"
              className="border border-black w-full"
              name="country"
              defaultValue={countries.data.availableCountries[0].code}
            >
              {countries.data.availableCountries.map((country: any) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between space-x-4">
        <div className="w-1/2">
          <label htmlFor="province">State/Province</label>
          <div className="input-box">
            <input
              id="province"
              aria-label="province"
              className="border border-black w-full"
              name="province"
              type="text"
              required
            />
          </div>
        </div>
        <div className="w-1/2">
          <label htmlFor="postalCode">Postal Code</label>
          <div className="input-box">
            <input
              id="postalCode"
              aria-label="postalCode"
              className="border border-black w-full"
              name="postalCode"
              type="text"
              required
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl my-4 font-semibold">Delivery Method</h2>
        <div className="grid grid-rows-2 gap-4">
          <label
            className="border-gray-300 relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none justify-between"
            htmlFor="shipping1"
          >
            <p>Standard</p>
            <input
              type="radio"
              id="shipping1"
              name="shipping"
              value="standard"
              defaultChecked
              required
            ></input>
          </label>
          <label
            className="border-gray-300 relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none justify-between"
            htmlFor="shipping2"
          >
            <p>Express</p>
            <input
              type="radio"
              id="shipping2"
              name="shipping"
              value="express"
              required
            ></input>
          </label>
        </div>
      </div>
      <hr />
      <button
        type="submit"
        className="border rounded-lg w-full p-4 mt-4 bg-black text-white"
      >
        Proceed to Payment
      </button>
    </form>
  );
}

export default ShippingForm;
