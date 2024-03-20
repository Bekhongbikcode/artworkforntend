import React, { useState } from 'react';

interface Type {
    id: number;
    accountid: number;
    typeDescription: string;
    status: string;
}

interface ModalProps {
    selectedType: Type | null;
    onHide: () => void;
}

//Accept Button
const ModalComponent: React.FC<ModalProps> = ({ selectedType, onHide }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleAccept = async () => {
        try {
            setShowConfirmation(true);

            const updatedType = {
                ...selectedType,
                status: 'ACCEPT'
            };

            const response = await fetch(`https://6538a5b6a543859d1bb1ae4a.mockapi.io/testPRN/${selectedType?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedType)
            });
            if (response.ok) {
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                console.error('Failed to accept:', response.statusText);
            }
        } catch (error) {
            console.error('Error accepting:', error);
        }
    };

    // Reject Button
    const handleReject = async () => {
        try {
            const updatedType = {
                ...selectedType,
                status: 'REJECT'
            };
            const response = await fetch(`https://6538a5b6a543859d1bb1ae4a.mockapi.io/testPRN/${selectedType?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedType)
            });

            if (response.ok) {
                setShowConfirmation(true);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                console.error('Failed to reject:', response.statusText);
            }
        } catch (error) {
            console.error('Error rejecting:', error);
        }
    };

    const handleConfirm = () => {
        setShowConfirmation(false);
        onHide();
    };

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${selectedType ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onHide}></div>
                <div className="relative bg-white w-96 rounded-lg p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Type Detail</h2>
                        <button className="text-gray-500 hover:text-gray-700" onClick={onHide}>Close</button>
                    </div>
                    {selectedType && (
                        <div>
                            <p>Type ID: {selectedType.id}</p>
                            <p>Account ID: {selectedType.accountid}</p>
                            <p>Type Description: {selectedType.typeDescription}</p>
                            <p>Status: {selectedType.status}</p>
                            <div className="flex justify-between mt-4">
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={handleAccept}>Accept</button>
                                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={handleReject}>Reject</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {showConfirmation && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowConfirmation(false)}></div>
                        <div className="relative bg-white w-96 rounded-lg p-8">
                            <h2 className="text-lg font-bold">Confirmation</h2>
                            <p>Are you sure you want to proceed?</p>
                            <div className="flex justify-end mt-4">
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={handleConfirm}>Confirm</button>
                                <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-2" onClick={() => setShowConfirmation(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalComponent;
