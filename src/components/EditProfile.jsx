import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    brandName: "",
    brandCompanyName: "",
    websiteLink: "",
    brandLogo: "",
    socialMedia: [
      {
        // id: Date.now(),
        platform: "",
        account_id: "",
        password: "",
        phone_no: "",
        backup_email: "",
      },
    ],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get(
          `http://192.168.1.38:5000/v1/brand/profile/get/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = response.data.data;
        setProfileData({
          brandName: data.brand_name,
          brandCompanyName: data.brand_company_name,
          websiteLink: data.website_link,
          brandLogo: data.brand_logo,
          socialMedia: data.social_media.map((media) => ({
            platform: media.platform,
            account_id: media.account_id,
            password: media.password,
            phone_no: media.phone_no,
            backup_email: media.backup_email,
          })),
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          brandLogo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialMediaChange = (index, e) => {
    const { name, value } = e.target;
    setProfileData((prev) => {
      const updatedSocialMedia = [...prev.socialMedia];
      updatedSocialMedia[index] = {
        ...updatedSocialMedia[index],
        [name]: value,
      };
      return { ...prev, socialMedia: updatedSocialMedia };
    });
  };

  const addSocialMedia = () => {
    setProfileData((prev) => ({
      ...prev,
      socialMedia: [
        ...prev.socialMedia,
        {
          platform: "",
          account_id: "",
          password: "",
          phone_no: "",
          backup_email: "",
        },
      ],
    }));
  };

  const removeSocialMedia = (index) => {
    setProfileData((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!profileData.brandName) newErrors.brandName = "Brand Name is required";
    if (!profileData.brandCompanyName)
      newErrors.brandCompanyName = "Brand Company Name is required";
    if (!profileData.websiteLink)
      newErrors.websiteLink = "Website Link is required";
    if (!profileData.brandLogo) newErrors.brandLogo = "Logo is required";

    profileData.socialMedia.forEach((media, index) => {
      if (!media.platform)
        newErrors[`platform_${index}`] = "Platform is required";
      if (!media.account_id)
        newErrors[`account_id_${index}`] = "Account ID is required";
      if (!media.password)
        newErrors[`password_${index}`] = "Password is required";
      if (!media.phone_no)
        newErrors[`phone_no_${index}`] = "Phone Number is required";
      if (!media.backup_email)
        newErrors[`backup_email_${index}`] = "Email is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const accessToken = localStorage.getItem("access_token");
      const data = {
        brand_name: profileData.brandName,
        brand_company_name: profileData.brandCompanyName,
        website_link: profileData.websiteLink,
        brand_logo: profileData.brandLogo,
        social_media: profileData.socialMedia,
      };
      await axios.put(
        `http://192.168.1.38:5000/v1/brand/profile/edit/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      navigate(`/brand/${id}`); // Navigate back to the brand detail page after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen min-w-screen text-xs pl-8 pt-4">
      <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">
        ← Back
      </button>
      <h1 className="text-2xl font-semibold mb-6">Edit Brand Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-700">
              Brand Name
            </label>
            <input
              type="text"
              name="brandName"
              value={profileData.brandName}
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
              value={profileData.brandCompanyName}
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
              value={profileData.websiteLink}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Website Link"
            />
            {errors.websiteLink && (
              <p className="text-red-500 text-xs mt-1">{errors.websiteLink}</p>
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
            {profileData.brandLogo && (
              <a href={profileData.brandLogo} className="text-blue-500 text-sm">
                View Attachment
              </a>
            )}
            {errors.brandLogo && (
              <p className="text-red-500 text-xs mt-1">{errors.brandLogo}</p>
            )}
          </div>
        </div>
        <h3 className="text-lg font-medium mb-4">Social Media Credentials</h3>
        {profileData.socialMedia.map((media, index) => (
          <div
            key={media.id}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 text-left gap-6 mb-6"
          >
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Social Media Platform
              </label>
              <input
                type="text"
                name="platform"
                value={media.platform}
                onChange={(e) => handleSocialMediaChange(index, e)}
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
                value={media.account_id}
                onChange={(e) => handleSocialMediaChange(index, e)}
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
                value={media.password}
                onChange={(e) => handleSocialMediaChange(index, e)}
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
                value={media.phone_no}
                onChange={(e) => handleSocialMediaChange(index, e)}
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
                value={media.backup_email}
                onChange={(e) => handleSocialMediaChange(index, e)}
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
                onClick={() => removeSocialMedia(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <div className="text-center mb-4">
          <button
            type="button"
            onClick={addSocialMedia}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors duration-300"
          >
            Add Platform
          </button>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
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
  );
};

export default EditProfile;
