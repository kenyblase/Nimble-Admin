import { ArrowLeft, Edit, Plus, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useGetAllCategories } from '../../utils/useApis/useCategoryApis/useGetCategories';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useCreateCategory } from '../../utils/useApis/useCategoryApis/useCreateCategory';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
  const [selectedParentCategory, setSelectedParentCategory] = useState('');
  const [name, setName] = useState('');
  const [commissionPercentage, setCommissionPercentage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [editingAttribute, setEditingAttribute] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newAttributeName, setNewAttributeName] = useState('');
  const [newAttributeValues, setNewAttributeValues] = useState([]);
  const [newValueInput, setNewValueInput] = useState('');
  const [editValueInput, setEditValueInput] = useState('');

  const {data:categories, isLoading, error} = useGetAllCategories()
  const {createCategory, isCreating} = useCreateCategory()

  const navigate = useNavigate()

  // IMAGE
  const handleImageChange = (e) => {
  const file = e.target.files[0];
    if (file) {
      setSelectedImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const removeImage = () => setSelectedImage(null);

  // TAGS
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const raw = inputValue
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      if (raw.length === 0) return;

      const existingLower = new Set(tags.map((t) => t.toLowerCase()));
      const seen = new Set();
      const toAdd = [];

      for (const t of raw) {
        const key = t.toLowerCase();
        if (!existingLower.has(key) && !seen.has(key)) {
          seen.add(key);
          toAdd.push(t);
        }
      }

      if (toAdd.length > 0) {
        setTags((prev) => [...prev, ...toAdd]);
      }

      setInputValue("");
    }
  };

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

  // ADD MODAL - Handle attribute values
  const handleAddValue = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const raw = newValueInput
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v.length > 0);
      if (raw.length === 0) {
        setNewValueInput("");
        return;
      }

      const existingLower = new Set(newAttributeValues.map((v) => v.toLowerCase()));
      const seen = new Set();
      const toAdd = [];

      for (const v of raw) {
        const key = v.toLowerCase();
        if (!existingLower.has(key) && !seen.has(key)) {
          seen.add(key);
          toAdd.push(v);
        }
      }

      if (toAdd.length > 0) {
        setNewAttributeValues((prev) => [...prev, ...toAdd]);
      }

      setNewValueInput("");
    }
  };

  const removeValue = (val) =>
    setNewAttributeValues(newAttributeValues.filter((v) => v !== val));

  const handleAddAttribute = () => {
    if (newAttributeName.trim()) {
      setAttributes((prev) => [
        ...prev,
        { name: newAttributeName.trim(), values: newAttributeValues },
      ]);
      setNewAttributeName('');
      setNewAttributeValues([]);
      setNewValueInput('');
      setIsAddModalOpen(false);
    }
  };

  // EDIT MODAL LOGIC
  const handleEditValueKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const raw = editValueInput
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v.length > 0);

      if (raw.length === 0) return;

      const existingLower = new Set(editingAttribute.values.map((v) => v.toLowerCase()));
      const seen = new Set();
      const toAdd = [];

      for (const v of raw) {
        const key = v.toLowerCase();
        if (!existingLower.has(key) && !seen.has(key)) {
          seen.add(key);
          toAdd.push(v);
        }
      }

      if (toAdd.length > 0) {
        setEditingAttribute((prev) => ({
          ...prev,
          values: [...prev.values, ...toAdd],
        }));
      }

      setEditValueInput("");
    }
  };

  const handleRemoveEditValue = (val) => {
    setEditingAttribute((prev) => ({
      ...prev,
      values: prev.values.filter((v) => v !== val),
    }));
  };

  const handleSaveEditedAttribute = () => {
    setAttributes((prev) =>
      prev.map((attr) =>
        attr.name === editingAttribute?.originalName
          ? { name: editingAttribute.name, values: editingAttribute.values }
          : attr
      )
    );
    setEditingAttribute(null);
    setIsEditModalOpen(false);
  };

  const removeAttribute = (name) =>
    setAttributes(attributes.filter((attr) => attr.name !== name));

 const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name || !commissionPercentage || !selectedImage.file) return toast.error('Fill in all required fields')

    const formData = new FormData();
    formData.append("name", name);
    if (selectedParentCategory) formData.append("parentCategory", selectedParentCategory || null);
    formData.append("commissionPercentage", commissionPercentage);
    formData.append("tags", JSON.stringify(tags));
    formData.append("attributes", JSON.stringify(attributes));
    if (selectedImage?.file) formData.append("image", selectedImage.file);

    await createCategory(formData)
    navigate('/categories')
  };

  if(isLoading) return <LoadingSpinner/>

  if(error) return <p className='text-red-500'>Error Fetching Categories</p>

  return (
    <div className="mt-[29px] mb-5 flex flex-col gap-8">
      <div className="flex gap-2 items-center">
        <ArrowLeft size={32} color="#FE7A36" />
        <h1 className="text-2xl font-bold text-[#202224]">Create category</h1>
      </div>

      {/* CATEGORY + NAME */}
      <div className="flex gap-6 items-center">
        <div className="w-full flex flex-col gap-4">
          <p className="text-base font-normal text-[#000000]">Parent Category</p>
          <select
            value={selectedParentCategory}
            onChange={(e) => setSelectedParentCategory(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex flex-col gap-4">
          <p className="text-base font-normal text-[#000000]">Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* COMMISSION */}
      <div className="w-full flex flex-col gap-4">
        <p className="text-base font-normal text-[#000000]">Commission(%)</p>
        <input
          type="number"
          value={commissionPercentage}
          onChange={(e) => setCommissionPercentage(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* IMAGE */}
      <div className="w-full flex flex-col gap-4">
        <p className="text-base font-normal text-[#000000]">Image</p>
        {!selectedImage?.preview ? (
          <label
            htmlFor="imageUpload"
            className="flex items-center justify-center size-20 bg-[#F5F5F5] border border-[#D3D3D3] rounded-sm cursor-pointer hover:bg-gray-100 transition"
          >
            <Plus size={24} color="#000000" />
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="relative size-20">
            <img
              src={selectedImage.preview}
              alt="Selected"
              className="w-full h-full object-cover rounded-sm border border-[#D3D3D3]"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-white text-gray-700 border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-500 hover:text-white transition"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* TAGS */}
      <div className="w-full flex flex-col gap-4">
        <h3 className="font-semibold text-gray-700 mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a tag and press Enter"
          className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <p className="text-[10px] text-[#000000]">
          Separate values with comma and press “enter” on your keyboard
        </p>
      </div>

      {/* ATTRIBUTES */}
      <div className="w-full flex flex-col gap-4">
        <h3 className="font-semibold text-gray-700 mb-2">Attributes</h3>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {attributes.map((attr, index) => (
            <div
              key={index}
              className="flex justify-between items-center rounded-md px-4 py-2 bg-[#00000008]"
            >
              <span className="text-gray-700 text-sm font-medium">
                {attr.name}
              </span>
              <div className="flex items-center gap-6">
                <Edit
                  onClick={() => {
                    setEditingAttribute({ ...attr, originalName: attr.name });
                    setIsEditModalOpen(true);
                  }}
                  color="#000000"
                  size={16}
                  className="cursor-pointer"
                />
                <Trash2
                  onClick={() => removeAttribute(attr.name)}
                  color="#EF4444"
                  size={16}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="text-blue-600 text-sm font-medium flex items-center gap-1"
        >
          <div className="size-3.5 bg-[#3652AD] rounded-full flex items-center justify-center">
            <Plus size={12} color="#FFFFFF" />
          </div>
          <p className="text-[#3652AD] text-base">Add new attribute</p>
        </button>
      </div>

       <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleSubmit}
            className="px-10 h-14 text-sm rounded-full bg-[#3652AD] text-white hover:bg-blue-700"
          >
            {isCreating ? <LoadingSpinner size='size-6'/> : 
            <p className="font-medium text-base text-[#FEFEFF]">
              Save Category
            </p>}
          </button>
        </div>

      {/* ADD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white flex flex-col px-12 py-8 gap-10 rounded-lg w-[720px] shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl text-[#000000] font-bold mb-4">
                New Attribute
              </h3>
              <X
                className="cursor-pointer"
                onClick={() => setIsAddModalOpen(false)}
                size={24}
                color="#DC2626"
              />
            </div>

            {/* Name */}
            <div className="w-full flex flex-col gap-4">
              <h3 className="font-semibold text-gray-700 mb-2">Name</h3>
              <input
                type="text"
                value={newAttributeName}
                onChange={(e) => setNewAttributeName(e.target.value)}
                placeholder="Enter attribute name"
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Values */}
            <div className="w-full flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">
                Values
              </label>
              <div className="flex flex-wrap gap-2">
                {newAttributeValues.map((val, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-sm"
                  >
                    {val}
                    <button
                      onClick={() => removeValue(val)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={newValueInput}
                onChange={(e) => setNewValueInput(e.target.value)}
                onKeyDown={handleAddValue}
                placeholder="Type a value and press Enter"
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-[10px] text-[#000000]">
                Separate values with comma and press “enter” on your keyboard
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleAddAttribute}
                className="px-10 h-14 text-sm rounded-full bg-[#3652AD] text-white hover:bg-blue-700"
              >
                <p className="font-medium text-base text-[#FEFEFF]">
                  Save attribute
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditModalOpen && editingAttribute && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white flex flex-col px-12 py-8 gap-10 rounded-lg w-[720px] shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl text-[#000000] font-bold mb-4">
                Edit Attribute
              </h3>
              <X
                className="cursor-pointer"
                onClick={() => {
                  setEditingAttribute(null);
                  setIsEditModalOpen(false);
                }}
                size={24}
                color="#DC2626"
              />
            </div>

            {/* Name */}
            <div className="w-full flex flex-col gap-4">
              <h3 className="font-semibold text-gray-700 mb-2">Name</h3>
              <input
                type="text"
                value={editingAttribute.name}
                onChange={(e) =>
                  setEditingAttribute((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Enter attribute name"
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Values */}
            <div className="w-full flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">
                Values
              </label>
              <div className="flex flex-wrap gap-2">
                {editingAttribute.values.map((val, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-sm"
                  >
                    {val}
                    <button
                      onClick={() => handleRemoveEditValue(val)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={editValueInput}
                onChange={(e) => setEditValueInput(e.target.value)}
                onKeyDown={handleEditValueKeyDown}
                placeholder="Type a value and press Enter"
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-[10px] text-[#000000]">
                Separate values with comma and press “enter” on your keyboard
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleSaveEditedAttribute}
                className="px-10 h-14 text-sm rounded-full bg-[#3652AD] text-white hover:bg-blue-700"
              >
                <p className="font-medium text-base text-[#FEFEFF]">
                  Save attribute
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;