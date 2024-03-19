'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CreateTypeOfArtWorkTest() {
    const [type, setType] = useState('');
    const [typeDescription, setTypeDescription] = useState('');
    const [typeImageDefault, setTypeImageDefault] = useState<Uint8Array | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setImagePreview(null);
            setTypeImageDefault(null);
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            if (result instanceof ArrayBuffer) {
                const array = new Uint8Array(result);
                setTypeImageDefault(array);
                setImagePreview(URL.createObjectURL(file));
            }
        };
        reader.readAsArrayBuffer(file);
    };

    // Click on the submit and check Validate
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!type.trim() || !typeDescription.trim() || !typeImageDefault) {
            setError('All fields are required');
            return;
        }
        setError('');
        setShowConfirmation(true);
    };

    // Create Type Of Art
    const handleCreate = async () => {
        const obj = {
            type: type,
            typeDescription: typeDescription,
            typeImageDefault: typeImageDefault
        }
        console.log(typeImageDefault + "bebe");

        try {
            setLoading(true);
            const response = await fetch('https://6538a5b6a543859d1bb1ae4a.mockapi.io/testPRN', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj),
                mode: 'cors'
            });

            if (!response.ok) {
                throw new Error('Failed to create artwork data');
            }

            setShowSuccess(true);
            setType('');
            setTypeDescription('');
            setTypeImageDefault(null);
            setImagePreview(null);

            // Reload the page after successful post
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error creating artwork data:', error);
        } finally {
            setLoading(false);
            setShowConfirmation(false);
        }
    };

    // Click on the cancel to cancel the create type of art work
    const handleCancel = () => {
        const confirmCancel = window.confirm('Do you agree to cancel creating new type of art process?');
        if (confirmCancel) {
            window.location.reload();
        } else {
            setShowConfirmation(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-semibold mb-4">Create Post</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border rounded-md px-2 py-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="age" className="mb-1">Age:</label>
                        <input
                            type="text"
                            id="age"
                            value={typeDescription}
                            onChange={(e) => setTypeDescription(e.target.value)}
                            className="border rounded-md px-2 py-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="image" className="mb-1">Image:</label>
                        <input
                            type="file"
                            id="image"
                            onChange={handleImagePreview}
                            className="border rounded-md px-2 py-1"
                        />
                    </div>
                    {error && <p className="text-red-600">{error}</p>}
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="max-w-full my-4" />
                    )}
                    <button type="submit" className="bg-blue-500 text-white rounded-md py-2">
                        {loading ? 'Creating...' : 'Create'}
                    </button>
                </form>
                {showConfirmation && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-md w-96">
                            <p className="text-lg">Do you want to create?</p>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="bg-blue-500 text-white rounded-md py-2 px-4 mr-2"
                                    onClick={handleCreate}
                                >
                                    Agree
                                </button>
                                <button
                                    className="bg-gray-300 text-gray-800 rounded-md py-2 px-4"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
                {showSuccess && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-lg font-semibold">Artwork created successfully!</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
