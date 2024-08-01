import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

const Platforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [platformName, setPlatformName] = useState("");
  const [platformLogo, setPlatformLogo] = useState(null);
  const [platformLink, setPlatformLink] = useState("");
  const [contentTypes, setContentTypes] = useState([
    { type: "", length: "", width: "" },
  ]);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.38:5000/v1/platform/get",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPlatforms(response.data.data);
      } catch (error) {
        console.error("Error fetching platforms:", error);
      }
    };

    fetchPlatforms();
  }, [accessToken]);

  const handleAddPlatform = async () => {
    const contentTypesWithSize = contentTypes.map((contentType) => ({
      type: contentType.type,
      size: `${contentType.length} x ${contentType.width}`,
    }));

    const platformData = {
      platform_name: platformName,
      platform_logo: platformLogo,
      platform_link: platformLink,
      content_type: contentTypesWithSize,
    };

    try {
      await axios.post(
        "http://192.168.1.38:5000/v1/platform/add",
        platformData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setShowModal(false);
      setPlatformName("");
      setPlatformLogo(null);
      setPlatformLink("");
      setContentTypes([{ type: "", length: "", width: "" }]);
      const response = await axios.get(
        "http://192.168.1.38:5000/v1/platform/get",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPlatforms(response.data.data);
    } catch (error) {
      console.error("Error adding platform:", error);
    }
  };

  const handleContentTypeChange = (index, field, value) => {
    const newContentTypes = [...contentTypes];
    newContentTypes[index][field] = value;
    setContentTypes(newContentTypes);
  };

  const handleAddContentType = () => {
    setContentTypes([...contentTypes, { type: "", length: "", width: "" }]);
  };

  const handleFileUpload = (files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPlatformLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-96 h-72 text-xs bg-white rounded-xl overflow-hidden border border-gray-300 relative">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-sm text-gray-800">Platforms</div>
          <button
            onClick={() => setShowModal(true)}
            className="px-1 py-1 bg-gray-100 text-gray-800 rounded-md"
          >
            + Add Platform
          </button>
        </div>
        <div className="bg-gray-200 p-2 flex justify-between items-center text-xs text-gray-600 mb-2">
          <div className="w-1/4 text-center">LOGO</div>
          <div className="w-1/2 text-left">NAME</div>
          <div className="w-1/4 text-center">LINK</div>
        </div>
        {platforms.map((platform) => (
          <div
            key={platform._id}
            className="flex items-center justify-between border-b border-gray-300 py-2 px-2"
          >
            <img
              className="w-8 h-8 object-cover"
              src={platform.platform_logo}
              alt={`${platform.platform_name} Logo`}
            />
            <div className="text-xs text-gray-800 flex-1 text-center">
              {platform.platform_name}
            </div>
            <a
              href={platform.platform_link}
              className="text-xs text-blue-600 underline"
            >
              {platform.platform_link}
            </a>
          </div>
        ))}
        <div className="absolute right-0 top-0 w-2 h-full bg-gray-300">
          <div className="relative h-24 bg-gray-400 rounded" />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Add New Platform</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Platform Name
              </label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Platform Link
              </label>
              <input
                type="text"
                value={platformLink}
                onChange={(e) => setPlatformLink(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Logo</label>
              <div className="border border-dashed border-gray-400 rounded-md p-4 text-center">
                <div className="text-gray-600">Upload Logo</div>
                <Dropzone onDrop={handleFileUpload}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
            {contentTypes.map((contentType, index) => (
              <div key={index} className="flex items-center mb-4">
                <select
                  className="w-full border border-gray-300 p-2 rounded mr-2"
                  value={contentType.type}
                  onChange={(e) =>
                    handleContentTypeChange(index, "type", e.target.value)
                  }
                >
                  <option value="">Select type</option>
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                </select>
                <input
                  type="text"
                  value={contentType.length}
                  onChange={(e) =>
                    handleContentTypeChange(index, "length", e.target.value)
                  }
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Length"
                />
                <span className="mx-1">x</span>
                <input
                  type="text"
                  value={contentType.width}
                  onChange={(e) =>
                    handleContentTypeChange(index, "width", e.target.value)
                  }
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Width"
                />
              </div>
            ))}
            <button
              onClick={handleAddContentType}
              className="px-2 py-1 bg-blue-500 text-white rounded mb-4"
            >
              + Add More
            </button>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPlatform}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Platform
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Platforms;
