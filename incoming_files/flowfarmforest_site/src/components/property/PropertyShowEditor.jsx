import React, { useState } from 'react';
import { Edit2, Save, X, Upload } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function PropertyShowEditor({ data, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(JSON.parse(JSON.stringify(data)));
  const [uploading, setUploading] = useState(false);

  const handleRoomChange = (roomId, field, value) => {
    setEditData((prev) => ({
      ...prev,
      residence: {
        ...prev.residence,
        rooms: prev.residence.rooms.map((room) =>
        room.id === roomId ? { ...room, [field]: value } : room
        )
      }
    }));
  };

  const handleImageChange = (roomId, imageIndex, field, value) => {
    setEditData((prev) => ({
      ...prev,
      residence: {
        ...prev.residence,
        rooms: prev.residence.rooms.map((room) =>
        room.id === roomId ?
        {
          ...room,
          gallery: room.gallery.map((img, idx) =>
          idx === imageIndex ? { ...img, [field]: value } : img
          )
        } :
        room
        )
      }
    }));
  };

  const handleMainHouseImageChange = (imageIndex, field, value) => {
    setEditData((prev) => ({
      ...prev,
      mainHouse: {
        ...prev.mainHouse,
        featured: {
          ...prev.mainHouse.featured,
          images: prev.mainHouse.featured.images.map((img, idx) =>
          idx === imageIndex ? { ...img, [field]: value } : img
          )
        }
      }
    }));
  };

  const handleImageUpload = async (file, roomId, imageIndex, isMainHouse = false) => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await base44.integrations.Core.UploadFile(formData);
      if (isMainHouse) {
        handleMainHouseImageChange(imageIndex, 'src', response.file_url);
      } else {
        handleImageChange(roomId, imageIndex, 'src', response.file_url);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + (error.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
  };

  const handleDrop = (e, roomId, imageIndex, isMainHouse = false) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file, roomId, imageIndex, isMainHouse);
    }
  };

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  if (!isEditing) {
    return null;








  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg my-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit PropertyShow</h2>
          <button onClick={() => setIsEditing(false)} className="p-1 hover:bg-gray-200 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Rooms Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Interior Rooms</h3>
          <div className="space-y-6">
            {editData.residence.rooms.map((room, roomIdx) =>
            <div key={room.id} className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-bold mb-3">{room.kicker}</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Kicker</label>
                    <input
                    type="text"
                    value={room.kicker}
                    onChange={(e) => handleRoomChange(room.id, 'kicker', e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm" />

                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Subtitle</label>
                    <input
                    type="text"
                    value={room.sub}
                    onChange={(e) => handleRoomChange(room.id, 'sub', e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm" />

                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                    value={room.text}
                    onChange={(e) => handleRoomChange(room.id, 'text', e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    rows="2" />

                  </div>

                  {/* Images for this room */}
                  <div className="border-t pt-3 mt-3">
                    <h5 className="font-semibold text-sm mb-2">Images</h5>
                    {room.gallery.map((img, imgIdx) =>
                  <div key={imgIdx} className="bg-white p-3 rounded mb-2 border border-gray-200">
                        <div
                      className="border-2 border-dashed border-gray-300 rounded p-4 text-center mb-3 cursor-pointer hover:border-blue-400 transition-colors"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, room.id, imgIdx)}
                      onClick={() => document.getElementById(`upload-room-${room.id}-${imgIdx}`).click()}>

                          <Upload className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                          <p className="text-xs text-gray-600">Drag & drop or click to upload</p>
                          <input
                        id={`upload-room-${room.id}-${imgIdx}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files[0], room.id, imgIdx)}
                        className="hidden" />

                        </div>
                        {img.src && <p className="text-xs text-gray-500 mb-2 truncate">Current: {img.src}</p>}
                        <div className="mb-2">
                          <label className="block text-xs font-medium mb-1">Caption</label>
                          <input
                        type="text"
                        value={img.caption}
                        onChange={(e) => handleImageChange(room.id, imgIdx, 'caption', e.target.value)}
                        className="w-full border rounded px-2 py-1 text-xs" />

                        </div>
                      </div>
                  )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main House Featured Images */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Main House Featured Images</h3>
          <div className="space-y-3">
            {editData.mainHouse.featured.images.map((img, idx) =>
            <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                <div
                className="border-2 border-dashed border-gray-300 rounded p-4 text-center mb-3 cursor-pointer hover:border-blue-400 transition-colors"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, null, idx, true)}
                onClick={() => document.getElementById(`upload-main-${idx}`).click()}>

                  <Upload className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                  <p className="text-xs text-gray-600">Drag & drop or click to upload</p>
                  <input
                  id={`upload-main-${idx}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0], null, idx, true)}
                  className="hidden" />

                </div>
                {img.src && <p className="text-xs text-gray-500 mb-2 truncate">Current: {img.src}</p>}
                <div>
                  <label className="block text-sm font-medium mb-1">Caption</label>
                  <input
                  type="text"
                  value={img.caption}
                  onChange={(e) => handleMainHouseImageChange(idx, 'caption', e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm" />

                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">

            <Save className="w-4 h-4" /> Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">

            Cancel
          </button>
        </div>
      </div>
    </div>);

}