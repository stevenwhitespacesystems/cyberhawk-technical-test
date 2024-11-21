function EquipmentPopup() {
    return (
        <div className="p-4 max-w-sm">
            <h3 className="text-lg font-bold mb-3">Equipment Details</h3>

            <div className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                    <div className="text-gray-600">ID:</div>
                    <div className="font-medium">ID</div>
                </div>

                <div className="grid grid-cols-2 gap-1">
                    <div className="text-gray-600">Type:</div>
                    <div className="font-medium">Type</div>
                </div>

                <div className="grid grid-cols-2 gap-1">
                    <div className="text-gray-600">Status:</div>
                    <div className="font-medium">Status</div>
                </div>
            </div>
        </div>
    );
}

export default EquipmentPopup;
