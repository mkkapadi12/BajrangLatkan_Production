import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/services/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStatusColor } from "@/hooks/useStatusColor";
import { useLoader } from "@/hooks/useLoader";
import { Separator } from "@/components/ui/separator";
import EditSaveCancel from "@/hooks/useEditSaveCancel";
import { ADMINICONS } from "@/Icons/AdminIcons";

export function WorkerDetails() {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedWorker, setEditedWorker] = useState(worker);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorker = async () => {
      setLoading(true);
      try {
        const workerData = await api.getworkerdetails(id);
        if (workerData?.worker) {
          setWorker(workerData.worker);
          setEditedWorker(workerData.worker);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching worker:", err);
      }
    };
    fetchWorker();
  }, [id]);

  const handleSave = () => {
    console.log("Updated Worker:", editedWorker);
    setIsEditing(false);
    // 🔗 Call API here -> api.updateWorker(editedWorker._id, editedWorker)
  };

  const handleChange = (field, value) => {
    setEditedWorker((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setEditedWorker((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  if (loading || !worker) {
    return useLoader();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold">Worker Details</h1>
          <Button
            variant="outline"
            className="sm:hidden"
            onClick={() => navigate(-1)}
          >
            <span>
              <ADMINICONS.LEFTARROW />
            </span>{" "}
            Back
          </Button>
        </div>
        <div>
          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Edit / Save + Cancel */}
            {!isEditing ? (
              <div className="hidden gap-2 sm:flex">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  <span>
                    <ADMINICONS.LEFTARROW />
                  </span>{" "}
                  Back
                </Button>
                <Button
                  variant="outline"
                  className="hover:bg-bajrang-accent"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </div>
            ) : (
              <div className="hidden gap-2 sm:flex ">
                <Button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-700"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500 hover:bg-red-700"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Personal Information */}
        <Card className="relative border-l-4 border-bajrang-brand">
          <EditSaveCancel
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSave={handleSave}
          />
          <CardHeader>
            <CardTitle className="text-lg text-bajrang-brand">
              Personal Information
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Full Name</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            </div>
            <div>
              <Label>Father/Husband Name</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.fatherHusbandName}
                onChange={(e) =>
                  handleChange("fatherHusbandName", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                disabled={!isEditing}
                value={editedWorker.dateOfBirth?.split("T")[0]}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              />
            </div>
            <div>
              <Label>Gender</Label>
              <Select
                disabled={!isEditing}
                value={editedWorker.gender}
                onValueChange={(value) => handleChange("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="bg-bajrang-surface">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="relative border-l-4 border-bajrang-secondary">
          <EditSaveCancel
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSave={handleSave}
          />
          <CardHeader>
            <CardTitle className="text-lg text-bajrang-brand">
              Contact Information
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Phone</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
            <div>
              <Label>Alternate Phone</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.alternatePhone}
                onChange={(e) => handleChange("alternatePhone", e.target.value)}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label>Village</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.address?.village}
                onChange={(e) =>
                  handleNestedChange("address", "village", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Taluka</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.address?.taluka}
                onChange={(e) =>
                  handleNestedChange("address", "taluka", e.target.value)
                }
              />
            </div>
            <div>
              <Label>District</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.address?.district}
                onChange={(e) =>
                  handleNestedChange("address", "district", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Emergency Contact Name</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.emergencyContact?.name}
                onChange={(e) =>
                  handleNestedChange("emergencyContact", "name", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Emergency Contact Phone</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.emergencyContact?.phone}
                onChange={(e) =>
                  handleNestedChange(
                    "emergencyContact",
                    "phone",
                    e.target.value
                  )
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Work & Skills */}
        <Card className="relative border-l-4 border-bajrang-secondary">
          <EditSaveCancel
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSave={handleSave}
          />
          <CardHeader>
            <CardTitle className="text-lg text-bajrang-brand">
              Work & Skills
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Work Preference</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.workPreference}
                onChange={(e) => handleChange("workPreference", e.target.value)}
              />
            </div>
            <div>
              <Label>Experience (Years)</Label>
              <Input
                type="number"
                disabled={!isEditing}
                value={editedWorker.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
              />
            </div>
            <div>
              <Label>Skills</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.skills?.join(", ")}
                onChange={(e) =>
                  handleChange(
                    "skills",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Notes</Label>
              <Textarea
                disabled={!isEditing}
                value={editedWorker.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card className="relative border-l-4 border-bajrang-brand">
          <EditSaveCancel
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSave={handleSave}
          />
          <CardHeader>
            <CardTitle className="text-lg text-bajrang-brand">
              Bank Details
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Account Holder Name</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.bankDetails?.accountHolderName}
                onChange={(e) =>
                  handleNestedChange(
                    "bankDetails",
                    "accountHolderName",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <Label>Account Number</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.bankDetails?.accountNumber}
                onChange={(e) =>
                  handleNestedChange(
                    "bankDetails",
                    "accountNumber",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <Label>IFSC Code</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.bankDetails?.ifsc}
                onChange={(e) =>
                  handleNestedChange("bankDetails", "ifsc", e.target.value)
                }
              />
            </div>
            <div>
              <Label>UPI ID</Label>
              <Input
                disabled={!isEditing}
                value={editedWorker.bankDetails?.upiId}
                onChange={(e) =>
                  handleNestedChange("bankDetails", "upiId", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card className="border-l-4 border-bajrang-secondary">
          <CardHeader>
            <CardTitle className="text-lg text-bajrang-brand">
              System Info
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-0">
            <p>
              <Label className="!inline mr-2">Worker ID:</Label>
              <strong>{editedWorker.workerId}</strong>
            </p>
            <p>
              <Label className="inline mr-2">Status:</Label>
              <Badge className={`ml-2 ${getStatusColor(editedWorker.status)}`}>
                {editedWorker.status}
              </Badge>
            </p>
            <p>
              <Label className="inline mr-2">Date of Joining:</Label>
              {new Date(editedWorker.dateOfJoining).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
