import React, { useState } from "react";

const BrandModal = ({ isOpen, onClose }) => {
  const [platforms, setPlatforms] = useState([
    {
      id: Date.now(),
      platform: "",
      account_id: "",
      password: "",
      phone_no: "",
      backup_email: "",
    },
  ]);
  const [formData, setFormData] = useState({
    brandName: "",
    brandCompanyName: "",
    websiteLink: "",
    brandLogo: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          brandLogo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlatformChange = (id, e) => {
    const { name, value } = e.target;
    setPlatforms((prevPlatforms) =>
      prevPlatforms.map((platform) =>
        platform.id === id ? { ...platform, [name]: value } : platform
      )
    );
  };

  const addPlatform = () => {
    setPlatforms([
      ...platforms,
      {
        id: Date.now(),
        platform: "",
        account_id: "",
        password: "",
        phone_no: "",
        backup_email: "",
      },
    ]);
  };

  const removePlatform = (id) => {
    setPlatforms(platforms.filter((platform) => platform.id !== id));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.brandName) newErrors.brandName = "Brand Name is required";
    if (!formData.brandCompanyName)
      newErrors.brandCompanyName = "Brand Company Name is required";
    if (!formData.websiteLink)
      newErrors.websiteLink = "Website Link is required";
    if (!formData.brandLogo) newErrors.brandLogo = "Logo is required";

    platforms.forEach((platform, index) => {
      if (!platform.platform)
        newErrors[`platform_${index}`] = "Platform is required";
      if (!platform.account_id)
        newErrors[`account_id_${index}`] = "Account ID is required";
      if (!platform.password)
        newErrors[`password_${index}`] = "Password is required";
      if (!platform.phone_no)
        newErrors[`phone_no_${index}`] = "Phone Number is required";
      if (!platform.backup_email)
        newErrors[`backup_email_${index}`] = "Email is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      brand_name: formData.brandName,
      brand_company_name: formData.brandCompanyName,
      website_link: formData.websiteLink,
      brand_logo: formData.brandLogo,
      social_media: platforms,
    };
    const accessToken = localStorage.getItem("access_token");
    fetch("http://192.168.1.38:5000/v1/brand/profile/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        onClose(); // Close the modal after successful submission
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex text-xs items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Add Brand Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 text-left sm:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Brand Name
              </label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Brand Name"
              />
              {errors.brandName && (
                <p className="text-red-500 text-xs mt-1">{errors.brandName}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Brand Company Name
              </label>
              <input
                type="text"
                name="brandCompanyName"
                value={formData.brandCompanyName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Brand Company Name"
              />
              {errors.brandCompanyName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.brandCompanyName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Website Link
              </label>
              <input
                type="text"
                name="websiteLink"
                value={formData.websiteLink}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Website Link"
              />
              {errors.websiteLink && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.websiteLink}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Logo
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
              {formData.brandLogo && (
                <a href={formData.brandLogo} className="text-blue-500 text-sm">
                  View Attachment
                </a>
              )}
              {errors.brandLogo && (
                <p className="text-red-500 text-xs mt-1">{errors.brandLogo}</p>
              )}
            </div>
          </div>
          <h3 className="text-lg font-medium mb-4">Credential</h3>
          {platforms.map((platform, index) => (
            <div
              key={platform.id}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 text-left gap-6 mb-6"
            >
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Social Media Platform
                </label>
                <input
                  type="text"
                  name="platform"
                  value={platform.platform}
                  onChange={(e) => handlePlatformChange(platform.id, e)}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Platform"
                />
                {errors[`platform_${index}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`platform_${index}`]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Account ID
                </label>
                <input
                  type="text"
                  name="account_id"
                  value={platform.account_id}
                  onChange={(e) => handlePlatformChange(platform.id, e)}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Account ID"
                />
                {errors[`account_id_${index}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`account_id_${index}`]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={platform.password}
                  onChange={(e) => handlePlatformChange(platform.id, e)}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Password"
                />
                {errors[`password_${index}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`password_${index}`]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone_no"
                  value={platform.phone_no}
                  onChange={(e) => handlePlatformChange(platform.id, e)}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Phone Number"
                />
                {errors[`phone_no_${index}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`phone_no_${index}`]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="backup_email"
                  value={platform.backup_email}
                  onChange={(e) => handlePlatformChange(platform.id, e)}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Email"
                />
                {errors[`backup_email_${index}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`backup_email_${index}`]}
                  </p>
                )}
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  className="ml-2 mb-2 text-red-500 hover:text-red-700"
                  onClick={() => removePlatform(platform.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7M10 12h4M12 10v4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className="text-center mb-4">
            <button
              type="button"
              onClick={addPlatform}
              className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors duration-300"
            >
              Add Platform
            </button>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded-md shadow-md mr-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandModal;
