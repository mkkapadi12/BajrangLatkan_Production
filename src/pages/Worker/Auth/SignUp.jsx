import React, { useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import toast from "react-hot-toast";
import { ICONS } from "@/Icons/icons";

/** Utility: convert File -> base64 string (optional photo upload) */
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function WorkerSignup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const [skillsInput, setSkillsInput] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    // 1) Personal
    fullName: "",
    fatherHusbandName: "",
    gender: "",
    dateOfBirth: "",
    photo: "",

    // 2) Contact
    phone: "",
    alternatePhone: "",
    address: {
      village: "",
      taluka: "",
      district: "",
    },
    emergencyContact: {
      name: "",
      phone: "",
    },

    // 3) Work & Skills
    skills: [], // array of strings
    workPreference: "",
    experience: "", // number (years)
    notes: "",

    // 4) Bank / Payment
    bankDetails: {
      accountHolderName: "",
      accountNumber: "",
      ifsc: "",
      upiId: "",
    },

    // 5) Account
    email: "", // optional (can default to phone on backend)
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const router = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleNestedChange = (group, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [group]: { ...prev[group], [field]: value },
    }));
    if (error) setError("");
  };

  const addSkill = () => {
    const v = skillsInput.trim();
    if (!v) return;
    if (!formData.skills.includes(v)) {
      setFormData((p) => ({ ...p, skills: [...p.skills, v] }));
    }
    setSkillsInput("");
  };

  const removeSkill = (skill) => {
    setFormData((p) => ({
      ...p,
      skills: p.skills.filter((s) => s !== skill),
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: {
        const { fullName, gender, dateOfBirth } = formData;
        return fullName && gender && dateOfBirth;
      }
      case 2: {
        const { phone, address, emergencyContact } = formData;
        return (
          phone &&
          address.village &&
          address.taluka &&
          address.district &&
          emergencyContact.name &&
          emergencyContact.phone
        );
      }
      case 3: {
        const { workPreference, experience } = formData;
        return (
          workPreference && `${experience}` !== "" && Number(experience) >= 0
        );
      }
      case 4: {
        // Bank is optional; if any bank field filled, ensure minimal validity
        const { accountHolderName, accountNumber, ifsc, upiId } =
          formData.bankDetails;
        const anyFilled = accountHolderName || accountNumber || ifsc || upiId;
        if (!anyFilled) return true;
        // Minimal validation when provided
        return !!(accountHolderName && (accountNumber || upiId));
      }
      case 5: {
        const { password, confirmPassword, agreeToTerms, email } = formData;
        return (
          email &&
          password &&
          confirmPassword &&
          password === confirmPassword &&
          agreeToTerms
        );
      }
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 5 && isStepValid()) setCurrentStep((s) => s + 1);
  };
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isStepValid()) {
      setError("Please complete all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const photoBase64 = await fileToBase64(photoFile);
      const payload = {
        ...formData,
        experience: Number(formData.experience || 0),
        email: formData.email || formData.phone,
        photo: photoBase64 || formData.photo || "",
      };

      console.log("worker data :", payload);

      // 🔧 Adjust to your API method if different
      const res = await api.createUser(payload);

      if (res?.msg === "Worker registered successfully!") {
        toast.success("Registration successfully");
        // reset
        setFormData({
          fullName: "",
          fatherHusbandName: "",
          gender: "",
          dateOfBirth: "",
          photo: "",
          phone: "",
          alternatePhone: "",
          address: { village: "", taluka: "", district: "" },
          emergencyContact: { name: "", phone: "" },
          skills: [],
          workPreference: "",
          experience: "",
          notes: "",
          bankDetails: {
            accountHolderName: "",
            accountNumber: "",
            ifsc: "",
            upiId: "",
          },
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });
        setPhotoFile(null);
        setCurrentStep(1);
        router("/login");
      } else {
        setError(res?.msg || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const StepBadge = ({ step }) => (
    <div className="flex items-center">
      {/* Step Circle */}
      <div
        className={`flex items-center justify-center rounded-full font-semibold border
        w-8 h-8 text-xs sm:w-9 sm:h-9 sm:text-sm md:w-10 md:h-10 md:text-base
        ${
          step <= currentStep
            ? "bg-bajrang-accent text-bajrang-brand border-bajrang-accent"
            : "bg-white text-bajrang-text border-bajrang-divider"
        }`}
      >
        {step}
      </div>

      {/* Connector */}
      {step < 5 && (
        <div
          className={`mx-1 sm:mx-2 h-0.5
          w-8 sm:w-14 md:w-20
          ${step < currentStep ? "bg-bajrang-accent" : "bg-bajrang-divider"}`}
        />
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-bajrang-bg">
      <div className="w-full max-w-3xl">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-bajrang-text">
            Worker Registration
          </h1>
          <p className="mt-1 text-bajrang-textSecondary">
            Create your account to start receiving assignments
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <StepBadge key={s} step={s} />
          ))}
        </div>
        <div className="mb-4 text-sm text-center text-bajrang-muted">
          Step {currentStep} of 5
        </div>

        <Card className="border border-bajrang-border shadow-card bg-bajrang-surface">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-center text-2xl text-bajrang-text">
              <ICONS.USERPLUS className="w-6 h-6 mr-2 text-bajrang-brand" />
              Worker Signup
            </CardTitle>
            <CardDescription className="text-center text-bajrang-textSecondary">
              Fill the details step by step
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert className="mb-4 border-bajrang-danger bg-red-50">
                <AlertDescription className="flex items-center gap-2 text-bajrang-danger">
                  <AlertTriangle className="w-4 h-4" /> {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: Personal */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <div className="relative">
                        <ICONS.USER className="absolute w-4 h-4 -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
                        <Input
                          id="fullName"
                          className="pl-10"
                          placeholder="Enter full name"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleChange("fullName", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fatherHusbandName">
                        Father/Husband Name
                      </Label>
                      <Input
                        id="fatherHusbandName"
                        placeholder="Enter name"
                        value={formData.fatherHusbandName}
                        onChange={(e) =>
                          handleChange("fatherHusbandName", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(v) => handleChange("gender", v)}
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
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <div className="relative">
                        <ICONS.CALENDAR className="absolute w-4 h-4 -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          className="pl-10"
                          value={formData.dateOfBirth}
                          onChange={(e) =>
                            handleChange("dateOfBirth", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="photo">Photo (optional)</Label>
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center px-3 py-2 transition border rounded-lg cursor-pointer border-bajrang-border bg-bajrang-surfaceAlt hover:bg-bajrang-hover">
                          <ICONS.IMAGE className="w-4 h-4 mr-2 text-bajrang-muted" />
                          <span className="text-sm">Upload</span>
                          <input
                            id="photo"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              setPhotoFile(e.target.files?.[0] || null)
                            }
                          />
                        </label>
                        {photoFile && (
                          <span className="text-sm truncate text-bajrang-textSecondary">
                            {photoFile.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Contact */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute w-4 h-4 -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
                        <Input
                          id="phone"
                          type="tel"
                          className="pl-10"
                          placeholder="+91 9XXXXXXXXX"
                          value={formData.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alternatePhone">Alternate Phone</Label>
                      <Input
                        id="alternatePhone"
                        type="tel"
                        placeholder="+91 9XXXXXXXXX"
                        value={formData.alternatePhone}
                        onChange={(e) =>
                          handleChange("alternatePhone", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Address *</Label>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="relative">
                        <MapPin className="absolute w-4 h-4 -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
                        <Input
                          className="pl-10"
                          placeholder="Village"
                          value={formData.address.village}
                          onChange={(e) =>
                            handleNestedChange(
                              "address",
                              "village",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                      <Input
                        placeholder="Taluka"
                        value={formData.address.taluka}
                        onChange={(e) =>
                          handleNestedChange(
                            "address",
                            "taluka",
                            e.target.value
                          )
                        }
                        required
                      />
                      <Input
                        placeholder="District"
                        value={formData.address.district}
                        onChange={(e) =>
                          handleNestedChange(
                            "address",
                            "district",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="emgName">Emergency Contact Name *</Label>
                      <Input
                        id="emgName"
                        placeholder="Name"
                        value={formData.emergencyContact.name}
                        onChange={(e) =>
                          handleNestedChange(
                            "emergencyContact",
                            "name",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emgPhone">
                        Emergency Contact Phone *
                      </Label>
                      <Input
                        id="emgPhone"
                        type="tel"
                        placeholder="+91 9XXXXXXXXX"
                        value={formData.emergencyContact.phone}
                        onChange={(e) =>
                          handleNestedChange(
                            "emergencyContact",
                            "phone",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Work & Skills */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Work Preference *</Label>
                      <Select
                        value={formData.workPreference}
                        onValueChange={(v) => handleChange("workPreference", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Experience (years) *</Label>
                      <div className="relative">
                        <ICONS.BRIEFCASE className="absolute w-4 h-4 -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
                        <Input
                          type="number"
                          min="0"
                          step="1"
                          className="pl-10"
                          placeholder="0"
                          value={formData.experience}
                          onChange={(e) =>
                            handleChange("experience", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Skills (press Enter to add)</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., Beads, Threading, Embroidery"
                        value={skillsInput}
                        onChange={(e) => setSkillsInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={addSkill}
                        className="bg-bajrang-brand hover:opacity-90"
                      >
                        <ICONS.PLUS className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    {formData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.skills.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1 px-2 py-1 text-sm border rounded-md bg-bajrang-surfaceAlt text-bajrang-text border-bajrang-border"
                          >
                            {s}
                            <button
                              type="button"
                              onClick={() => removeSkill(s)}
                              className="hover:text-bajrang-danger"
                            >
                              <ICONS.X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Notes (optional)</Label>
                    <Textarea
                      rows={3}
                      placeholder="Any special instructions or remarks"
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Bank / Payment */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Account Holder Name</Label>
                      <Input
                        placeholder="As per bank"
                        value={formData.bankDetails.accountHolderName}
                        onChange={(e) =>
                          handleNestedChange(
                            "bankDetails",
                            "accountHolderName",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Account Number</Label>
                      <Input
                        placeholder="XXXXXXXXXXXX"
                        value={formData.bankDetails.accountNumber}
                        onChange={(e) =>
                          handleNestedChange(
                            "bankDetails",
                            "accountNumber",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>IFSC</Label>
                      <Input
                        placeholder="e.g., HDFC0001234"
                        value={formData.bankDetails.ifsc}
                        onChange={(e) =>
                          handleNestedChange(
                            "bankDetails",
                            "ifsc",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>UPI ID (optional)</Label>
                      <div className="relative">
                        <Banknote className="absolute w-4 h-4 -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
                        <Input
                          className="pl-10"
                          placeholder="name@upi"
                          value={formData.bankDetails.upiId}
                          onChange={(e) =>
                            handleNestedChange(
                              "bankDetails",
                              "upiId",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 text-sm border rounded-md border-bajrang-border bg-bajrang-surfaceAlt text-bajrang-textSecondary">
                    Bank details are optional. If left blank, salary can be paid
                    in cash.
                  </div>
                </div>
              )}

              {/* STEP 5: Account */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>email</Label>
                      <div className="relative">
                        <IdCard className="absolute w-4 h-4 -translate-y-1/2 text-bajrang-muted left-3 top-1/2" />
                        <Input
                          className="pl-10"
                          placeholder="If empty, we’ll use your phone"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Password *</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) =>
                            handleChange("password", e.target.value)
                          }
                          className="pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute -translate-y-1/2 right-3 top-1/2 text-bajrang-muted hover:text-bajrang-text"
                        >
                          {showPassword ? (
                            <ICONS.EYEOFF className="w-4 h-4" />
                          ) : (
                            <ICONS.EYE className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          type={showConfirm ? "text" : "password"}
                          placeholder="Re-enter password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleChange("confirmPassword", e.target.value)
                          }
                          className="pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((s) => !s)}
                          className="absolute -translate-y-1/2 right-3 top-1/2 text-bajrang-muted hover:text-bajrang-text"
                        >
                          {showConfirm ? (
                            <ICONS.EYEOFF className="w-4 h-4" />
                          ) : (
                            <ICONS.EYE className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="agree"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(v) =>
                        handleChange("agreeToTerms", Boolean(v))
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor="agree"
                      className="text-sm text-bajrang-textSecondary"
                    >
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="underline text-bajrang-accent underline-offset-4"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="underline text-bajrang-accent underline-offset-4"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </Label>
                  </div>

                  <div className="flex items-center gap-2 p-3 text-sm border rounded-md border-bajrang-border bg-bajrang-surfaceAlt text-bajrang-textSecondary">
                    <ICONS.SHIELDCHECK className="w-4 h-4 text-bajrang-success" />
                    Your information is kept secure and used only for assignment
                    & salary processing.
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="flex justify-between pt-4">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-bajrang-border text-bajrang-text hover:bg-bajrang-hover"
                  >
                    Previous
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="text-white bg-bajrang-brand hover:opacity-90 disabled:opacity-50"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading || !isStepValid()}
                    className="text-white bg-bajrang-brand hover:opacity-90 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                )}
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-bajrang-textSecondary">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium underline text-bajrang-brand underline-offset-4"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
