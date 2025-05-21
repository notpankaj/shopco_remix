import { useNavigate, useParams } from "@remix-run/react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "~/components/app-components/Navbar";
import OfferAds from "~/components/app-components/OfferAds";
import { AppDispatch, RootState } from "~/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "~/api";

// Address interface
interface Address {
  address: string;
  phone: string;
  name: string;
  city: string;
  state: string;
  pincode: string;
  locality: string;
  landmark?: string;
  alternatePhone?: string;
  type: "Home" | "Work";
}

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be a valid 10-digit phone number")
    .required("Phone number is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Must be a valid 6-digit pincode")
    .required("Pincode is required"),
  locality: Yup.string().required("Locality is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  landmark: Yup.string().optional(),
  alternatePhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be a valid 10-digit phone number")
    .optional(),
  type: Yup.string()
    .oneOf(["Home", "Work"])
    .required("Address type is required"),
});

type Params = { addressId: string };

export default function Addresses() {
  const { addressId } = useParams() as Params;
  const isEdit = addressId !== "create";
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((s: RootState) => s.auth.user);
  const token = useSelector((s: RootState) => s.auth.token);

  // Initial form state
  const initialFormState: Address = {
    address: "",
    phone: "",
    name: "",
    city: "",
    state: "",
    pincode: "",
    locality: "",
    landmark: "",
    alternatePhone: "",
    type: "Home",
  };

  // Fetch address data for edit mode
  useEffect(() => {
    if (isEdit) {
      const fetchAddress = async () => {
        try {
          const response = await axios.get(`/api/v1/address/${addressId}`);
          // Set form data with response.data
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      };
      fetchAddress();
    }
  }, [addressId, isEdit]);

  const handleSubmit = async (
    values: Address,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      if (isEdit) {
        // Update address
        await axios.put(`${BASE_URL}/api/v1/address/${addressId}`, values);
      } else {
        // Add new address
        await axios.post(`${BASE_URL}/api/v1/address`, values, {
          headers: {
            Authorization: token,
          },
        });
      }
      resetForm();
      navigate("/addresses");
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/addresses");
  };

  if (user === null) {
    return <h1 className="heading text-[22px]">Loading...</h1>;
  }

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <OfferAds />
      <Navbar />
      <div className="flex flex-col gap-[20px] items-center justify-between">
        <h1>{isEdit ? "Update" : "Add"} Address</h1>
        <div className="flex flex-col justify-center relative">
          <div className="w-[500px] mx-auto p-4">
            <div className="bg-white p-6 rounded-lg">
              <Formik
                initialValues={initialFormState}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Name</label>
                      <Field
                        as={Input}
                        name="name"
                        placeholder="Name"
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">
                        10-digit mobile number
                      </label>
                      <Field
                        as={Input}
                        name="phone"
                        placeholder="Phone Number"
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Pincode</label>
                      <Field
                        as={Input}
                        name="pincode"
                        placeholder="Pincode"
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="pincode"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Locality</label>
                      <Field
                        as={Input}
                        name="locality"
                        placeholder="Locality"
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="locality"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="text-sm text-gray-600">
                        Address (Area and Street)
                      </label>
                      <Field
                        as={Input}
                        name="address"
                        placeholder="Address"
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">
                        City/District/Town
                      </label>
                      <Field
                        as={Input}
                        name="city"
                        placeholder="City"
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">State</label>
                      <Select
                        onValueChange={(value) => setFieldValue("state", value)}
                        value={values.state}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Chandigarh">Chandigarh</SelectItem>
                          <SelectItem value="Punjab">Punjab</SelectItem>
                          <SelectItem value="Haryana">Haryana</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">
                        Landmark (Optional)
                      </label>
                      <Field
                        as={Input}
                        name="landmark"
                        placeholder="Landmark"
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="landmark"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">
                        Alternate Phone (Optional)
                      </label>
                      <Field
                        as={Input}
                        name="alternatePhone"
                        placeholder="Alternate Phone"
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="alternatePhone"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="text-sm text-gray-600">
                        Address Type
                      </label>
                      <div className="flex space-x-4 mt-1 gap-[10px]">
                        <label className="flex items-center">
                          <Field
                            type="radio"
                            name="type"
                            value="Home"
                            className="mr-2"
                          />
                          Home
                        </label>
                        <label className="flex items-center">
                          <Field
                            type="radio"
                            name="type"
                            value="Work"
                            className="mr-2"
                          />
                          Work
                        </label>
                      </div>
                      <ErrorMessage
                        name="type"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="mt-6 flex space-x-4 col-span-1 md:col-span-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="mx-auto"
                      >
                        {isSubmitting ? "Saving..." : "Save Address"}
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCancel}
                        variant="outline"
                        className="mx-auto"
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
