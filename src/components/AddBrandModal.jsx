import React, { useState } from "react";

const BrandModal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [platforms, setPlatforms] = useState([
    {
      // id: Date.now(),
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
    brandLogo: null,
    brandGuidelines: null,
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
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
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
        // id: Date.now(),
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
    if (!formData.brandGuidelines)
      newErrors.brandGuidelines = "Brand Guidelines PDF is required";

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

    const data = new FormData();
    data.append("brand_name", formData.brandName);
    data.append("brand_company_name", formData.brandCompanyName);
    data.append("website_link", formData.websiteLink);
    data.append("brand_logo", formData.brandLogo);
    data.append("brand_guidelines", formData.brandGuidelines);
    data.append("social_media", JSON.stringify(platforms));

    const accessToken = localStorage.getItem("access_token");
    fetch(`${apiUrl}/v1/brand/profile/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: data, // FormData with file data is sent as-is
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
                className="mt-1 p-2 block w-full border-none rounded-md shadow-sm focus:ring-0"
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
                className="mt-1 p-2 block w-full border-none rounded-md shadow-sm focus:ring-0"
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
                className="mt-1 p-2 block w-full border-none rounded-md shadow-sm focus:ring-0"
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
                name="brandLogo"
                onChange={handleFileChange}
                className="mt-1 p-2 block w-full border-none rounded-md shadow-sm focus:ring-0"
              />
              {formData.brandLogo && (
                <p className="text-blue-500 text-sm">File Selected</p>
              )}
              {errors.brandLogo && (
                <p className="text-red-500 text-xs mt-1">{errors.brandLogo}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Brand Guidelines (PDF)
              </label>
              <input
                type="file"
                name="brandGuidelines"
                accept="application/pdf"
                onChange={handleFileChange}
                className="mt-1 p-2 block w-full border-none rounded-md shadow-sm focus:ring-0"
              />
              {formData.brandGuidelines && (
                <p className="text-blue-500 text-sm">PDF Selected</p>
              )}
              {errors.brandGuidelines && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.brandGuidelines}
                </p>
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
                  className="mt-1 p-2 block w-full border-none rounded-md shadow-sm focus:ring-0"
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
                  className="mt-1 p-2 block w-full border-none rounded-md shadow-sm focus:ring-0"
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
                  type="text"
                  name="password"
                  value={platform.password}
                  onChange={(e) => handlePlatformChange(platform.id, e)}
                  className="mt-1 p-2 block w-full border-none rounded-md shadow-sm focus:ring-0"
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
                  className="mt-1 p-2 block w-full border-none rounded-md shadow-sm focus:ring-0"
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
                  Backup Email
                </label>
                <input
                  type="text"
                  name="backup_email"
                  value={platform.backup_email}
                  onChange={(e) => handlePlatformChange(platform.id, e)}
                  className="mt-1 p-2 block w-full border-none rounded-md shadow-sm focus:ring-0"
                  placeholder="Backup Email"
                />
                {errors[`backup_email_${index}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`backup_email_${index}`]}
                  </p>
                )}
              </div>
              <div className="flex items-end justify-end">
                <button
                  type="button"
                  onClick={() => removePlatform(platform.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addPlatform}
            className="mb-6 inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-xs  rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none"
          >
            Add Platform
          </button>
          <div className="text-right">
            <button
              type="submit"
              className="inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-xs rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
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
