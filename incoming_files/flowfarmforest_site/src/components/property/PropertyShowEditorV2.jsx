import React, { useState } from 'react';
import { Edit2, Save, X, Upload } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function PropertyShowEditorV2({ data, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(JSON.parse(JSON.stringify(data)));
  const [uploading, setUploading] = useState(null);

  const uploadFile = async (file) => {
    try {
      const response = await base44.integrations.Core.UploadFile(file);
      return response.file_url;
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + error.message);
      return null;
    }
  };

  const handleFileDrop = async (e, callback) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploading(true);
      const url = await uploadFile(file);
      if (url) callback(url);
      setUploading(false);
    }
  };

  const handleFileClick = async (inputId, callback) => {
    const input = document.getElementById(inputId);
    if (input?.files?.[0]) {
      setUploading(true);
      const url = await uploadFile(input.files[0]);
      if (url) callback(url);
      setUploading(false);
    }
  };

  const updateRoom = (roomId, field, value) => {
    setEditData(prev => ({
      ...prev,
      residence: {
        ...prev.residence,
        rooms: prev.residence.rooms.map(r =>
          r.id === roomId ? { ...r, [field]: value } : r
        )
      }
    }));
  };

  const updateRoomImage = (roomId, imgIdx, field, value) => {
    setEditData(prev => ({
      ...prev,
      residence: {
        ...prev.residence,
        rooms: prev.residence.rooms.map(r =>
          r.id === roomId
            ? {
                ...r,
                gallery: r.gallery.map((img, i) =>
                  i === imgIdx ? { ...img, [field]: value } : img
                )
              }
            : r
        )
      }
    }));
  };

  const updateMainHouseImage = (idx, field, value) => {
    setEditData(prev => ({
      ...prev,
      mainHouse: {
        ...prev.mainHouse,
        featured: {
          ...prev.mainHouse.featured,
          images: prev.mainHouse.featured.images.map((img, i) =>
            i === idx ? { ...img, [field]: value } : img
          )
        }
      }
    }));
  };

  const updateMainHouse = (field, value) => {
    setEditData(prev => ({
      ...prev,
      mainHouse: {
        ...prev.mainHouse,
        hero: {
          ...prev.mainHouse.hero,
          [field]: value
        }
      }
    }));
  };

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 shadow-lg"
      >
        <Edit2 className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 my-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Property</h2>
          <button onClick={() => setIsEditing(false)} className="p-1 hover:bg-gray-200 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Rooms */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Rooms</h3>
          <div className="space-y-6">
            {editData.residence.rooms.map(room => (
              <div key={room.id} className="border rounded-lg p-4 bg-gray-50">
                <input
                  type="text"
                  placeholder="Kicker"
                  value={room.kicker}
                  onChange={(e) => updateRoom(room.id, 'kicker', e.target.value)}
                  className="w-full border rounded px-2 py-1 mb-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Subtitle"
                  value={room.sub}
                  onChange={(e) => updateRoom(room.id, 'sub', e.target.value)}
                  className="w-full border rounded px-2 py-1 mb-2 text-sm"
                />
                <textarea
                  placeholder="Description"
                  value={room.text}
                  onChange={(e) => updateRoom(room.id, 'text', e.target.value)}
                  className="w-full border rounded px-2 py-1 mb-3 text-sm"
                  rows="2"
                />
                
                <div className="space-y-2 border-t pt-3">
                  <p className="text-sm font-medium">Gallery Images</p>
                  {room.gallery.map((img, idx) => (
                    <div key={idx} className="bg-white p-3 rounded border">
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleFileDrop(e, (url) => updateRoomImage(room.id, idx, 'src', url))}
                        onClick={() => document.getElementById(`room-${room.id}-${idx}`).click()}
                        className="border-2 border-dashed border-gray-300 rounded p-3 text-center cursor-pointer hover:border-blue-400 mb-2 text-xs"
                      >
                        <Upload className="w-3 h-3 mx-auto mb-1 text-gray-400" />
                        <p className="text-gray-600">Drag & drop or click</p>
                        <input
                          id={`room-${room.id}-${idx}`}
                          type="file"
                          accept="image/*"
                          onChange={() => handleFileClick(`room-${room.id}-${idx}`, (url) => updateRoomImage(room.id, idx, 'src', url))}
                          className="hidden"
                        />
                      </div>
                      {img.src && <p className="text-xs text-gray-500 mb-2 truncate">Current: {img.src}</p>}
                      <input
                        type="text"
                        placeholder="Caption"
                        value={img.caption}
                        onChange={(e) => updateRoomImage(room.id, idx, 'caption', e.target.value)}
                        className="w-full border rounded px-2 py-1 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main House Hero */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Main House Hero</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={editData.mainHouse.hero.title}
                onChange={(e) => updateMainHouse('title', e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Copy/Description</label>
              <textarea
                value={editData.mainHouse.hero.copy}
                onChange={(e) => updateMainHouse('copy', e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Main House Featured Images */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Main House Featured Images</h3>
          <div className="space-y-3">
            {editData.mainHouse.featured.images.map((img, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded border">
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleFileDrop(e, (url) => updateMainHouseImage(idx, 'src', url))}
                  onClick={() => document.getElementById(`main-${idx}`).click()}
                  className="border-2 border-dashed border-gray-300 rounded p-3 text-center cursor-pointer hover:border-blue-400 mb-2 text-sm"
                >
                  <Upload className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                  <p className="text-gray-600 text-sm">Drag & drop or click</p>
                  <input
                    id={`main-${idx}`}
                    type="file"
                    accept="image/*"
                    onChange={() => handleFileClick(`main-${idx}`, (url) => updateMainHouseImage(idx, 'src', url))}
                    className="hidden"
                  />
                </div>
                {img.src && <p className="text-xs text-gray-500 mb-2 truncate">Current: {img.src}</p>}
                <input
                  type="text"
                  placeholder="Caption"
                  value={img.caption}
                  onChange={(e) => updateMainHouseImage(idx, 'caption', e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={uploading}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Save'}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            disabled={uploading}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}